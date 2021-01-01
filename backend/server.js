import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import helmet from 'helmet'
import cors from 'cors'
import connectDB from './config/db.js'
import path from 'path'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import { errorHandler, notFound } from './Middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
)
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/coupons', couponRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(
    expressStaticGzip(path.join(__dirname, 'build'), {
        enableBrotli: true, // only if you have brotli files too
    }),
);
app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        req.acceptsEncodings('gzip', 'br', 'compress')
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = parseInt(process.env.PORT) || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))