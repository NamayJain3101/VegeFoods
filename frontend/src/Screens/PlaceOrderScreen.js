import React, { useEffect } from 'react'
import { Button, Col, ListGroupItem, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import * as Scroll from 'react-scroll'

const PlaceOrderScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))

    const placeOrderHandler = () => {

    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    })

    return (
        <div>
            <PlaceOrderWrapper>
                <CheckoutSteps step1 step2 step3 step4 mb='1rem' />
                <Row className='w-100 my-0 mx-auto'>
                    <Col lg={8} className='pl-0 pr-0 pr-lg-5'>
                        <Col className='card-view my-4 py-4 px-5'>
                            <h5>Shipping</h5>
                            <p className='mb-0 mt-2'>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.landmark}, {shippingAddress.city}, {shippingAddress.state},  {shippingAddress.country}-{shippingAddress.postalCode}
                            </p>
                        </Col>
                        <Col className='card-view my-4 py-4 px-5'>
                            <h5>Payment Method: </h5>
                            <p className='mb-0 mt-2'>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </Col>
                        <Col className='card-view order-items px-2 my-4 py-4 px-md-5'>
                            <h5 className='mb-4 pl-md-0'>Order Items</h5>
                            {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <React.Fragment>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <ListGroupItem key={index}>
                                                <Col xs={4} md={5} className='img-container'>
                                                    <img src={item.image} style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)} alt={item.name} className='img-fluid' />
                                                </Col>
                                                <Col xs={8} md={6} className='desc'>
                                                    <h4 style={{ cursor: 'pointer' }} onClick={() => history.push(`/shop/${item.product}`)}>{item.name}</h4>
                                                    <h5 className='text-muted mb-3 text-capitalize'>({item.desc && item.desc})</h5>
                                                    <h4 className='price'>{item.qty} Kg x &#8377;{item.price} = &#8377;{item.qty * item.price}</h4>
                                                </Col>
                                            </ListGroupItem>
                                        )
                                    })}
                                </React.Fragment>
                            )}
                        </Col>
                    </Col>
                    <Col lg={4} className='p-0'>
                        <div className="card-view order-details px-2 py-4 px-lg-3 px-xl-4 mt-4">
                            <ListGroupItem className='title'>
                                <h5 className='font-weight-bold text-capitalize'>
                                    Order Summary
                            </h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5>
                                    Subtotal :
                            </h5>
                                <h5 className='price'>
                                    &#8377;{cart.itemsPrice}
                                </h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5>
                                    Shipping Price:
                            </h5>
                                <h5 className='price'>
                                    &#8377;{cart.shippingPrice}
                                </h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5>
                                    Tax Price:
                            </h5>
                                <h5 className='price'>
                                    &#8377;{cart.taxPrice}
                                </h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h5>
                                    Total Price:
                            </h5>
                                <h5 className='price'>
                                    &#8377;{cart.totalPrice}
                                </h5>
                            </ListGroupItem>
                            <ListGroupItem className='px-4 py-3'>
                                <Button
                                    variant='success'
                                    disabled={cartItems.length === 0}
                                    className='btn btn-block checkout'
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                            </Button>
                            </ListGroupItem>
                        </div>
                    </Col>
                </Row>
            </PlaceOrderWrapper>
        </div>
    )
}

const PlaceOrderWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 3rem;
    padding-bottom: 5rem;
    width: 100%;
    > .row {
        max-width: 1200px;
    }
    .nav {
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 1px green;
        padding: 1rem;
        background: white;
    }
    .card-view {
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 1px green;
        padding: 1rem;
        background: white;
    }
    .card-view strong {
        letter-spacing: 2px;
    }
    .order-items {
        max-height: 500px;
        overflow: auto;
    }
    .order-items::-webkit-scrollbar-track {
        margin: 2rem 0;
        border-radius: 2rem;
    }
    .order-items .desc {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .list-group-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .order-details h5 {
        margin: 0;
    }
    .price {
        font-family: sans-serif;
    }
    .checkout {
        width: calc(100% - 10px);
        padding: 0.7rem 1.5rem;
        border: none;
        border-radius: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    @media(max-width: 700px) {
        padding: 3rem 1rem;
        padding-bottom: 5rem;
        .order-items .img-container {
            padding: 0;
        }
        .order-items .desc {
            padding: 0;
        }
        .order-items > div {
            padding: 0.75rem 0;
        }
        .order-items > h5 {
            padding-left: 40px;
        }
        .order-items .price {
            font-size: 1.3rem;
        }
        .order-items::-webkit-scrollbar {
            width: 5px !important;
        }
    }
`

export default PlaceOrderScreen
