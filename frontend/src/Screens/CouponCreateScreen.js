import React, { useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Tilt from 'react-tilt'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import * as Scroll from 'react-scroll'
import { Link } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import Toggle from 'react-toggle'
import "../reactToggle.css"
import { RiCoupon2Line, RiCoupon3Line } from 'react-icons/ri'
import { createCoupon } from '../Actions/couponActions'
import { COUPON_CREATE_RESET } from '../Constants/couponConstants'

const CouponCreateScreen = ({ history }) => {

    const [code, setCode] = useState('')
    const [discountType, setDiscountType] = useState('flat')
    const [discountAmount, setDiscountAmount] = useState('')
    const [discountUpto, setDiscountUpto] = useState('')
    const [minAmountRequired, setMinAmountRequired] = useState('')

    const toggleDiscountType = (e) => {
        const toggle = e.target.checked
        if (toggle) {
            setDiscountType('upto')
        } else {
            setDiscountType('flat')
        }
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const couponCreate = useSelector(state => state.couponCreate)
    const { loading, success, error } = couponCreate

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        }
        if (success) {
            history.push('/admin/couponlist')
            dispatch({
                type: COUPON_CREATE_RESET
            })
        }
    }, [dispatch, history, success, userInfo])

    const createCouponHandler = () => {
        dispatch(createCoupon({
            code,
            discountType,
            discountUpto,
            discountAmount,
            minAmountRequired
        }))
    }

    return (
        <div>
            <CouponCreateWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <Link to='/admin/couponlist' className='btn mt-0 btn-danger btnClose'><GrClose /></Link>
                        {loading ? <Loader /> : (
                            <Row>
                                <Col lg={6} className='d-none d-lg-flex pr-lg-5'>
                                    <Tilt className="Tilt"
                                        options={{
                                            max: 45,
                                            perspective: 700,
                                            scale: 1.2,
                                            speed: 700,
                                            transition: true,
                                            easing: "cubic-bezier(.03,.98,.52,.99)"
                                        }}
                                    >
                                        <div className='w-100 d-flex align-items-center justify-content-center'>
                                            <RiCoupon3Line className='m-0' style={{ fontSize: '10rem' }} />
                                            <RiCoupon2Line className='m-0' style={{ fontSize: '10rem' }} />
                                        </div>
                                    </Tilt>
                                </Col>
                                <Col lg={6} className='form'>
                                    <h3 className='text-center text-uppercase font-weight-bold'>Create Coupon</h3>
                                    <React.Fragment>
                                        <input type="text" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder='Enter Coupon Code' />
                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                            <label htmlFor='toggleDiscountType' className='m-0 mx-3'>{'flat'.toUpperCase()}</label>
                                            <Toggle
                                                id='toggleDiscountType'
                                                className='toggle-custom'
                                                icons={false}
                                                onChange={(e) => toggleDiscountType(e)}
                                            />
                                            <label htmlFor='toggleDiscountType' className='m-0 mx-3'>{'upto'.toUpperCase()}</label>
                                        </div>
                                        <input type="number" name="discountAmount" id="discountAmount" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} placeholder={discountType === 'flat' ? `Enter Discount Amount` : `Enter Discount Percent`} />
                                        {discountType === 'upto' && (
                                            <input type="number" name="discountUpto" id="discountUpto" value={discountUpto} onChange={(e) => setDiscountUpto(e.target.value)} placeholder='Enter Max Discount Amount' />
                                        )}
                                        <input type="number" name="minAmountRequired" id="minAmountRequired" value={minAmountRequired} onChange={(e) => setMinAmountRequired(e.target.value)} placeholder='Enter Min Amount Required' />
                                        {error && <p className='text-danger text-capitalize error'>{error}</p>}
                                        <Button variant='success' className='btn btn-block text-uppercase' onClick={createCouponHandler}>create</Button>
                                    </React.Fragment>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </Animated>
            </CouponCreateWrapper>
        </div>
    )
}

const CouponCreateWrapper = styled.div`
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    padding: 3rem 0;
    padding-bottom: 5rem;
    .container {
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 5px 5px 40px 5px green;
        position: relative;
    }
    .btnClose {
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 2rem;
        border-bottom-left-radius: 1.8rem;
        margin: 0;
        padding: 0.8rem 1rem;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container h3 {
        margin-bottom: 3rem;
    }
    .container input {
        width: 100%;
        margin-bottom: 1rem;
        border-radius: 2rem;
        padding: 0.7rem 1.5rem;
        border: none;
        outline: none;
        background: #f0f0f0;
    }
    .container input:focus {
        box-shadow: 1px 1px 15px 3px lightgreen;
    }
    .container button {
        border-radius: 2rem;
        padding: 0.7rem 1.5rem;
        border: none;
        outline: none;
        margin-top: 1rem;
    }
    .container a {
        color: black;
        margin-top: 1rem;
    }
    .container > .row > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .error {
        text-align: center;
    }
    .error-input {
        box-shadow: 1px 1px 5px 1px red;
    }
    .react-toggle-track {
        background: #ce00ce;
    }
    .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
        background-color: #19AB27;
    }
    .toggle-custom.react-toggle--checked .react-toggle-track {
        background-color: red;
    }
    @media(max-width: 600px) {
        padding: 2rem;
        padding-bottom: 4rem;
        .container {
            padding: 2rem;
            box-shadow: 3px 3px 20px 5px green;
        }
        .container h3 {
            margin-bottom: 2rem;
        }
    }
    @media(max-width: 400px) {
        padding: 2rem 1rem;
        padding-bottom: 4rem;
        .container {
            padding: 2rem 1rem;
        }
    }
`

export default CouponCreateScreen
