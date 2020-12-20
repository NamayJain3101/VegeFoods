import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    InStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product