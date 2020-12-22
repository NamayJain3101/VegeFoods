import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import { Button, Col, Container, Form, ListGroupItem, ProgressBar, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Tilt from 'react-tilt'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Subscribe from '../Components/Subscribe'
import Product from '../Components/Product'
import { createProductReview, getProductReviews, listProductDetails, listProducts } from '../Actions/productActions'
import { addItemToWishlist } from '../Actions/userActions'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../Constants/productConstants'

const ProductScreen = ({ match, history }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const productList = useSelector(state => state.productList)
    const { products, error: errorProducts, loading: loadingProducts } = productList

    const productCreateReview = useSelector(state => state.productCreateReview)
    const { success: successProductReview, error: errorProductReview } = productCreateReview

    const productGetReview = useSelector(state => state.productGetReview)
    const { error: errorReviewStats, loading: loadingReviewStats, stats } = productGetReview

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }
        dispatch(listProductDetails(match.params.id))
        dispatch(listProducts(product.category, ''))
        dispatch(getProductReviews(match.params.id))
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
    }, [dispatch, match, product.category, successProductReview])

    let desc;
    if (product.description) {
        desc = product.description.replaceAll(" ", "").split(',')
    }

    const [description, setDescription] = useState(desc && desc[0])
    const [qty, setQty] = useState(1)

    const incQty = () => {
        setQty(qty + 1)
    }

    const decQty = () => {
        setQty(qty - 1)
    }

    const addToCartHandler = (qty, description) => {
        if (!description && desc && desc.length !== 0) {
            description = desc[0]
        }
        history.push(`/cart/${product._id}?qty=${qty}&desc=${description}`)
    }

    const addToWishlistHandler = () => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(addItemToWishlist({
                wishlist: {
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    InStock: product.InStock
                }
            }))
        }
    }

    const addReviewHandler = () => {
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <div>
            <ProductScreenWrapper>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Container>
                        <Button type='button' variant='light' onClick={() => history.push('/shop')}>Go Back</Button>
                        <Row>
                            <Col lg={6} className='img-container'>
                                <Tilt className="Tilt"
                                    options={{
                                        max: 45,
                                        perspective: 500,
                                        scale: 1.2,
                                        speed: 300,
                                        transition: true,
                                        easing: "cubic-bezier(.03,.98,.52,.99)"
                                    }}
                                >
                                    <img src={product.image} alt={product.name} className='img-fluid w-100' />
                                </Tilt>
                            </Col>
                            <Col lg={6} className='description'>
                                <h2 className='text-uppercase'>{product.name}</h2>
                                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                                <h2 className='price'>
                                    {product.discountPrice && <span className='text-muted'>&#8377;{product.discountPrice}</span>}
                                    &#8377;{product.price}/Kg
                                </h2>
                                {desc && (
                                    <Form.Control className='desc' as='select' value={description} onChange={(e) => { setDescription(e.target.value) }}>
                                        {desc.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Form.Control>
                                )}
                                <div className='quantity'>
                                    <button disabled={qty <= 1} onClick={decQty}>-</button>
                                    <div className='input'>{`${qty} Kg`}</div>
                                    <button disabled={qty >= product.InStock} onClick={incQty}>+</button>
                                </div>
                                <h6>{product.InStock > 0 ? `${product.InStock} Kg available` : `Out Of Stock`}</h6>
                                <Button
                                    disabled={product.InStock <= 0}
                                    className='cartButton'
                                    variant='success'
                                    type='button'
                                    onClick={(q, d) => addToCartHandler(qty, description)}
                                >
                                    Add To Cart
                                </Button>
                                <Button
                                    className='wishlistButton'
                                    variant='success'
                                    type='button'
                                    onClick={() => addToWishlistHandler()}
                                >
                                    Add To Wishlist
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )}
            </ProductScreenWrapper>
            <ReviewsWrapper rating={rating === 0 ? 6 : (6 - rating)}>
                <Container>
                    <h5 className='text-success text-center'>Reviews</h5>
                    <h2 className='text-center'>Product Reviews</h2>
                    {loadingReviewStats ? <Loader /> : errorReviewStats ? <Message variant='danger'>{errorReviewStats}</Message> : (
                        <Row>
                            <Col lg={6} className='ratingStats'>
                                <div className="total-rating">
                                    <CircularProgressbar
                                        maxValue={5}
                                        value={product.rating}
                                        text={`${product.rating}★`}
                                        strokeWidth={10}
                                        styles={buildStyles({
                                            pathColor: 'orange',
                                            trailColor: '#68abe9'
                                        })}
                                    />
                                </div>
                                <div className="rating-desc">
                                    <div className='mb-3'>
                                        <span>5★</span>
                                        <ProgressBar max={product.numReviews} variant='success' now={stats.star5} label={stats.star5} />
                                    </div>
                                    <div className='mb-3'>
                                        <span>4★</span>
                                        <ProgressBar max={product.numReviews} variant='info' now={stats.star4} label={stats.star4} />
                                    </div>
                                    <div className='mb-3'>
                                        <span>3★</span>
                                        <ProgressBar max={product.numReviews} variant='warning' now={stats.star3} label={stats.star3} />
                                    </div>
                                    <div className='mb-3'>
                                        <span>2★</span>
                                        <ProgressBar max={product.numReviews} variant='danger' now={stats.star2} label={stats.star2} />
                                    </div>
                                    <div>
                                        <span>1★</span>
                                        <ProgressBar max={product.numReviews} variant='dark' now={stats.star1} label={stats.star1} />
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} className='create-review mt-5 mt-lg-0'>
                                <h4 className='m-0 font-weight-bold'>Rate Product</h4>
                                {!userInfo ? (
                                    <Message>
                                        <Link to='/login'>Sign In to rate product</Link>
                                    </Message>
                                ) : (
                                        <React.Fragment>
                                            <div className="rating">
                                                <span onClick={() => setRating(1)}>★</span>
                                                <span onClick={() => setRating(2)}>★</span>
                                                <span onClick={() => setRating(3)}>★</span>
                                                <span onClick={() => setRating(4)}>★</span>
                                                <span onClick={() => setRating(5)}>★</span>
                                            </div>
                                            <div className="comment">
                                                <textarea name="comment" id="comment" cols="30" rows="3" value={comment} placeholder='Add Comment' onChange={(e) => setComment(e.target.value)} ></textarea>
                                            </div>
                                            {errorProductReview && <p className='text-danger text-capitalize error'>{errorProductReview}</p>}
                                            <Button variant='success' className='mt-3' onClick={addReviewHandler}>Post</Button>
                                        </React.Fragment>
                                    )}
                            </Col>
                            <Col xs={12} className='comment-list mt-5'>
                                {product && product.reviews && product.reviews.length === 0 ? <Message>No Reviews</Message> : (
                                    <React.Fragment>
                                        {product && product.reviews && product.reviews.slice(0).reverse().map(review => {
                                            return (
                                                <ListGroupItem key={review._id}>
                                                    <strong>{review.name.toUpperCase()}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>Date: {review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroupItem>
                                            )
                                        })}
                                    </React.Fragment>
                                )}
                            </Col>
                        </Row>
                    )}
                </Container>
            </ReviewsWrapper>
            <SimilarProductsWrapper>
                <Container>
                    <h5 className='text-success text-center'>Products</h5>
                    <h2 className='text-center'>Related Products</h2>
                    {loadingProducts ? <Loader /> : errorProducts ? <Message variant='danger'>{errorProducts}</Message> : (
                        <Row>
                            {
                                products.map((product, index) => {
                                    if (index < 4) {
                                        return (
                                            <Col key={index} md={6} lg={3}>
                                                <Product product={product} />
                                            </Col>
                                        )
                                    } else {
                                        return <React.Fragment key={index}></React.Fragment>
                                    }
                                })
                            }
                        </Row>
                    )}
                </Container>
            </SimilarProductsWrapper>
            <Subscribe />
        </div>
    )
}

