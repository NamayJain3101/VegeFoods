import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listMyOrders } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import OrderStatus from '../Components/OrderStatus'
import Subscribe from '../Components/Subscribe'
import * as Scroll from 'react-scroll'
import Pagination from 'react-js-pagination'
import { ORDER_DETAILS_RESET } from '../Constants/orderConstants'

const MyOrdersScreen = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, pages, orderCount, loading, error } = orderListMy

    const dispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listMyOrders(pageNumber))
        }
    }, [dispatch, history, pageNumber, userInfo])

    return (
        <div>
            <MyOrdersWrapper>
                <div className='mx-auto' style={{ maxWidth: '1200px' }}>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <React.Fragment>
                            {orders && orders.length > 0 ? (
                                <Row className='orders'>
                                    {orders.map(item => {
                                        return (
                                            <Col key={item._id} md={6} xl={4}>
                                                <div className='mx-auto'>
                                                    <div className="head bg-warning w-100">
                                                        <h5 className='m-0 py-2 px-3 pt-3'>{item._id}</h5>
                                                    </div>
                                                    <div className='img-container' onClick={() => history.push(`/orders/${item._id}`)}>
                                                        <Row className='w-100 m-0'>
                                                            <Col xs={6}>
                                                                <img src={item.orderItems[item.orderItems.length - 1].image} alt={item.orderItems[item.orderItems.length - 1].name} className='img-fluid' />
                                                            </Col>
                                                            <Col xs={6} className='more-items' style={item.orderItems.length <= 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}>
                                                                <div>
                                                                    <FaPlus className='mb-2' />
                                                                    {item.orderItems.length - 1} more
                                                            </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className='desc mt-3' onClick={() => history.push(`/orders/${item._id}`)}>
                                                        <h5>Total: </h5>
                                                        <h5 className='price'>&#8377;{item.totalPrice}</h5>
                                                    </div>
                                                    <div className='status text-center' onClick={() => history.push(`/orders/${item._id}`)}>
                                                        <OrderStatus placed cancelled={item.isCancelled} paid={item.isPaid} delivered={item.isDelivered} mb='1rem' />
                                                        Status: {item.isCancelled ? 'CANCELLED' : item.isDelivered ? 'DELIVERED' : item.isPaid ? 'PAID' : 'CONFIRMED'}
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            ) : (
                                    <Message variant='warning'>
                                        You have not ordered anything yet &#128542;
                                        <br></br>
                                        <Link to='/shop' style={{ color: 'black' }}>Order Now!!</Link>
                                    </Message>
                                )}
                            {pages > 1 && (
                                <Pagination
                                    hideDisabled
                                    hideFirstLastPages
                                    pageRangeDisplayed={4}
                                    activePage={pageNumber}
                                    itemsCountPerPage={9}
                                    totalItemsCount={orderCount}
                                    onChange={(page) => setPageNumber(page)}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    prevPageText='<'
                                    nextPageText='>'
                                    firstPageText='<<'
                                    lastPageText='>>'
                                />
                            )}
                        </React.Fragment>
                    )}
                </div>
            </MyOrdersWrapper>
            <Subscribe />
        </div>
    )
}

const MyOrdersWrapper = styled.div`
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    padding: 5rem 2rem;
    .orders {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .row > div > div {
        background: white;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        cursor: pointer;
        max-width: 400px;
        margin: 1.5rem auto;
        overflow: hidden;
    }
    .head {
        text-align: center;
    }
    .img-container {
        border-radius: 2rem;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .img-container > .row > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img-container img {
        border-radius: 50%;
        transition: all 0.3s ease-in;
    }
    .img-container img:hover {
        transform: scale(1.2);
        transition: all 0.3s ease-in;
    }
    .img-container .more-items {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img-container .more-items > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #f0f0f0;
        margin: 1rem;
        padding: 1rem 0;
        box-shadow: none;
        width: 80px;
        height: 80px;
    }
    .desc {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    .desc h5 {
        margin: 0;
    }
    .price {
        font-family: sans-serif;
    }
    .status {
        letter-spacing: 2px;
    }
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .page-item {
        width: 38px !important;
        height: 38px !important;
        margin: 0 7px;
        margin-bottom: 10px;
    }
    .page-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .page-item, .page-link {
        border-radius: 50% !important;
        color: green;
        border-color: green;
    }
    .page-item.active .page-link {
        background-color: green;
        border-color: green;
    }
    .page-link:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 128, 0, 0.3);
    }
    .page-link:hover {
        background-color: rgba(0, 128, 0, 0.1);
    }
    @media(max-width: 992px) {
        .container {
            padding: 0;
        }
    }
    @media(max-width: 701px) {
        padding: 2rem;
        .row > div > div {
            margin: 1rem;
        }
        .row > div {
            padding: 1rem 0;
        }
    }
    @media(max-width: 501px) {
        padding: 2rem;
        .row > div > div {
            margin: 1rem;
        }
        .row > div {
            padding: 1rem 0.5rem;
        }
    }
`

export default MyOrdersScreen
