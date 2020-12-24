import express from 'express'
import { admin, protect } from '../Middlewares/authMiddleware.js'
import { createProduct, createProductReview, deleteProduct, getBestDeal, getProductById, getProductCategories, getProducts, getProductSuggestions, getReviewsStats, getTopProducts, updateProduct } from '../Controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/categories').get(getProductCategories)
router.route('/suggestions').get(getProductSuggestions)
router.route('/bestDeal').get(getBestDeal)
router.route('/top').get(getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id/reviews/stats').get(getReviewsStats)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router