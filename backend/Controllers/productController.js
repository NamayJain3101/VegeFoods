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

// @desc    Delete a products
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({
            message: 'Product removed'
        })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a products
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        image: '/Images/Sample.jpg',
        category: 'Sample category',
        description: 'Sample description',
        price: 0,
        discountPrice: '',
        user: req.user._id,
        InStock: 0,
        numReviews: 0,
        rating: 0
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a products
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    const {
        name,
        price,
        description,
        discountPrice,
        image,
        category,
        InStock
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.image = image
        product.description = description
        product.category = category
        product.price = price
        product.discountPrice = discountPrice
        product.InStock = InStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async(req, res) => {
    const {
        rating,
        comment
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product Already Reviewed')
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
            await product.save()
            res.status(201).json({
                message: 'Review added'
            })
        }
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get product reviews stats
// @route   GET /api/products/:id/reviews/stats
// @access  Public
const getReviewsStats = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    const rating5 = product.reviews.filter(x => x.rating === 5)
    const rating4 = product.reviews.filter(x => x.rating === 4)
    const rating3 = product.reviews.filter(x => x.rating === 3)
    const rating2 = product.reviews.filter(x => x.rating === 2)
    const rating1 = product.reviews.filter(x => x.rating === 1)

    res.json({
        star5: rating5.length,
        star4: rating4.length,
        star3: rating3.length,
        star2: rating2.length,
        star1: rating1.length,
    })
})

export {
    getProducts,
    getProductCategories,
    getBestDeal,
    getTopProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getReviewsStats
}