const ProductScreenWrapper = styled.div`
    padding: 5rem;
    * {
        margin-bottom: 1rem;
    }
    h2 > span {
        margin-right: 10px;
        font-family: sans-serif !important;
        text-decoration: line-through;
    }
    .row {
        display: flex;
        align-items: center;
    }
    .row > .img-container {
        border-radius: 50%;
        overflow: hidden;
    }
    .row > .img-container > img {
        border-radius: 50%;
    }
    .description {
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .description * {
        text-align: center;
    }
    .row div {
        width: 100%;
    }
    .price {
        font-family: sans-serif !important;
    }
    .quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50% !important;
        margin-top: 1rem;
    }
    .quantity button {
        border: 1px solid #f0f0f0;
        outline: none;
        background: white;
        padding: 5px;
        font-size: 1.2rem;
        width: 20%;
    }
    .quantity .input {
        text-align: center;
        border: 1px solid #f0f0f0;
        outline: none;
        background: white;
        padding: 5px 13px;
        font-size: 1.2rem;
        width: 50%;
    }
    .desc {
        text-transform: capitalize;
        outline: none;
        border: 1px solid #f0f0f0;
        width: 50% !important;
    }
    .cartButton {
        outline: none;
        padding: 1rem 3rem;
        border-radius: 3rem;
        border: none;
        background: linear-gradient(to bottom right, grey, black, grey);
        width: 50%;
    }
    .cartButton:hover, .cartButton:focus, .cartButton:active {
        background: #82ae46;
    } 
    .wishlistButton {
        outline: none;
        padding: 1rem 3rem;
        border-radius: 3rem;
        border: none;
        background: linear-gradient(to bottom right, yellow, orange, yellow);
        width: 50%;
        color: black;
    }
    .wishlistButton:hover, .wishlistButton:focus, .wishlistButton:active {
        background: #82ae46;
        color: white;
    } 
    @media(max-width: 701px) {
        padding: 5rem 2rem;
        .quantity {
            width: 80% !important;
        }
        .desc {
            width: 80% !important;
        }
        .cartButton {
            width: 80%;
        }
        .wishlistButton {
            width: 80%;
        }
    }
    @media(max-width: 501px) {
        .quantity {
            width: 100% !important;
        }
        .desc {
            width: 100% !important;
        }
        .cartButton {
            width: 100%;
        }
        .wishlistButton {
            width: 100%;
        }
    }
`

