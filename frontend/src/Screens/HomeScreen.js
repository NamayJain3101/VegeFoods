import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Product from '../Components/Product'
import { listBestProducts, listTopRatedProducts } from '../Actions/productActions'
import Loader from '../Components/Loader'
import MainCarousel from '../Components/MainCarousel'
import Message from '../Components/Message'
import Services from '../Components/Services'
import Subscribe from '../Components/Subscribe'
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'
import { Animated } from "react-animated-css";
import * as Scroll from 'react-scroll'

const HomeScreen = () => {

    const productTopRated = useSelector(state => state.productTopRated)
    const { products, loading, error } = productTopRated

    const productBest = useSelector(state => state.productBest)
    const { product: productBestProduct, loading: loadingBestProduct, error: errorBestProduct } = productBest

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listTopRatedProducts())
        dispatch(listBestProducts())
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    }, [dispatch])

    return (
        <div>
            <MainCarousel />
            <Services />
            <TopProductsWrapper>
                <Container>
                    <h5 className='text-success text-center'>Products</h5>
                    <h2 className='text-center'>Featured Products</h2>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Animated animationIn="zoomInUp" animationOut="zoomOutDown" isVisible={true}>
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
                        </Animated>
                    )}
                </Container>
            </TopProductsWrapper>
            <BestDealWrapper>
                <Container>
                    <h5 className='text-success text-center'>Best Price For You</h5>
                    <h2 className='text-center'>Deal of The Day</h2>
                    {loadingBestProduct ? <Loader /> : errorBestProduct ? <Message variant='danger'>{errorBestProduct}</Message> : (
                        <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                            <Row>
                                <Col md={6}>
                                    <div className='img-container'>
                                        <Tilt className="Tilt"
                                            options={{
                                                max: 35,
                                                perspective: 700,
                                                scale: 1.1,
                                                speed: 900,
                                                transition: true,
                                                easing: "cubic-bezier(.03,.98,.52,.99)"
                                            }}
                                        >
                                            <img src={productBestProduct.image} alt='best Deal' className='img-fluid' />
                                        </Tilt>
                                    </div>
                                </Col>
                                <Col md={5}>
                                    <Link to={`/shop/${productBestProduct._id}`}>
                                        <h1 className='text-success font-italic'>{productBestProduct.name}</h1>
                                    </Link>
                                    <h3 className='price'><span>&#8377;{productBestProduct.discountPrice}</span> Now at &#8377;{productBestProduct.price}</h3>
                                    <p>Hurry! Offer valid for limited time only...</p>
                                </Col>
                            </Row>
                        </Animated>
                    )}
                </Container>
            </BestDealWrapper>
            <Subscribe />
        </div>
    )
}

const TopProductsWrapper = styled.div`
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

const BestDealWrapper = styled.div`
    padding: 5rem 0;
    background-image: linear-gradient(170deg, white, lightgreen, white);
    h5 {
        font-style: italic;
        margin-bottom: 1rem;
    }
    h2 {
        font-weight: bold;
        margin-bottom: 3rem;
    }
    .row {
        max-width: 900px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .row > div > .img-container {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 2rem;
    }
    .row > div > .img-container img {
        transform: scale(1.3);
        border-radius: 50%;
    }
    .price {
        font-family: sans-serif;
        font-weight: bold;
        margin-bottom: 2rem;
    }
    .price > span {
        font-family: sans-serif;
        font-weight: normal;
        text-decoration: line-through;
    }
    p {
        letter-spacing: 2px;
        font-size: 1rem;
    }
    @media(max-width: 768px) {
        .row > div {
            text-align: center;
        }
    }
`

export default HomeScreen
