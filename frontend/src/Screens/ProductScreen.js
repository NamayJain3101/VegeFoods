import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Tilt from 'react-tilt'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Subscribe from '../Components/Subscribe'
import Product from '../Components/Product'
import { listProductDetails, listProducts } from '../Actions/productActions'
import { addItemToWishlist } from '../Actions/userActions'

const ProductScreen = ({ match, history }) => {

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const productList = useSelector(state => state.productList)
    const { products, error: errorProducts, loading: loadingProducts } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
        dispatch(listProducts(product.category, ''))
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
    }, [dispatch, match, product.category])

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
                                <Rating value={product.rating} text={product.numReviews} />
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
            <SimilarProductsWrapper>
                <Container>
                    <h5 className='text-success text-center'>Products</h5>
                    <h2 className='text-center'>Related Products</h2>
                    {loadingProducts ? <Loader /> : errorProducts ? <Message variant='danger'>{errorProducts}</Message> : (
                        <Row>
                            {
                                products.map(product => {
                                    return (
                                        <Col key={product.name} md={6} lg={3}>
                                            <Product product={product} />
                                        </Col>
                                    )
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
