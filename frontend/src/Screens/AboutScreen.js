import React, { useEffect } from 'react'
import * as Scroll from 'react-scroll'
import { Animated } from 'react-animated-css'

import Veg1 from '../Assets/veg1.webp'
import AboutSection from '../Components/AboutSection'
import Hero from '../Components/Hero'
import Services from '../Components/Services'
import Subscribe from '../Components/Subscribe'

const AboutScreen = () => {
    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    })
    return (
        <div>
            <Animated animationIn="zoomInUp" animationInDelay={1000} animationOut="zoomOutDown" isVisible={true}>
                <Hero img={Veg1} max='true' title='About Us' />
                <AboutSection />
                <Services />
                <Subscribe />
            </Animated>
        </div>
    )
}

export default AboutScreen
