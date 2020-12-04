import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import LoginImg from '../Assets/login.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import Tilt from 'react-tilt'
import * as Scroll from 'react-scroll'
import { Animated } from "react-animated-css"

const LoginScreen = () => {
    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
    })
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
                                <input type="email" name="email" id="email" placeholder='Email' />
                                <input type="password" name="password" id="password" placeholder='Password' />
                                <Button variant='success' className='btn btn-block'>LOGIN</Button>
                                <Link to='/register'>Create an Account <BsArrowRight /> </Link>
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