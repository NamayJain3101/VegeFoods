import asyncHandler from 'express-async-handler'
import Product from '../Models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req, res) => {
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
})

// @desc    Fetch all Categories
// @route   GET /api/products/categories
// @access  Public
const getProductCategories = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    const categories = ['All', ...new Set(products.map(({ category }) => category))]
    res.json(categories)
})

// @desc    Fetch best deal
// @route   GET /api/products/bestDeal
// @access  Public
const getBestDeal = asyncHandler(async(req, res) => {
    const product = await Product.findOne({ discountPrice: { $exists: true } })
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Fetch top rated products
// @route   GET /api/products/top-rated
// @access  Public
const getTopProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4).sort({ name: 1 });
    res.json(products)
})

// @desc    Fetch single products
// @route   GET /api/products/:name
// @access  Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductCategories,
    getBestDeal,
    getTopProducts,
    getProductById
}