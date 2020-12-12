import express from 'express'
import { addOrderItems, getOrderById, getUserOrders } from '../Controllers/orderController.js'
import { protect } from '../Middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myOrders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)

export default router