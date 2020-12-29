import asyncHandler from 'express-async-handler'
import Order from '../Models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        deliveryCode,
        couponDiscount,
        payAmount,
        userName
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            deliveryCode,
            couponDiscount,
            payAmount,
            userName: userName.toLowerCase(),
            isPaid: paymentMethod === "Cash" ? false : true,
            paidAt: paymentMethod !== "Cash" ? Date.now() : "",
            paymentResult: {
                id: req.body.paymentResult.id,
                status: req.body.paymentResult.status,
                update_time: req.body.paymentResult.update_time,
                email_address: req.body.paymentResult.payer.email_address,
            }
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get logged-in user orders
// @route   GET /api/orders/myOrders
// @access  Private
const getUserOrders = asyncHandler(async(req, res) => {
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1

    const count = await Order.find({ user: req.user._id }).countDocuments()

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('user', 'id name').limit(pageSize).skip(pageSize * (page - 1))
    res.json({ orders, page, pages: Math.ceil(count / pageSize), orderCount: count })
})

// @desc    Count orders for stats
// @route   GET /api/orders/stats
// @access  Private/Admin
const getOrdersStats = asyncHandler(async(req, res) => {
    const prevWeekDate = new Date
    prevWeekDate.setDate(prevWeekDate.getDate() - 7)
    const totalOrders = await Order.find({ createdAt: { $gt: prevWeekDate } }).countDocuments()
    const prevDate = new Date
    prevDate.setDate(prevDate.getDate() - 1)
    const paidOrders = await Order.find({ isPaid: true, paidAt: { $gt: prevDate } }).countDocuments()
    const deliveredOrders = await Order.find({ isDelivered: true, deliveredAt: { $gt: prevDate } }).countDocuments()
    const latestOrders = await Order.find({ createdAt: { $gt: prevDate } }).countDocuments()
    res.json({
        totalOrders,
        paidOrders,
        deliveredOrders,
        latestOrders
    })
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async(req, res) => {
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1

    const name = req.query.name ? {
        userName: {
            $regex: req.query.name,
            $options: 'i'
        }
    } : {}

    const count = await Order.countDocuments()

    const orders = await Order.find({...name }).sort({ createdAt: -1 }).populate('user', 'id name').limit(pageSize).skip(pageSize * (page - 1))
    res.json({ orders, page, pages: Math.ceil(count / pageSize), orderCount: count })
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        order.paidAt = order.isPaid ? order.paidAt : Date.now()
        order.isPaid = true

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order to cancelled
// @route   GET /api/orders/:id/cancel
// @access  Private
const updateOrderToCancelled = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isCancelled = true
        order.cancelledAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

export {
    addOrderItems,
    getOrderById,
    getUserOrders,
    getOrdersStats,
    getOrders,
    updateOrderToDelivered,
    updateOrderToCancelled
}