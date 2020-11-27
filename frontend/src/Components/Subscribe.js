import React from 'react'
import { Button, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Subscribe = () => {
    return (
        <SubscribeWrapper>
            <Row className='w-100'>
                <div className='col-lg-6'>
                    <h4>Subscribe to our Newsletter</h4>
                    <p className='text-muted'>Get e-mail updates about our latest shops and special offers</p>
                </div>
                <div className='subscribe col-lg-6'>
                    <input type="email" name="email" id="email" placeholder='Enter Email Address' />
                    <Button type='button' className='btn-success'>Subscribe</Button>
                </div>
            </Row>
        </SubscribeWrapper>
    )
}

const SubscribeWrapper = styled.div`
    padding: 6rem;
    background: #f7f6f2;
    display: flex;
    justify-content: center;
    align-items: center;
    .subscribe {
        width: 100%;
        display: flex;
    }
    input {
        height: 52px;
        background: #fff !important;
        border: 1px solid transparent;
        color: black !important;
        font-size: 14px;
        font-weight: 300;
        display: block;
        width: 80%;
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        outline: none;
    }
    button {
        height: 52px;
        border-radius: 0;
    }
    @media (max-width: 701px) {
        padding: 4rem;
    }
    @media (max-width: 501px) {
        padding: 4rem 2rem;
    }
    @media (max-width: 380px) {
        padding: 3rem 1rem;
    }
`

export default Subscribe
