import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, FormCheck, FormGroup, FormLabel, Row } from 'react-bootstrap'
import styled from 'styled-components'
import CheckoutSteps from '../Components/CheckoutSteps'
import * as Scroll from 'react-scroll'
import { savePaymentMethod } from '../Actions/cartActions'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/place-order')
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
            <PaymentWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <CheckoutSteps step1 step2 step3 />
                        <h3 className='text-center text-uppercase font-weight-bold'>Payment</h3>
                        <form onSubmit={submitHandler}>
                            <Row className='w-100'>
                                <FormGroup className='w-100'>
                                    <FormLabel as='legend'> Select Method </FormLabel>
                                    <Col>
                                        <FormCheck type='radio'
                                            label='PayPal or Credit Cart'
                                            id='PayPal'
                                            name='paymentMethod'
                                            value='PayPal'
                                            defaultChecked
                                            onChange={(e) => setPaymentMethod(e.target.value)} >
                                        </FormCheck>
                                        <FormCheck type='radio'
                                            label='Cash'
                                            id='Cash'
                                            name='paymentMethod'
                                            value='Cash'
                                            onChange={(e) => setPaymentMethod(e.target.value)} >
                                        </FormCheck>
                                        <FormCheck type='radio'
                                            label='Wallet'
                                            id='wallet'
                                            name='paymentMethod'
                                            value='Wallet'
                                            onChange={(e) => setPaymentMethod(e.target.value)} >
                                        </FormCheck>
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Button variant='success' className='mt-4' type='submit'>Continue to Placing Order</Button>
                        </form>
                    </Container>
                </Animated>
            </PaymentWrapper>
        </div>
    )
}

const PaymentWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 3rem 0;
    padding-bottom: 5rem;
    .container {
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 5px 5px 40px 5px green;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    form {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
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
    .container button {
        border-radius: 2rem;
        padding: 0.8rem 1.5rem;
        border: none;
        outline: none;
        margin-top: 1rem;
        letter-spacing: 2px;
    }
    .container a {
        color: black;
        margin-top: 1rem;
    }
    .container .row > div {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
    }
    .form-label {
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .form-group > div {
        width: auto;
        margin: auto;
    }
    .form-check {
        display: flex;
        align-items: center;
        justify-content: start;
        margin-bottom: 0.5rem;
        padding: 0 1.25rem;
        font-size: 1.2rem;
    }
    .form-check-input {
        position: relative;
        margin: 0 !important;
        width: auto !important;
        margin-right: 0.5rem !important;
    }
    .form-check-input:focus, .form-check-input:checked {
        transform: scale(1.5);
    }
    .form-check .form-check-input:checked ~ label {
        color: green !important;
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

export default PaymentScreen
