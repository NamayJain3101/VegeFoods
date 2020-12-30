import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import LoginImg from '../Assets/login.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Tilt from 'react-tilt'
import * as Scroll from 'react-scroll'
import { Animated } from "react-animated-css"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { register } from '../Actions/userActions'
import { USER_REGISTER_RESET } from '../Constants/usersConstants'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            dispatch({
                type: USER_REGISTER_RESET
            })
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
            setMessage('')
        }
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])
    return (
        <div>
            <RegisterWrapper>
                <Animated animationIn="bounceIn" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
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
                                    <img src={LoginImg} alt='login' className='w-100 img-fluid' />
                                </Tilt>                        </Col>
                            <Col lg={6} className='form'>
                                <h3 className='text-center text-uppercase font-weight-bold'>Sign Up</h3>
                                <form onSubmit={submitHandler}>
                                    {loading ? <Loader /> : (
                                        <React.Fragment>
                                            <input type="text" required onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder='Name' />
                                            <input type="email" required onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Email' />
                                            <input type="password" required className={message ? 'error-input' : ''} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Password' />
                                            <input type="password" required className={message ? 'error-input' : ''} onChange={(e) => setConfirmPassword(e.target.value)} name="ConfirmPassword" id="ConfirmPassword" placeholder='Confirm Password' />
                                            {message && <p className='text-danger text-capitalize error'>{message}</p>}
                                            {error && <p className='text-danger text-capitalize error'>{error}</p>}
                                            <Button variant='success' type='submit' className='btn btn-block text-uppercase'>sign up</Button>
                                        </React.Fragment>
                                    )}
                                </form>
                                <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Have an Account! Login <BsArrowRight /> </Link>
                            </Col>
                        </Row>
                    </Container>
                </Animated>
            </RegisterWrapper>
            <Subscribe />
        </div>
    )
}

const RegisterWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 3rem 0;
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
    @media(max-width: 600px) {
        padding: 2rem;
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
        .container {
            padding: 2rem 1rem;
        }
    }
`

export default RegisterScreen
