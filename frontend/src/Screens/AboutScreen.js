import React from 'react'

import Veg1 from '../Assets/veg1.jpg'
import AboutSection from '../Components/AboutSection'
import Hero from '../Components/Hero'
import Services from '../Components/Services'
import Subscribe from '../Components/Subscribe'

const AboutScreen = () => {
    return (
        <div>
            <Hero img={Veg1} max='true' title='About Us' />
            <AboutSection />
            <Services />
            <Subscribe />
        </div>
    )
}

export default AboutScreen
