import express from 'express'
import { addItemToWishlist, deleteUser, getWishlist, authUser, getUserProfile, registerUser, updateUserProfile, removeItemFromWishlist, getUsers, getUsersStats, getUserById, updateUser } from '../Controllers/userControllers.js'
import { admin, protect } from '../Middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/stats').get(protect, admin, getUsersStats)
router.route('/profile/wishlist').get(protect, getWishlist).post(protect, addItemToWishlist).put(protect, removeItemFromWishlist)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router