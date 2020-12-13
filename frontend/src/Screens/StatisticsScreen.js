import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { listOrderStats } from '../Actions/orderActions'
import { listUserStats } from '../Actions/userActions'

const Statistics = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListStats = useSelector(state => state.orderListStats)
    const { loading, stats, error } = orderListStats

    const userListStats = useSelector(state => state.userListStats)
    const { loading: userLoading, stats: userStats, error: userError } = userListStats

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        }
        dispatch(listOrderStats())
        dispatch(listUserStats())
    }, [dispatch, history, userInfo])

    return (
        <div>
            <AdminWrapper>
                <Container>
                    {(loading || userLoading) ? <Loader /> : (error || userError) ? <Message variant='danger'>{error}</Message> : (
                        <Row className='w-100 m-0 data-container mb-5'>
                            <Col md={6} className='my-4 my-md-5'>
                                <div className='data mx-auto' style={{ background: 'linear-gradient(170deg, yellow, white, yellow)' }}>
                                    <CircularProgressbar
                                        maxValue={userStats.totalUsers}
                                        value={userStats.latestUsers}
                                        text={`${(userStats.latestUsers / userStats.totalUsers * 100).toFixed(0)}%`}
                                        strokeWidth={20}
                                        styles={buildStyles({
                                            pathColor: 'red',
                                            trailColor: 'orange'
                                        })}
                                    />
                                    <h4 className='text-center text-capitalize mt-4'>New Users in last 24 hrs</h4>
                                </div>
                            </Col>
                            <Col md={6} className='my-4 my-md-5'>
                                <div className='data mx-auto' style={{ background: 'linear-gradient(170deg, magenta, white, magenta)' }}>
                                    <CircularProgressbar
                                        maxValue={stats.totalOrders}
                                        value={stats.latestOrders}
                                        text={`${(stats.latestOrders / stats.totalOrders * 100).toFixed(0)}%`}
                                        strokeWidth={20}
                                        styles={buildStyles({
                                            pathColor: 'purple',
                                            trailColor: 'deeppink',
                                        })}
                                    />
                                    <h4 className='text-center text-capitalize mt-4'>New Orders in last 24 hrs</h4>
                                </div>
                            </Col>
                            <Col md={6} className='my-4 my-md-5'>
                                <div className='data mx-auto' style={{ background: 'linear-gradient(170deg, cyan, white, cyan)' }}>
                                    <CircularProgressbar
                                        maxValue={stats.totalOrders}
                                        value={stats.paidOrders}
                                        text={`${(stats.paidOrders / stats.latestOrders * 100).toFixed(0)}%`}
                                        strokeWidth={20}
                                        styles={buildStyles({
                                            pathColor: 'blue',
                                            trailColor: '#68abe9'
                                        })}
                                    />
                                    <h4 className='text-center text-capitalize mt-4'>Paid Orders in last 24 Hrs</h4>
                                </div>
                            </Col>
                            <Col md={6} className='mt-4 my-md-5'>
                                <div className='data mx-auto' style={{ background: 'linear-gradient(170deg, mediumspringgreen, white, mediumspringgreen)' }}>
                                    <CircularProgressbar
                                        maxValue={stats.totalOrders}
                                        value={stats.deliveredOrders}
                                        text={`${(stats.deliveredOrders / stats.latestOrders * 100).toFixed(0)}%`}
                                        strokeWidth={20}
                                        styles={buildStyles({
                                            pathColor: 'green',
                                            trailColor: 'lightseagreen'
                                        })}
                                    />
                                    <h4 className='text-center text-capitalize mt-4'>Delivered Orders in last 24 Hrs</h4>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </AdminWrapper>
            <Subscribe />
        </div>
    )
}

const AdminWrapper = styled.div`
    padding: 5rem 2rem;
    hr {
        margin-bottom: 2rem !important;
    }
    .container {
        padding: 0;
    }
    .row > div {
        padding: 0;
    }
    .data-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .data {
        border-radius: 2rem;
        box-shadow: 1px 1px 20px 1px black;
        padding: 2rem 1rem;
        cursor: pointer;
        height: 300px;
        width: max(290px, 80%);
        background: linear-gradient(170deg, #ffff5e, #ffc251, #ffff5e);
        color: black;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in;
    }
    .data:hover {
        transform: scale(0.9);
        transition: all 0.3s ease-in;
    }
    .data h3 {
        letter-spacing: 2px;
    }
    .CircularProgressbar .CircularProgressbar-text {
        fill: black;
        font-size: 1rem;
    }
    @media(max-width: 701px) {
        padding: 2rem;
    }
`

export default Statistics
