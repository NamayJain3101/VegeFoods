import React from 'react'
import styled from 'styled-components'

const Hero = ({ children, img, title, subtitle, max }) => {
    return (
        <HeroWrapper max={max} img={img}>
            <h1>{title}</h1>
            {children}
        </HeroWrapper>
    )
}

const HeroWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: ${props => props.max ? '50vh' : '30vh'};
    background: ${props => props.img && `url(${props.img}) center/cover`};
    h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 3px;
    }
`

export default Hero
