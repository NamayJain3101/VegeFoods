import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Button, Col, Row } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { TiTick, TiTimes } from 'react-icons/ti'
import * as Scroll from 'react-scroll'
import { Link } from 'react-router-dom'

const UserListScreen = ({ history }) => {

    const colors = ['magenta', 'orange', 'lime', 'cyan']

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { error: errorDelete, success: successDelete } = userDelete

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        } else {
            dispatch(listUsers())
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteUserHandler = (id, name) => {
        if (window.confirm(`Delete user: ${name.toUpperCase()}`)) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <UserListWrapper>
                <div className='users-container w-100'>
                    <Link to='/admin' className='btn btn-danger mb-5'>Go To Admin Panel</Link>
                    <Row className='w-100 m-0'>
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorDelete ? <Message variant='danger'>{errorDelete}</Message> : (
                            users.map(user => {
                                return (
                                    <Col md={6} lg={4} className='my-4 px-0' key={user._id}>
                                        <div className='mx-md-4 userItem'>
                                            <div className="img-wrapper mb-3" style={{ background: colors[Math.floor(Math.random() * colors.length)] }}>
                                                {user.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            <div className="desc w-100">
                                                <div>
                                                    <h5>{user.name}</h5>
                                                </div>
                                                <div>
                                                    <h5>{user.email}</h5>
                                                </div>
                                                <div>
                                                    <h5>Admin: {user.isAdmin ? <TiTick style={{ color: 'green', fontSize: '1.6rem', margin: '0' }} /> : <TiTimes style={{ color: 'red', fontSize: '1.6rem', margin: '0' }} />}</h5>
                                                </div>
                                            </div>
                                            <div className="user-buttons">
                                                <Button variant='primary' onClick={() => history.push(`/admin/userlist/${user._id}/edit`)}><FaRegEdit /></Button>
                                                <Button variant='danger' onClick={(id, name) => { deleteUserHandler(user._id, user.name) }}><IoCloseSharp /></Button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        )}
                    </Row>
                </div>
            </UserListWrapper>
        </div>
    )
}

const UserListWrapper = styled.div`
    padding: 5rem 2rem;
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    .users-container {
        max-width: 1200px;
        margin: auto;
    }
    .userItem {
        background: white;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        padding: 1rem;
        padding-top: 2rem;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .userItem:hover {
        transform: scale(1.07);
        transition: all 0.3s ease-in-out;
    }
    .user-buttons {
        position: absolute;
        top: 0;
        right: 0;
    }
    .user-buttons > button:last-of-type {
        border-radius: 0;
        border-top-right-radius: 2rem;
        padding-right: 1rem;
    }
    .user-buttons > button:first-of-type {
        border-radius: 0;
        border-bottom-left-radius: 2rem;
        padding-left: 1.2rem;
    }
    .img-wrapper {
        padding: 0.5rem;
        width: 50px;
        height: 50px;
        font-size: 2rem;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    .desc{
        padding: 0.5rem 1rem;
    }
    .desc > div {
        overflow: auto;
    }
    .desc > div > h5 {
        text-align: center;
    }
    .desc > div::-webkit-scrollbar {
        height: 0;
    }
    @media(max-width: 768px) {
        padding: 2rem;
        .userItem {
            width: 320px;
        }
        .row > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    @media(max-width: 400px) {
        .userItem {
            width: 290px;
        }
    }
`

export default UserListScreen
