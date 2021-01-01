import React from 'react'
import Hero from '../Components/Hero'
import Veg1 from '../Assets/veg1.webp'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { addToCart, removeFromCart } from '../Actions/cartActions'
import styled from 'styled-components'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import * as Scroll from 'react-scroll'
import { Animated } from "react-animated-css";

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    const queryParams = location.search && location.search.split('&')
    let qty, desc
    if (queryParams && queryParams.length > 0) {
        qty = Number(queryParams[0].split('=')[1])
        desc = queryParams[1].split('=')[1]
    }

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (productId) {
            dispatch(addToCart(productId, qty, desc))
        }
    }, [desc, dispatch, productId, qty])

    const incQty = (id, qty, desc, name) => {
        qty = qty + 1
        dispatch(addToCart(id, qty, desc))
        toast(`You have changed '${name}' QUANTITY to '${qty}'`)
    }

    const decQty = (id, qty, desc, name) => {
        qty = qty - 1
        dispatch(addToCart(id, qty, desc))
        toast(`You have changed '${name}' QUANTITY to '${qty}'`)
    }

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    const removeFromCartHandler = (id, name, desc) => {
        dispatch(removeFromCart(id, desc))
        toast(`Successfully removed '${name}' from your cart`)
    }

    return (
        <div>
            <Hero img={Veg1} title='My Cart' />
            <CartWrapper>
                <Container>
                    {(cartItems.length === 0) ? (
                        <Message>
                            Your Cart is Empty!!
                            <br></br>
                            <Link to='/shop'>Shop Now..</Link>
                        </Message>
                    ) : (
                            <Row>
                                <Col lg={8}>
                                    <Animated animationIn="zoomInUp" animationInDelay={700} animationOut="zoomOutDown" isVisible={true}>
                                        <ListGroup className='myCart'>
                                            <ListGroupItem className='title'>
                                                <h5 className='font-weight-bold text-capitalize'>
                                                    My Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                            </h5>
                                            </ListGroupItem>
                                            {cartItems.map((item, index) => {
                                                return (
                                                    <ListGroupItem key={index}>
                                                        <div className='img-container'>
                                                            <img src={item.image} style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)} alt={item.name} className='img-fluid' />
                                                        </div>
                                                        <div className='desc'>
                                                            <h4 style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)}>{item.name}</h4>
                                                            <h5 className='text-muted mb-3 text-capitalize'>{item.desc && item.desc}</h5>
                                                            <h4 className='mb-3 price'>&#8377;{item.price}</h4>
                                                            {item.InStock <= 0
                                                                ? <h4 className='text-danger mb-3'>Currently Out Of Stock</h4>
                                                                : <h5 className='text-success mb-3'>{item.InStock} Kg available</h5>
                                                            }
                                                        </div>
                                                        <div className='subtotal'>
                                                            <div className='quantity'>
                                                                <button disabled={item.qty <= 1} onClick={(id, qty, desc, name) => decQty(item.product, item.qty, item.desc, item.name)}>-</button>
                                                                <div className='input'>{`${item.qty} Kg`}</div>
                                                                <button disabled={item.qty >= item.InStock} onClick={(id, qty, desc, name) => incQty(item.product, item.qty, item.desc, item.name)}>+</button>
                                                            </div>
                                                            <Button className='btn btn-danger mt-4' onClick={(id, name, desc) => removeFromCartHandler(item.product, item.name, item.desc)}><FaTrash /> Delete</Button>
                                                        </div>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </Animated>
                                </Col>
                                <Col lg={4} className='price-details mt-5 mt-lg-0'>
                                    <Animated animationIn="zoomInUp" animationInDelay={700} animationOut="zoomOutDown" isVisible={true}>
                                        <ListGroup>
                                            <ListGroupItem className='title'>
                                                <h5 className='font-weight-bold text-capitalize'>
                                                    Price Details
                                                </h5>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <h5>
                                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):
                                                </h5>
                                                <h5 className='price'>
                                                    &#8377;{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                                </h5>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <h5>
                                                    Shipping Price:
                                                </h5>
                                                <h5 className='price'>
                                                    &#8377;{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) < 500) ? '100.00' : '0.00'}
                                                </h5>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <h5>
                                                    Total Price:
                                                </h5>
                                                <h5 className='price'>
                                                    &#8377;{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) < 500)
                                                        ? (cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 100).toFixed(2)
                                                        : (cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)).toFixed(2)
                                                    }
                                                </h5>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Button
                                                    variant='success'
                                                    disabled={cartItems.length === 0}
                                                    className='btn btn-block checkout'
                                                    onClick={checkoutHandler}
                                                >
                                                    Checkout
                                                </Button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Animated>
                                </Col>
                            </Row>
                        )}
                </Container>
            </CartWrapper>
            <ToastContainer
                closeButton={false}
                position="bottom-center"
                autoClose={3000}
                closeOnClick={false}
                draggable={false}
                pauseOnHover={false}
                bodyClassName="text-center"
                bodyStyle={{ color: 'white', letterSpacing: '2px', fontSize: '1rem' }}
            />
            <Subscribe />
        </div>
    )
}

const CartWrapper = styled.div`
    padding: 5rem 0;
    .myCart {
        max-height: 600px;
        overflow: auto;
    }
    .list-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 1rem;
    }
    .img-container {
        width: 30%;
    }
    .desc {
        width: 40%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .subtotal {
        width: 30%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .remove {
        border-radius: 50%;
        background: white;
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
    .price {
        font-family: sans-serif;
    }
    .quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100% !important;
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
    .checkout {
        width: calc(100% - 10px);
        background: linear-gradient(to bottom right, grey, black, grey);
        padding: 0.7rem 1.5rem;
        outline: 2px solid black;
        outline-offset: 4px;
        border: none;
        border-radius: 0;
        text-transform: uppercase;
        color: lime;
        letter-spacing: 2px;
    }
    .price-details > .animated > .list-group > .list-group-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
    }
    .price-details > .animated > .list-group > .list-group-item h5 {
        margin: 0;
    }
    .price-details > .animated > .list-group > .title {
        padding: 1rem;
    }
    .price-details > .animated > .list-group > .title h5 {
        width: 100%;
        text-align: center;
    }
    @media(max-width: 800px) {
        .myCart {
            max-height: 700px;
            overflow: auto;
        }
        .list-group-item {
            display: block;
            padding: 0 5rem 2rem 5rem;
        }
        .img-container {
            width: 100%;
        }
        .desc {
            width: 100%;
        }
        .subtotal {
            width: 100%;
        }
    }
    .title {
        padding: 1rem;
        background: linear-gradient(to bottom right, lightgreen, #60e99e, lightgreen);;
        color: black;
    }
    .title h5 { 
        width: 100%;
        margin: 0;
        letter-spacing: 3px;
        text-align: center;
    }
`

export default CartScreen
