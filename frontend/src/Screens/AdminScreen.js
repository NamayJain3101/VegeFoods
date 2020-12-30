import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import styled from 'styled-components'
import { Col, Container, Row } from 'react-bootstrap'
import Subscribe from '../Components/Subscribe'
import { AdminData } from '../Data/AdminData'
import { Link } from 'react-router-dom'
import { CgClose } from 'react-icons/cg'

const AdminScreen = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        }
    })

    return (
        <div>
            <AdminWrapper>
                <Container>
                    <div className="back mb-4 mb-md-5">
                        <Link to='/my-account' className='btn btn-danger mb-0'><CgClose /></Link>
                    </div>
                    <Row className='option-container w-100 m-0'>
                        {AdminData.map(item => {
                            return (
                                <Col md={6} key={item.id} className='my-4'>
                                    <div className='option mx-auto' onClick={() => history.push(`${item.path}`)} style={{ background: item.background }}>
                                        <h3 className='text-center text-capitalize mb-4'>{item.icon}</h3>
                                        <h3 className='text-center text-capitalize'>{item.text}</h3>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </AdminWrapper>
            <Subscribe />
        </div>
    )
}

const AdminWrapper = styled.div`
    padding: 5rem 2rem;
    position: relative;
    .back {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        border-radius: 50%;
    }
    .back > a {
        border-radius: 0;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        font-size: 1.3rem;
    }
    hr {
        margin-bottom: 2rem !important;
    }
    .container {
        padding: 0;
    }
    .row > div {
        padding: 0;
    }
    .link-icon {
        font-size: 2rem;
    }
    .option-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .option {
        border-radius: 2rem;
        box-shadow: 1px 1px 20px 1px black;
        padding: 2rem 1rem;
        cursor: pointer;
        height: 200px;
        width: max(250px, 80%);
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
        padding-top: 4rem;
    }
`

export default AdminScreen
