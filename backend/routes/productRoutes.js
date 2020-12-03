import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../Models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async(req, res) => {
    const category = req.query.category
    const search = req.query.search ? {
        name: {
            $regex: req.query.search,
            $options: 'i'
        }
    } : {}
    let products
    if (category !== 'All') {
        products = await Product.find({ 'category': `${category}`, ...search }).sort({ name: 1 })
    } else {
        products = await Product.find({...search }).sort({ name: 1 })
    }
    res.json(products)
}))

// @desc    Fetch top rated products
// @route   GET /api/products/top-rated
// @access  Public
router.get('/top', asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4).sort({ name: 1 });
    res.json(products)
}))

// @desc    Fetch all Categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', asyncHandler(async(req, res) => {
    const products = await Product.find({})
    const categories = ['All', ...new Set(products.map(({ category }) => category))]
    res.json(categories)
}))

// @desc    Fetch best deal
// @route   GET /api/products/bestDeal
// @access  Public
router.get('/bestDeal', asyncHandler(async(req, res) => {
    const product = await Product.findOne({ discountPrice: { $exists: true } })
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

// @desc    Fetch single products
// @route   GET /api/products/:name
// @access  Public
router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

export default router