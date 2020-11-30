import mongoose from 'mongoose'

const descriptionSchema = mongoose.Schema({
    color: [{ type: String, required: false }],
    flavour: [{ type: String, required: false }]
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
    description: descriptionSchema,
    rating: {
        type: Number,
        required: true,
        default: 0
    },
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
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product