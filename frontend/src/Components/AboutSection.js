import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

import Veg3 from '../Assets/Veg3.webp'

const AboutSection = ({ history }) => {
    return (
        <AboutSectionWrapper>
            <Container>
                <Row>
                    <Col md={6} className='mb-md-0 mb-5'>
                        <img src={Veg3} className='img-fluid w-100 h-100' alt='aboutus' />
                    </Col>
                    <Col md={6}>
                        <h2>Welcome to Vegefoods, an eCommerce website</h2>
                        <p className='text-muted'>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                            <br></br>
                            <br></br>
                            But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
                        </p>
                        <Button type='button' variant='success' onClick={() => { history.push('/shop') }}>Shop Now</Button>
                    </Col>
                </Row>
            </Container>
        </AboutSectionWrapper>
    )
}

const AboutSectionWrapper = styled.div`
    padding: 5rem 2rem;
    .row p {
        text-align: justify;
    }
    .row div h2 {
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 2rem;
    }
    .row div button {
        border-radius: 3rem;
        padding: 5px 12px;
    }
`

export default (withRouter)(AboutSection)
