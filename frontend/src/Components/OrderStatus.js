import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import styled from 'styled-components'
import { FaDotCircle, FaRegDotCircle } from 'react-icons/fa'

const OrderStatus = ({ cancelled, placed, paid, delivered, mb }) => {
    return (
        <OrderStatusWrapper cancelled={cancelled} style={{ marginBottom: `${mb || '3rem'}` }}>
            <Nav className='justify-content-center'>
                <NavItem>
                    {cancelled ? <FaDotCircle style={{ color: 'brown' }} /> : placed ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
                </NavItem>
                <div className='line mt-1' style={paid ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {cancelled ? <FaDotCircle style={{ color: 'brown' }} /> : paid ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
                </NavItem>
                <div className='line mt-1' style={delivered ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {cancelled ? <FaDotCircle style={{ color: 'brown' }} /> : delivered ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
                </NavItem>
            </Nav>
        </OrderStatusWrapper>
    )
}

const OrderStatusWrapper = styled.div`
    max-width: 400px;
    margin: auto;
    .nav {
        display: flex;
        align-items: center;
    }
    .nav > div > svg {
        color: ${props => props.cancelled && '#580000 !important'}
    }
    .nav > .line {
        background: ${props => props.cancelled && 'grey !important'}
    }
    .nav-item {
        font-size: 2rem;
        cursor: default;
    }
    .line {
        width: 3rem;
        height: 0.25rem;
        border-radius: 2rem;
        cursor: default;
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
    }
`

export default OrderStatus
