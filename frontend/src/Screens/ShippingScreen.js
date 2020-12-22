import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { saveShippingAddress } from '../Actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import * as Scroll from 'react-scroll'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [landmark, setLandmark] = useState(shippingAddress.landmark || '')
    const [state, setState] = useState(shippingAddress.state || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const regExpPostalCode = /^[1-9][0-9]{5}$/g
        const regExpAddress = /^[a-zA-Z ]{2,}$/i
        if (!regExpPostalCode.test(postalCode)) {
            setMessage('Invalid Postal Code')
        }
        else if (!regExpAddress.test(state)) {
            setMessage('Invalid State')
        }
        else if (!regExpAddress.test(city)) {
            setMessage('Invalid City')
        }
        else if (!regExpAddress.test(country)) {
            setMessage('Invalid Country')
        }
        else {
            dispatch(saveShippingAddress({
                address,
                city,
                landmark,
                state,
                postalCode,
                country
            }))
            setMessage('')
            history.push('/payment')
        }
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
            <ShippingWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <CheckoutSteps step1 step2 />
                        <h3 className='text-center text-uppercase font-weight-bold'>Shipping</h3>
                        <form onSubmit={submitHandler}>
                            <Row>
                                <Col xs={12}>
                                    <label className='mt-3 ml-3'>Address<span className='req'>*</span></label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address" id="address" placeholder='Address' required />
                                </Col>
                                <Col md={6}>
                                    <label className='mt-3 ml-3'>Landmark<span className='req'>*</span></label>
                                    <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} name="landmark" id="landmark" placeholder='Landmark' required />
                                </Col>
                                <Col md={6}>
                                    <label className='mt-3 ml-3'>City<span className='req'>*</span></label>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city" id="city" placeholder='City' required />
                                </Col>
                                <Col md={4}>
                                    <label className='mt-3 ml-3'>State<span className='req'>*</span></label>
                                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} name="state" id="state" placeholder='State' required />
                                </Col>
                                <Col md={4}>
                                    <label className='mt-3 ml-3'>Postal Code<span className='req'>*</span></label>
                                    <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} name="postalCode" id="postalCode" placeholder='Postal Code' required />
                                </Col>
                                <Col md={4}>
                                    <label className='mt-3 ml-3'>Country<span className='req'>*</span></label>
                                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} name="country" id="country" placeholder='Country' required />
                                </Col>
                            </Row>
                            {message && <p className='text-danger text-capitalize text-center'>{message}</p>}
                            <Button variant='success' className='mt-5 mt-md-5' type='submit'>Proceed to payment</Button>
                        </form>
                    </Container>
                </Animated>
            </ShippingWrapper>
        </div>
    )
}

const ShippingWrapper = styled.div`
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
    .container input:focus {
        box-shadow: 1px 1px 15px 3px lightgreen;
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
    .req {
        color: red;
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

export default ShippingScreen
