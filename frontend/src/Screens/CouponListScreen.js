import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import { listCoupons, deleteCoupon } from '../Actions/couponActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { IoCloseSharp } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import { RiCoupon2Line } from 'react-icons/ri'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const CouponListScreen = ({ history }) => {

    const colors = ['magenta', 'orange', 'lime', 'cyan']

    const couponList = useSelector(state => state.couponList)
    const { coupons, loading, error } = couponList

    const couponDelete = useSelector(state => state.couponDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = couponDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        } else {
            dispatch(listCoupons())
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteCouponHandler = (id, code) => {
        confirmAlert({
            title: `Delete coupon: ${code.toUpperCase()}`,
            message: 'Are you sure??',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => dispatch(deleteCoupon(id))
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                },
            ],
        })
    }

    return (
        <div>
            <CouponListWrapper>
                <div className='coupons-container w-100'>
                    <div className="controlbuttons mb-4 mb-md-5">
                        <Link to='/admin' className='btn btn-danger mb-4 mb-md-0'>Go To Admin Panel</Link>
                        <Link to='/admin/couponlist/create' className='btn btn-dark d-flex align-items-center justify-content-between'><FaPlus />&nbsp;Create Coupon</Link>
                    </div>
                    <Row className='w-100 m-0'>
                        {loading || loadingDelete ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorDelete ? <Message variant='danger'>{errorDelete}</Message> : (
                            <React.Fragment>
                                {coupons && coupons.length === 0 ? (
                                    <Message variant='warning'>No Coupons Found</Message>
                                ) : (
                                        coupons.map(coupon => {
                                            return (
                                                <Col md={6} lg={4} className='my-4 px-0' key={coupon._id}>
                                                    <div className='mx-md-4 couponItem'>
                                                        <div className="img-wrapper my-3" style={{ background: colors[Math.floor(Math.random() * colors.length)] }}>
                                                            <RiCoupon2Line />
                                                        </div>
                                                        <div className="desc w-100">
                                                            <div>
                                                                {coupon.discountType.toLowerCase() === 'flat' && (
                                                                    <h5 className='m-0'>
                                                                        Use code <span className='price'>{coupon.code}</span> to get <span className='price'>{coupon.discountType} &#8377;{coupon.discountAmount} Off</span> on min transaction of <span style={{ fontFamily: 'sans-serif' }}>&#8377;{coupon.minAmountRequired}</span>
                                                                    </h5>
                                                                )}
                                                                {coupon.discountType.toLowerCase() === 'upto' && (
                                                                    <h5 className='m-0'>
                                                                        Use code <span className='price'>{coupon.code}</span> to get <span className='price'>{coupon.discountAmount}% Off {coupon.discountType} &#8377;{coupon.discountUpto}</span> on min transaction of <span style={{ fontFamily: 'sans-serif' }}>&#8377;{coupon.minAmountRequired}</span>
                                                                    </h5>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="coupon-buttons">
                                                            <Button variant='danger' onClick={(id, code) => deleteCouponHandler(coupon._id, coupon.code)}><IoCloseSharp /></Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    )}
                            </React.Fragment>
                        )}
                    </Row>
                </div>
            </CouponListWrapper>
        </div>
    )
}

const CouponListWrapper = styled.div`
    padding: 5rem 2rem;
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    .coupons-container {
        max-width: 1200px;
        margin: auto;
    }
    .couponItem {
        background: white;
        min-height: 240px;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        padding: 1rem;
        padding-top: 2rem;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        overflow: hidden;
    }
    .couponItem:hover {
        transform: scale(1.07);
        transition: all 0.3s ease-in-out;
    }
    .coupon-buttons {
        position: absolute;
        top: 0;
        right: 0;
    }
    .coupon-buttons > button {
        border-radius: 0;
        border-bottom-left-radius: 1.5rem;
        padding: 0.4rem 0.8rem;
        font-size: 1.4rem;
    }
    .img-wrapper {
        padding: 0.5rem;
        width: 50px;
        height: 50px;
        font-size: 2rem;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    .desc{
        padding: 0.5rem 1rem;
    }
    .desc > div > h5 {
        text-align: center;
    }
    .desc > div::-webkit-scrollbar {
        height: 0;
    }
    .price {
        font-family: sans-serif;
        font-weight: bold;
    }
    .controlbuttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    @media(max-width: 768px) {
        padding: 2rem;
        .couponItem {
            width: 320px;
        }
        .row > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .controlbuttons {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
        }
    }
    @media(max-width: 400px) {
        .couponItem {
            width: 290px;
        }
    }
`

export default CouponListScreen
