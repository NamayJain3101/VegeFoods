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
            wallet: user.wallet,
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

    const regExpName = /\s*([A-Za-z]+([\.,] |[-']| )?)[A-Za-z]*\s*$/g
    if (!regExpName.test(name)) {
        res.status(400)
        throw new Error('Invalid Name syntax')
    }

    const regExpPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*?>< ])[a-zA-Z0-9!@#$%^&*?>< ]{8,15}$/
    if (!regExpPassword.test(password)) {
        res.status(400)
        throw new Error('Password must contain at least 1 digit, 1 special character, 1 character and length between 8-15')
    }

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
            wallet: user.wallet,
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
            wallet: user.wallet,
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

        if (req.body.name) {
            const regExpName = /\s*([A-Za-z]+([\.,] |[-']| )?)[A-Za-z]*\s*$/g
            if (!regExpName.test(req.body.name)) {
                res.status(400)
                throw new Error('Invalid Name syntax')
            }
        }

        if (req.body.password) {
            const regExpPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*?>< ])[a-zA-Z0-9!@#$%^&*?>< ]{8,15}$/
            if (!regExpPassword.test(req.body.password)) {
                res.status(400)
                throw new Error('Password must contain at least 1 digit, 1 special character, 1 character and length between 8-15')
            }
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.wallet = req.body.wallet || user.wallet
        user.rechargeTime = req.body.rechargeTime || user.rechargeTime
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            wallet: updatedUser.wallet.toFixed(2),
            rechargeTime: updatedUser.rechargeTime,
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
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1

    const name = req.query.name ? {
        name: {
            $regex: req.query.name,
            $options: 'i'
        }
    } : {}

    const count = await User.countDocuments()

    const users = await User.find({...name }).select('-password').sort({ name: 1 }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ users, page, pages: Math.ceil(count / pageSize), userCount: count })
})

// @desc    Count users for stats
// @route   GET /api/users/stats
// @access  Private/Admin
const getUsersStats = asyncHandler(async(req, res) => {
    const prevWeekDate = new Date
    prevWeekDate.setDate(prevWeekDate.getDate() - 7)
    const totalUsers = await User.find({ createdAt: { $gt: prevWeekDate } }).countDocuments()
    const prevDate = new Date
    prevDate.setDate(prevDate.getDate() - 1)
    const latestUsers = await User.find({ createdAt: { $gt: prevDate } }).countDocuments()
    res.json({
        totalUsers,
        latestUsers
    })
})

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({
            message: 'User removed'
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get User by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {

        if (req.body.name) {
            const regExpName = /\s*([A-Za-z]+([\.,] |[-']| )?)[A-Za-z]*\s*$/g
            if (!regExpName.test(req.body.name)) {
                res.status(400)
                throw new Error('Invalid Name syntax')
            }
        }

        if (req.body.password) {
            const regExpPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*?>< ])[a-zA-Z0-9!@#$%^&*?>< ]{8,15}$/
            if (!regExpPassword.test(req.body.password)) {
                res.status(400)
                throw new Error('Password must contain at least 1 digit, 1 special character, 1 character and length between 8-15')
            }
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.wallet = req.body.wallet || user.wallet
        user.rechargeTime = req.body.wallet ? Date.now() : user.rechargeTime
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            wallet: updatedUser.wallet.toFixed(2),
            rechargeTime: updatedUser.rechargeTime,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
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
    getUsersStats,
    deleteUser,
    getUserById,
    updateUser
}