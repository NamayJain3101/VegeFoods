import express from 'express'
import { createCoupon, deleteCouponById, getAllCoupons, getCouponById } from '../Controllers/couponController.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, admin, createCoupon).get(protect, getAllCoupons)
router.route('/:id').delete(protect, admin, deleteCouponById)

export default router