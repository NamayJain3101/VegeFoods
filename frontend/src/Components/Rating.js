import React from 'react'

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import styled from 'styled-components'

const Rating = ({ value, text, color }) => {
    return (
        <RatingWrapper className='rating'>
            <span style={{ color }}>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>&nbsp;&nbsp;{text && text}</span>
            <span className='text-muted'></span>
        </RatingWrapper>
    )
}

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        display: flex;
        align-items: center;
    }
    span > svg {
        margin: 0;
    }
`

Rating.defaultProps = {
    color: '#82ae46'
}

export default Rating
