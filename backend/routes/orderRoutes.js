import express from 'express'
import { addOrderItems, getOrderById, getOrdersStats, getUserOrders } from '../Controllers/orderController.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myOrders').get(protect, getUserOrders)
router.route('/stats').get(protect, admin, getOrdersStats)
router.route('/:id').get(protect, getOrderById)

export default router