import React from 'react'

import Veg1 from '../Assets/veg1.jpg'
import Veg2 from '../Assets/veg2.jpg'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const MainCarousel = ({ history }) => {
    return (
        <MainCarouselWrapper>
            <OwlCarousel className={'owl-theme'}
                loop={true}
                nav={false}
                dots={false}
                autoplay={true}
                autoplayTimeout={9000}
                autoplaySpeed={3000}
                items={2}
                responsive={{
                    0: {
                        items: 1,
                        stagePadding: 0
                    }
                }}
            >
                <div className={'item'}>
                    <img src={Veg1} alt='image1' className='img-responsive' />
                </div>
                <div className={'item'}>
                    <img src={Veg2} alt='image2' className='img-responsive' />
                </div>
            </OwlCarousel>
            <div className='desc'>
                <h1 className='mb-3'>100% FRESH ORGANIC FOOD</h1>
                <h5 className='mb-5'>WE DELIVER ORGANIC VEGETABLES AND FRUITS</h5>
                <Button type='button' variant='success' onClick={() => history.push(`/contact`)}>View Details</Button>
            </div>
        </MainCarouselWrapper>
    )
}

const MainCarouselWrapper = styled.div`
    position: relative;
    margin-bottom: 4rem;
    .item {
        height: calc(100vh - 125px);
    }
    .item > img {
        height: 100% !important;
    }
    .owl-item{
        opacity: 0.4;
    }
    .active {
        opacity: 1;
    }
    button {
        /* background: white; */
        border-radius: 3rem;
        color: white;
        /* font-size: 1.5rem; */
        padding: 0.5rem 1.5rem;
        letter-spacing: 3px;
    }
    .desc {
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        letter-spacing: 5px;
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        text-align: center;
        width: max(90vw, 300px)
    }
    .desc h1, .desc h5{
        font-family: 'Amatic SC', cursive !important;
    }
    @media (min-width: 701px) {
        .desc h1 {
            font-size: 6rem;
        } 
        .desc h5 {
            font-size: 2rem;
            font-weight: bold;
        }
    }
`

export default (withRouter)(MainCarousel)
