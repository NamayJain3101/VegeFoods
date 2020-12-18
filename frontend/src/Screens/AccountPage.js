import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hero from '../Components/Hero'
import * as Scroll from 'react-scroll'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import { AccountData } from '../Data/AccountData'
import Subscribe from '../Components/Subscribe'
import { logout } from '../Actions/userActions'

import Veg1 from '../Assets/veg1.jpg'
import { AiOutlineLogout } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'

const AccountPage = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo) {
            history.push('/')
        }
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
                    <Row className='w-100 m-0'>
                        {AccountData.map(item => {
                            return (
                                <Col md={6} key={item.id} className='my-4'>
                                    <div className='option mx-auto' onClick={() => history.push(`${item.path}`)} style={{ background: item.background }}>
                                        <h3 className='text-center text-capitalize mb-4'>{item.icon}</h3>
                                        <h3 className='text-center text-capitalize'>{item.text}</h3>
                                    </div>
                                </Col>
                            )
                        })}
                        <Col md={6} className='my-4'>
                            <div className='option mx-auto' onClick={logoutHandler} style={{ background: 'linear-gradient(to bottom right, grey, white, grey)' }}>
                                <h3 className='text-center text-capitalize mb-4'><AiOutlineLogout className='link-icon' /></h3>
                                <h3 className='text-center text-capitalize'>Logout</h3>
                            </div>
                        </Col>
                    </Row>
                    {userInfo && userInfo.isAdmin && (
                        <React.Fragment>
                            <hr style={{ border: '1px solid black', background: 'black', margin: '2rem 0' }}></hr>
                            <Row className='w-100 m-0 d-flex align-items-center justify-content-center'>
                                <Col md={6} className='my-4'>
                                    <div className='option mx-auto' onClick={() => history.push('/admin')} style={{ background: 'linear-gradient(to bottom right, orange, red, orange)', color: 'white' }}>
                                        <h3 className='text-center text-capitalize mb-4'><RiAdminLine className='link-icon' /></h3>
                                        <h3 className='text-center text-capitalize'>Admin Options</h3>
                                    </div>
                                </Col>
                                <Col md={6} className='my-4'>
                                    <div className='option mx-auto' onClick={() => history.push('/admin/statistics')} style={{ background: 'linear-gradient(to bottom right, grey, black, grey)', color: 'white' }}>
                                        <h3 className='text-center text-capitalize mb-4'><ImStatsDots className='link-icon' /></h3>
                                        <h3 className='text-center text-capitalize'>Statistics</h3>
                                    </div>
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                </Container>
            </AccountWrapper>
            <Subscribe />
        </div>
    )
}

const AccountWrapper = styled.div`
    padding: 5rem 2rem;
    .container {
        padding: 0;
    }
    .row > div {
        padding: 0;
    }
    .option {
        border-radius: 2rem;
        box-shadow: 1px 1px 20px 1px black;
        padding: 2rem 1rem;
        cursor: pointer;
        height: 200px;
        width: max(290px, 80%);
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in;
    }
    .option:hover {
        transform: scale(0.9);
        transition: all 0.3s ease-in;
    }
    .option h3 {
        letter-spacing: 2px;
    }
    @media(max-width: 701px) {
        padding: 2rem;
    }
`

export default AccountPage
