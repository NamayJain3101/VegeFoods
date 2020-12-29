import React from 'react'
import { Nav, NavItem, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { TiUser } from 'react-icons/ti'
import { FaShippingFast } from 'react-icons/fa'
import { GiWallet } from 'react-icons/gi'
import { IoBagCheckSharp } from 'react-icons/io5'

const CheckoutSteps = ({ step1, step2, step3, step4, mb }) => {
    return (
        <CheckoutStepsWrapper style={{ marginBottom: `${mb || '3rem'}` }}>
            <Nav className='justify-content-center'>
                <NavItem>
                    {step1 ? (
                        <LinkContainer to='/login'>
                            <NavLink className='active'><TiUser /></NavLink>
                        </LinkContainer>
                    ) : <NavLink disabled className='disabled'><TiUser /></NavLink>}
                </NavItem>
                <div className='line' style={step2 ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {step2 ? (
                        <LinkContainer to='/shipping'>
                            <NavLink className='active'><FaShippingFast /></NavLink>
                        </LinkContainer>
                    ) : <NavLink disabled className='disabled'><FaShippingFast /></NavLink>}
                </NavItem>
                <div className='line' style={step3 ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {step3 ? (
                        <LinkContainer to='/payment'>
                            <NavLink className='active'><GiWallet /></NavLink>
                        </LinkContainer>
                    ) : <NavLink disabled className='disabled'><GiWallet /></NavLink>}
                </NavItem>
                <div className='line' style={step4 ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {step4 ? (
                        <LinkContainer to='/placeorder'>
                            <NavLink className='active'><IoBagCheckSharp /></NavLink>
                        </LinkContainer>
                    ) : <NavLink disabled className='disabled'><IoBagCheckSharp /></NavLink>}
                </NavItem>
            </Nav>
        </CheckoutStepsWrapper>
    )
}

const CheckoutStepsWrapper = styled.div`
    max-width: 400px;
    margin: auto;
    .nav {
        display: flex;
        align-items: center;
    }
    .nav-item {
        font-size: 2rem;
    }
    .nav-item > a {
        margin: 0 !important;
        padding: 0.5rem !important;
    }
    .nav-item > a.active {
        color: green !important;
    }
    .line {
        width: 3rem;
        height: 0.25rem;
        border-radius: 2rem;
    }
    .disabled {
        color: grey !important;
    }
    @media(max-width: 500px) {
        .line {
            width: 2rem;
        }
        .nav-item {
            font-size: 2rem;
        }
        .nav-item > a {
            margin: 0;
            padding: 0.5rem 0 !important;
        }
    }
`

export default CheckoutSteps
