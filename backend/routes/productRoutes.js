import express from 'express'
import { admin, protect } from '../Middlewares/authMiddleware.js'
import { deleteProduct, getBestDeal, getProductById, getProductCategories, getProducts, getTopProducts } from '../Controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts)
router.route('/categories').get(getProductCategories)
router.route('/bestDeal').get(getBestDeal)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default router