import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth User & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            wishlistItems: user.wishlistItems,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password, name } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            wishlistItems: user.wishlistItems,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            wishlistItems: user.wishlistItems
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    get User Wishlist
// @route   GET /api/users/profile/wishlist
// @access  Private
const getWishlist = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            wishlistItems: user.wishlistItems
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Add Item to User Wishlist
// @route   POST /api/users/profile/wishlist
// @access  Private
const addItemToWishlist = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        if (user.wishlistItems && (user.wishlistItems.length === 0)) {
            user.wishlistItems = [req.body.wishlist]
        } else {
            const existItem = user.wishlistItems.find(x => {
                return x.product == req.body.wishlist.product
            })
            if (!existItem) {
                user.wishlistItems = [...user.wishlistItems, req.body.wishlist]
            } else {
                res.status(400)
                throw new Error('Item already in wishlist')
            }
        }
        const updatedUser = await user.save()
        res.json({
            wishlistItems: updatedUser.wishlistItems
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Remove Item to User Wishlist
// @route   PUT /api/users/profile/wishlist
// @access  Private
const removeItemFromWishlist = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        if (user.wishlistItems && (user.wishlistItems.length === 0)) {
            user.wishlistItems = []
        } else {
            user.wishlistItems = user.wishlistItems.filter(x => {
                return x.product != req.body.wishlist.product
            })
        }
        const updatedUser = await user.save()
        res.json({
            wishlistItems: updatedUser.wishlistItems
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get All User
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select('-password')
    res.json(users)
})

// @desc    Count users for stats
// @route   GET /api/users/stats
// @access  Private/Admin
const getUsersStats = asyncHandler(async(req, res) => {
    const totalUsers = await User.find({}).countDocuments()
    const prevDate = new Date
    prevDate.setDate(prevDate.getDate() - 1)
    const latestUsers = await User.find({ createdAt: { $gt: prevDate } }).countDocuments()
    res.json({
        totalUsers,
        latestUsers
    })
})

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    addItemToWishlist,
    getWishlist,
    removeItemFromWishlist,
    getUsers,
    getUsersStats
}