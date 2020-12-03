import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { ServicesData } from '../Data/ServicesData'
import Tilt from 'react-tilt'

const Services = () => {
    return (
        <ServicesWrapper>
            <Container>
                <h2 className='text-uppercase bold text-center mb-5'>Services</h2>
                <Row>
                    {
                        ServicesData.map(item => {
                            return (
                                <Col
                                    md={3}
                                    key={item.id}
                                >
                                    <Tilt className="Tilt"
                                        options={{
                                            max: 50,
                                            perspective: 400,
                                            scale: 1.0,
                                            speed: 300,
                                            transition: true,
                                            easing: "cubic-bezier(.03,.98,.52,.99)"
                                        }}
                                    >
                                        <div className='media mb-md-0 mb-4'>
                                            <div
                                                className='mb-2 media-icon'
                                                style={{ background: `${item.color}` }}
                                            >
                                                <div>
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div className='media-body'>
                                                <h6>{item.title}</h6>
                                                <p className='text-muted'>{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </Tilt>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </ServicesWrapper>
    )
}

const ServicesWrapper = styled.div`
    padding: 5rem 1rem;
    padding-top: 1rem;
    h2 {
        font-weight: bold;
    }
    .row > div {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-flow: column;
        text-align: center;
    }
    .media-icon > div {
        font-size: 3rem;
        height: 78px!important;
        width: 78px !important;
        border-radius: 50%;
        border: 0.5px solid white;
        margin: 1rem;
    }
    .media-icon {
        width: 110px;
        height: 110px;
        border-radius: 50%;
    }
    .media-icon:hover {
        background: rgba(0, 128, 0, 0.7) !important;
    }
    .media {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }
    @media(max-width: 701px) {
        padding: 3rem 1rem;
    }
`

export default Services
