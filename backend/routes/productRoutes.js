import express from 'express'
import { admin, protect } from '../Middlewares/authMiddleware.js'
import { createProduct, deleteProduct, getBestDeal, getProductById, getProductCategories, getProducts, getTopProducts, updateProduct } from '../Controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/categories').get(getProductCategories)
router.route('/bestDeal').get(getBestDeal)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router