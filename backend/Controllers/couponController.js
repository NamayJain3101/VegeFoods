import asyncHandler from 'express-async-handler'
import Coupon from '../Models/couponsModel.js'

// @desc    Create new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async(req, res) => {
    const { code, discountType, discountAmount, minAmountRequired } = req.body.coupon
    const discountUpto = req.body.coupon.discountType.toLowerCase() === 'flat' ? discountAmount : req.body.discountUpto
    const couponExist = await Coupon.find({ code })
    console.log(couponExist)
    if (couponExist && couponExist.length !== 0) {
        res.status(400)
        throw new Error('Coupon Code already exists')
    } else {
        const coupon = new Coupon({
            code,
            discountType,
            discountAmount,
            discountUpto,
            minAmountRequired
        })
        const createdCoupon = await coupon.save()
        res.status(201).json(createdCoupon)
    }
})

// @desc    Get all coupon
// @route   GET /api/coupons
// @access  Private
const getAllCoupons = asyncHandler(async(req, res) => {
    const coupons = await Coupon.find({})
    if (coupons) {
        res.json(coupons)
    } else {
        res.status(404)
        throw new Error('No coupons found')
    }
})

// @desc    Get coupon by ID
// @route   GET /api/coupons/:id
// @access  Private
const getCouponById = asyncHandler(async(req, res) => {
    const coupon = await Coupon.findById(req.params.id)
    if (coupon) {
        res.json(coupon)
    } else {
        res.status(404)
        throw new Error('No coupons found')
    }
})

// @desc    Delete coupon by ID
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCouponById = asyncHandler(async(req, res) => {
    const coupon = await Coupon.findById(req.params.id)
    if (coupon) {
        await coupon.remove()
        res.json({
            message: 'Coupon removed'
        })
    } else {
        res.status(404)
        throw new Error('No coupon found')
    }
})

export {
    createCoupon,
    getAllCoupons,
    deleteCouponById,
    getCouponById
}