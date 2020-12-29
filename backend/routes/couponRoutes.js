import express from 'express'
import { createCoupon, deleteCouponById, getAllCoupons, getCouponByCode, updateCouponByCode } from '../Controllers/couponController.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, admin, createCoupon).get(getAllCoupons)
router.route('/:id').delete(protect, admin, deleteCouponById).get(protect, getCouponByCode).put(protect, updateCouponByCode)

export default router