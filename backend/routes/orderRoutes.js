import express from 'express'
import { addOrderItems, getOrderById, getOrders, getOrdersStats, getUserOrders, updateOrderToDelivered } from '../Controllers/orderController.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myOrders').get(protect, getUserOrders)
router.route('/stats').get(protect, admin, getOrdersStats)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id').get(protect, getOrderById)

export default router