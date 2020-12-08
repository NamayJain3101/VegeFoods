import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Hero from '../Components/Hero'
import * as Scroll from 'react-scroll'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import { AccountData } from '../Data/AccountData'
import Subscribe from '../Components/Subscribe'
import { logout } from '../Actions/userActions'

import Veg1 from '../Assets/veg1.jpg'
import { AiOutlineLogout } from 'react-icons/ai'

const AccountPage = ({ history }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint',
            delay: 500
        })
    })

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <div>
            <Hero img={Veg1} title='My Account' />
            <AccountWrapper>
                <Container>
                    <Row>
                        {AccountData.map(item => {
                            return (
                                <Col md={6} key={item.id} className='my-5 px-md-5'>
                                    <div className='option mx-2' onClick={() => history.push(`${item.path}`)} style={{ background: item.background }}>
                                        <h3 className='text-center text-capitalize mb-4'>{item.icon}</h3>
                                        <h3 className='text-center text-capitalize'>{item.text}</h3>
                                    </div>
                                </Col>
                            )
                        })}
                        <Col md={6} className='my-5 px-md-5'>
                            <div className='option mx-2' onClick={logoutHandler} style={{ background: 'linear-gradient(to bottom right, yellow, orange, yellow)' }}>
                                <h3 className='text-center text-capitalize mb-4'><AiOutlineLogout className='link-icon' /></h3>
                                <h3 className='text-center text-capitalize'>Logout</h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </AccountWrapper>
            <Subscribe />
        </div>
    )
}

const AccountWrapper = styled.div`
    padding: 5rem 2rem;
    .option {
        border-radius: 2rem;
        box-shadow: 1px 1px 20px 1px black;
        padding: 2rem 1rem;
        cursor: pointer;
    }
    .option h3 {
        letter-spacing: 2px;
    }
`

export default AccountPage
