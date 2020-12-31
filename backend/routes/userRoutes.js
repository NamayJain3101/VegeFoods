import express from 'express'
import { addItemToWishlist, deleteUser, getWishlist, authUser, getUserProfile, registerUser, updateUserProfile, removeItemFromWishlist, getUsers, getUsersStats, getUserById, updateUser } from '../Controllers/userControllers.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
    handler: (req, res, next) => {
        res.status(429)
        throw new Error(`Too many requests, please try again later.`)
    }
});

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(limiter, authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/stats').get(protect, admin, getUsersStats)
router.route('/profile/wishlist').get(protect, getWishlist).post(protect, addItemToWishlist).put(protect, removeItemFromWishlist)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router