import React, { useEffect } from 'react'
import * as Scroll from 'react-scroll'
import { Animated } from 'react-animated-css'
import Hero from '../Components/Hero'
import Subscribe from '../Components/Subscribe'
import { ContactData } from '../Data/ContactData'

import Veg1 from '../Assets/veg1.jpg'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'

const ContactScreen = () => {
    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    })
    return (
        <div>
            <Hero img={Veg1} max='true' title='Contact Us' />
            <ContactWrapper>
                <Container>
                    <Animated animationIn="flipInX" animationInDelay={1000} animationOut="zoomOutDown" isVisible={true}>
                        <div className="row">
                            {
                                ContactData.map(item => {
                                    return (
                                        <div key={item.id} className='col-md-6 col-sm-12'>
                                            <div>{item.icon}</div>
                                            <div className="desc">
                                                <h5>{item.link}</h5>
                                                <p>{item.subtitle}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Animated>
                </Container>
            </ContactWrapper>
            <Subscribe />
        </div>
    )
}

const ContactWrapper = styled.div`
    text-align: center;
    padding: 3rem;
    background: white;
    line-height: 1.5;
    .icon {
        font-size: 4rem;
        margin: 2rem;
    }
    .desc {
        letter-spacing: 2px;
        font-size: 1.1rem;
    }
    .desc a {
        color: black;
    }
    .desc a:hover {
        transition: var(--mainTransition);
        text-decoration: none;
        color: green;
        /* font-weight: bold; */
    }
    .desc p{
        color: grey;
    }
    .desc h5 {
        line-height: 1.7;
    }
`

export default ContactScreen
