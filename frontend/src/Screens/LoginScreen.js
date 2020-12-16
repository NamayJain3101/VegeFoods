import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import Loader from '../Components/Loader'
import LoginImg from '../Assets/login.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Tilt from 'react-tilt'
import * as Scroll from 'react-scroll'
import { Animated } from "react-animated-css"
import { login } from '../Actions/userActions'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
            <LoginWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
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
                                </Tilt>
                            </Col>
                            <Col lg={6} className='form'>
                                <h3 className='text-center text-uppercase font-weight-bold'>Login</h3>
                                {loading ? <Loader /> : (
                                    <React.Fragment>
                                        <form onSubmit={submitHandler}>
                                            <input
                                                type="email"
                                                value={email}
                                                name="email"
                                                id="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Email'
                                                className={`${error ? 'error-input' : ''}`}
                                                required
                                            />
                                            <input
                                                type="password"
                                                value={password}
                                                name="password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Password'
                                                className={`${error ? 'error-input' : ''}`}
                                                required
                                            />
                                            {error && <p className='text-danger text-capitalize error'>{error}</p>}
                                            <Button variant='success' type='submit' className='btn btn-block'>LOGIN</Button>
                                        </form>
                                        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Create an Account <BsArrowRight /> </Link>
                                    </React.Fragment>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Animated>
            </LoginWrapper>
            <Subscribe />
        </div>
    )
}

const LoginWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 3rem 0;
    .container {
        padding: 5rem;
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
        margin-bottom: 4rem;
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
        padding: 3rem;
        .container {
            padding: 3rem;
            box-shadow: 5px 5px 20px 5px green;
        }
    }
    @media(max-width: 400px) {
        padding: 2rem 1rem;
        .container {
            padding: 2rem 1rem;
        }
    }
`

export default LoginScreen