const ReviewsWrapper = styled.div`
    background: white;
    padding-bottom: 5rem;
    h5 {
        font-style: italic;
        margin-bottom: 1rem;
    }
    h2 {
        font-weight: bold;
        margin-bottom: 3rem;
    }
    button {
        width: 270px;
        border-radius: 2rem;
    }
    .error {
        text-align: center;
    }
    .ratingStats {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .total-rating {
        width: 25%;
    }
    .rating-desc {
        width: 65% !important;
    }
    .rating-desc > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .rating-desc span {
        width: 10%;
    }
    .rating-desc .progress {
        width: 90%;
    }
    .create-review {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .rating {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: pink;
        margin-bottom: 1rem;
    }
    .rating > span:hover {
        color: red;
    }
    .rating > span:nth-last-child(1n + ${props => props.rating}) {
        color: red;
    }
    .comment {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .comment > textarea {
        padding: 0.5rem 1rem;
        border: 1px solid green;
        outline: none;
        width: 90%;
    }
    .comment-list {
        max-height: 400px;
        overflow: auto;
        max-width: 600px;
        margin: auto;
    }
    .comment-list .list-group-item > div {
        font-size: 1rem !important;
        justify-content: start !important;
    }
    @media(max-width: 991px) {
        .ratingStats {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
        }
        .total-rating {
            width: 25%;
            margin-bottom: 2rem;
        }
        .rating-desc {
            width: 70% !important;
            margin-bottom: 1rem;
        }
    }
    @media(max-width: 600px) {
        .ratingStats {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
        }
        .total-rating {
            width: 40%;
            margin-bottom: 2rem;
        }
        .rating-desc {
            width: 90% !important;
            margin-bottom: 1rem;
        }
    }
`

const SimilarProductsWrapper = styled.div`
    background: #fff;
    padding-bottom: 5rem;
    h5 {
        font-style: italic;
        margin-bottom: 1rem;
    }
    h2 {
        font-weight: bold;
        margin-bottom: 3rem;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default ProductScreen