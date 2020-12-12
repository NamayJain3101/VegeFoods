import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import styled from 'styled-components'
import { FiPackage, FiPocket, FiShoppingBag } from 'react-icons/fi'

const OrderSummary = ({ placed, paid, delivered, mb }) => {
    return (
        <OrderSummaryWrapper style={{ marginBottom: `${mb || '3rem'}` }}>
            <Nav className='justify-content-center'>
                <NavItem>
                    <div className='status' style={placed ? { background: 'lightgreen' } : { background: 'grey' }}>
                        {placed ? <FiShoppingBag style={{ color: 'black' }} /> : <FiShoppingBag style={{ color: 'white' }} />}
                    </div>
                </NavItem>
                <div className='line mt-1' style={paid ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    <div className='status' style={paid ? { background: 'lightgreen' } : { background: 'grey' }}>
                        {paid ? <FiPocket style={{ color: 'black' }} /> : <FiPocket style={{ color: 'white' }} />}
                    </div>
                </NavItem>
                <div className='line mt-1' style={delivered ? { background: 'green' } : { background: 'grey' }}></div>
                <NavItem>
                    <div className='status' style={delivered ? { background: 'lightgreen' } : { background: 'grey' }}>
                        {delivered ? <FiPackage style={{ color: 'black' }} /> : <FiPackage style={{ color: 'white' }} />}
                    </div>
                </NavItem>
            </Nav>
        </OrderSummaryWrapper>
    )
}

const OrderSummaryWrapper = styled.div`
    margin: auto;
    .nav {
        display: flex;
        align-items: center;
    }
    .nav-item {
        font-size: 2rem;
        cursor: default;
    }
    .status {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border-radius: 50%;
    }
    .line {
        width: clamp(2rem,30%,10rem);
        height: 0.25rem;
        border-radius: 2rem;
        margin: 0 !important;
        cursor: default;
    }
    .disabled {
        color: grey !important;
    }
    @media(max-width: 600px) {
        .nav-item {
            font-size: 1.5rem;
        }
        .status {
            padding: 0.7rem;
        }
        .line {
            width: 3rem !important;
        }
    }
`

export default OrderSummary
