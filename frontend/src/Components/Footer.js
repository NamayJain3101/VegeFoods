import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { IoIosArrowUp } from 'react-icons/io'
import * as Scroll from 'react-scroll'

const Footer = ({ history }) => {
    const scrollTop = () => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    }
    return (
        <FooterWrapper>
            <button onClick={scrollTop} className='goTop'>
                <IoIosArrowUp />
            </button>
            <Row>
                <Col sm={4}>
                    <h5 onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>Vegefoods</h5>
                    <p className='text-muted'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                </Col>
                <Col sm={4}>
                    <h5>Help</h5>
                    <div><Link to="/terms-conditions">Terms & Condition</Link></div>
                    <div><Link to="/privacy-policy">Privacy Policy</Link></div>
                    <div><Link to="/contact">Contact Us</Link></div>
                    <div><Link to="/about">About Us</Link></div>
                </Col>
                <Col sm={4}>
                    <h5>Have A Question</h5>
                    <div><a href="mailto:info@yourdomain.com">info@yourdomain.com</a></div>
                    <div><a href="tel:+23923929210">+2 392 3929 210</a></div>
                </Col>
            </Row>
            <Row>
                <p className='w-100 text-center'>Copyright ©2020 All rights reserved | This template is made with &#10084; by Namay jain</p>
            </Row>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    background: white;
    width: 100%;
    text-align: center;
    /* box-shadow: 0 1px 10px -2px black; */
    padding: 3rem 0rem;
    position: relative;
    * {
        line-height: 2;
    }
    .row {
        margin: 2rem 3rem;;
    }
    .row > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: start;
        padding: 2rem;
    }
    .row h5 {
        margin-bottom: 2rem !important;
        font-weight: bold;
    }
    .row a {
        color: black;
    }
    .goTop {
        font-size: 1.7rem;
        position: absolute;
        width: 50px;
        height: 50px;
        background: green;
        color: yellow;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 2;
        outline: none;
        border: none;
    }
    @media (max-width: 701px) {
        padding: 3rem 1rem;
        .row h5 {
            margin-bottom: 1rem !important;
        }
        .row {
            margin: 0rem;
        }
        .row>p {
            margin-top: 2rem;
        }
    }
`

export default (withRouter)(Footer)
