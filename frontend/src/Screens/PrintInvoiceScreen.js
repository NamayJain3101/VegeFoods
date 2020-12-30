import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getOrderDetails } from '../Actions/orderActions'
import * as Scroll from 'react-scroll'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Col, ListGroupItem, Row, Table } from 'react-bootstrap'
import { isMobile } from "react-device-detect";

const PrintInvoiceScreen = ({ history, match }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    window.onafterprint = (event) => {
        history.push('/my-account/myOrders')
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (order) {
            window.print()
        } else {
            if (!userInfo) {
                history.push('/')
            } else {
                dispatch(getOrderDetails(orderId))
            }
        }
    }, [dispatch, history, order, orderId, userInfo])

    return (
        <PrintScreenWrapper>
            <div className='order-details w-100'>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <React.Fragment>
                        <h3 className='px-2 px-md-3 py-2 my-4 text-uppercase font-weight-bold'>VEGEFOODS</h3>
                        <hr style={{ border: '1px solid black', background: 'black' }}></hr>
                        <ListGroupItem className='px-2 px-md-3 py-2 mt-4' style={{ border: 'none' }}>
                            <div className='overflow w-100'>
                                <strong>Order ID:</strong> {order._id}
                            </div>
                            <div className='overflow mt-2 w-100'>
                                <strong>Order Date:</strong> {order.createdAt.substring(0, 10)}
                            </div>
                        </ListGroupItem>
                        <hr style={{ border: '1px solid white' }}></hr>
                        <div style={{ overflow: 'auto' }} className='orderItems'>
                            <Table variant='warning' bordered>
                                <thead style={{ background: 'lightgreen' }}>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>#</th>
                                        <th style={{ textAlign: 'center' }}>Product Name</th>
                                        <th style={{ textAlign: 'center' }}>Description</th>
                                        <th style={{ textAlign: 'center' }}>Quantity</th>
                                        <th style={{ textAlign: 'center' }}>Price</th>
                                        <th style={{ textAlign: 'center' }}>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item, index) => {
                                        return (
                                            <tr className='px-2 px-md-3' key={index}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{item.name}</td>
                                                <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>{item.desc || '-'}</td>
                                                <td style={{ textAlign: 'center' }}>{item.qty}</td>
                                                <td style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>&#8377;{item.price}</td>
                                                <td style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>&#8377;{item.qty * item.price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <hr style={{ border: '1px solid white' }}></hr>
                        <ListGroupItem className='user-details px-2 px-md-3'>
                            <Row className='w-100 m-0'>
                                <Col md={8} className='desc'>
                                    <strong className='mb-2'>Shipping & Payment Details: </strong>
                                    <hr className='w-100' style={{ border: '0', borderTop: '1px solid grey' }}></hr>
                                    <div className='py-2'>
                                        <b>Name: </b>
                                        {order.user.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}                                    </div>
                                    <div className='py-2'>
                                        <b>Address: </b>
                                        {order.shippingAddress.address}, {order.shippingAddress.landmark}, {order.shippingAddress.city}, {order.shippingAddress.state},  {order.shippingAddress.country}-{order.shippingAddress.postalCode}
                                    </div>
                                    <div className='py-2'>
                                        <b>Payment Method: </b>
                                        {order.paymentMethod}
                                    </div>
                                </Col>
                                <Col md={4} className='summary mt-3 my-md-0'>
                                    <div className='py-2 price'>
                                        <b>Subtotal: </b>
                                        &#8377;{order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
                                    </div>
                                    <div className='py-2 price'>
                                        <b>Shipping: </b>
                                        &#8377;{order.shippingPrice}
                                    </div>
                                    <div className='py-2 price'>
                                        <b>Tax (15%): </b>
                                        &#8377;{order.taxPrice}
                                    </div>
                                    <div className='py-2 price'>
                                        <b>Total: </b>
                                        &#8377;{order.totalPrice}
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <hr style={{ border: '1px solid white' }}></hr>
                    </React.Fragment>
                )}
            </div>
        </PrintScreenWrapper>
    )
}

const PrintScreenWrapper = styled.div`
    padding: 5rem 2rem;
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    z-index: 999999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .order-details {
        max-width: 1200px;
        margin: auto;
        padding: 1rem;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        background: white;
        position: relative;
        height: 100%;
    }
    .overflow {
        overflow: visible;
    }
    .overflow::-webkit-scrollbar {
        display: none;
    }
    .list-group-item {
        letter-spacing: 2px;
    }
    .orderItems::-webkit-scrollbar {
        display: none;
    }
    .user-details {
        border: 2px solid rgba(0,0,0,.125);
    }
    .price {
        font-family: sans-serif !important;
    }
    .summary {
        background: #b0ffb0;
        border-radius: 1rem;
        padding: 1.5rem 1rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .desc {
        border-radius: 1rem;
        padding: 1.5rem 1rem;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
    }
    @media(max-width: 700px) {
        padding: 2rem 1rem;
        padding-bottom: 4rem;
    }
`

export default PrintInvoiceScreen
