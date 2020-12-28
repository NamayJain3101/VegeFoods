import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    discountUpto: { type: Number, required: false },
    minAmountRequired: { type: Number, required: true },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon