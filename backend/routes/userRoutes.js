import express from 'express'
import { addItemToWishlist, getWishlist, authUser, getUserProfile, registerUser, updateUserProfile, removeItemFromWishlist } from '../Controllers/userControllers.js'
import { protect } from '../Middlewares/authMiddleware.js'
const router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/profile/wishlist').get(protect, getWishlist).post(protect, addItemToWishlist).put(protect, removeItemFromWishlist)

export default router