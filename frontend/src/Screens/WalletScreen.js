import React, { useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Tilt from 'react-tilt'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { getUserDetails, updateUserProfile } from '../Actions/userActions'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { USER_DETAILS_RESET, USER_UPDATE_PROFILE_RESET } from '../Constants/usersConstants'
import * as Scroll from 'react-scroll'
import { GoCreditCard } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'

const WalletScreen = ({ history }) => {

    const [wallet, setWallet] = useState('')
    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, loading: updateLoading } = userUpdateProfile

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (success) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch({
                type: USER_DETAILS_RESET
            })
        }
        if (userInfo) {
            const addPaypalScript = async () => {
                const { data: clientId } = await Axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
            if (!user || user._id !== userInfo._id) {
                dispatch(getUserDetails('profile'))
            } else {
                if (!window.paypal) {
                    addPaypalScript()
                } else {
                    setSdkReady(true)
                }
            }
        } else {
            history.push('/login')
        }
    }, [dispatch, history, success, user, userInfo])

    const successPaymentHandler = (paymentResult) => {
        const amount = Number(user.wallet) + Number(wallet)
        if (paymentResult.status === 'COMPLETED') {
            dispatch(updateUserProfile({
                id: user._id,
                wallet: amount,
                rechargeTime: paymentResult.create_time
            }))
        }
    }

    return (
        <div>
            <WalletWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <h3 className='mb-3 mb-lg-5 w-100 text-center text-uppercase font-weight-bold'>Recharge</h3>
                        <Button variant='danger' className='closeButton m-0 btn btn-danger' onClick={() => history.go(-1)}><IoMdClose /></Button>
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <Row>
                                <Col lg={6} className='d-flex pr-lg-5'>
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
                                        <h1 className='wallet mb-3 mb-lg-0'>&#8377;{user.wallet}</h1>
                                    </Tilt>
                                </Col>
                                {updateLoading ? <Loader /> : (
                                    <Col lg={6} className='form'>
                                        <React.Fragment>
                                            <label htmlFor='wallet' className='w-100 ml-4 mb-3 text-left'>Enter Amount (Minimum &#8377;200)</label>
                                            <input type="number" value={wallet} onChange={(e) => setWallet(e.target.value)} name="wallet" id="wallet" placeholder='Recharge Amount' />
                                            {success && <p className='text-success text-capitalize error'>User Updated</p>}
                                            {!sdkReady ? <Loader margin='0' /> : (
                                                wallet > 200 ? (
                                                    <PayPalButton amount={wallet} currency='INR' onSuccess={successPaymentHandler} />
                                                ) : (
                                                        <div className='paypal-disabled'>
                                                            <Button variant='warning' className='btn btn-block font-weight-bold' disabled><span style={{ color: 'navy' }}>Pay</span><span style={{ color: 'blue' }}>Pal</span></Button>
                                                            <Button variant='dark' className='btn btn-block font-weight-normal' disabled><GoCreditCard className='icon' /> &nbsp; Debit or Credit Card</Button>
                                                            <p className='w-100 text-center'>Powered by <span style={{ color: 'navy' }}>Pay</span><span style={{ color: 'blue' }}>Pal</span></p>
                                                        </div>
                                                    )
                                            )}
                                        </React.Fragment>
                                    </Col>
                                )}
                            </Row>
                        )}
                    </Container>
                </Animated>
            </WalletWrapper>
        </div>
    )
}

const WalletWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 5rem 0;
    .container {
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 5px 5px 40px 5px green;
        position: relative;
        overflow: hidden;
    }
    .closeButton {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
        border-radius: 0 !important;
        border-bottom-left-radius: 2rem !important;
        z-index: 2;
        background: #bd2130;
    }
    .wallet {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        letter-spacing: 5px;
        font-size: 5rem;
        font-weight: bold;
        color: green;
        line-height: 1.5;
        text-shadow: 2px 4px lightgreen;
    }
    .btnClose {
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 2rem;
        border-bottom-left-radius: 2rem;
        margin: 0;
        padding: 0.8rem 1rem;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container h3 {
        margin-bottom: 2rem;
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
    .form > div {
        width: 100%;
        margin-top: 2rem;
    }
    .paypal-disabled button {
        margin: 0;
        margin-bottom: 16px;
        height: 45px;
        vertical-align: top;
        height: 40%;
        min-height: 30px;
        max-height: 55px;
        font-weight: bolder;
        border-radius: 4px;
        padding: 0.5rem;
        text-align: center;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .paypal-disabled button > .icon {
        font-size: 1.7rem;
    }
    .paypal-disabled p {
        font-size: 0.8em;
        color: grey;
        font-style: italic;
    }
    .paypal-disabled p span {
        font-weight: bold;
        font-size: 1.2em;
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
        .paypal-disabled button {
            font-size: 1rem;
            padding: 0;
            height: 35px;
            margin-bottom: 12px;
        }
        .wallet {
            font-size: 4rem;
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

export default WalletScreen
