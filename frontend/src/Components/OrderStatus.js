import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import styled from 'styled-components'
import { FaDotCircle, FaRegDotCircle } from 'react-icons/fa'

const OrderStatus = ({ placed, paid, delivered, mb }) => {
    return (
        <OrderStatusWrapper style={{ marginBottom: `${mb || '3rem'}` }}>
            <Nav className='justify-content-center'>
                <NavItem>
                    {placed ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
                </NavItem>
                <div className='line mt-1' style={paid ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {paid ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
                </NavItem>
                <div className='line mt-1' style={delivered ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    {delivered ? <FaDotCircle style={{ color: 'green' }} /> : <FaRegDotCircle style={{ color: 'grey' }} />}
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
