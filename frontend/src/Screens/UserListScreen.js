import React, { useEffect, useState } from 'react'
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
import Pagination from 'react-js-pagination'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { BiSearchAlt2 } from 'react-icons/bi'

const UserListScreen = ({ history }) => {

    const colors = ['magenta', 'orange', 'lime', 'cyan']
    const [pageNumber, setPageNumber] = useState(1)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { users, pages, userCount, loading, error } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { error: errorDelete, success: successDelete } = userDelete

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        } else {
            dispatch(listUsers(pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, pageNumber])

    const deleteUserHandler = (id, name) => {
        confirmAlert({
            title: `Delete user: ${name.split(' ')[0].toUpperCase()}`,
            message: 'Are you sure??',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => dispatch(deleteUser(id))
                },
                {
                    label: 'Cancel',
                    onClick: () => { }
                },
            ],
        })
    }

    const searchUsers = (e) => {
        e.preventDefault()
        dispatch(listUsers(1, search))
    }

    return (
        <div>
            <UserListWrapper>
                <div className='users-container w-100'>
                    <div className='searchOptions mb-5'>
                        <Link to='/admin' className='btn btn-danger'>Go To Admin Panel</Link>
                        <form className='filter' onSubmit={searchUsers}>
                            <input type="text" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button type='submit' variant='success'><BiSearchAlt2 /></Button>
                        </form>
                    </div>
                    <Row className='w-100 m-0'>
                        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorDelete ? <Message variant='danger'>{errorDelete}</Message> : (
                            <React.Fragment>
                                {users.map(user => {
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
                                })}
                            </React.Fragment>
                        )}
                    </Row>
                    {pages > 1 && (
                        <Pagination
                            hideDisabled
                            hideFirstLastPages
                            pageRangeDisplayed={4}
                            activePage={pageNumber}
                            itemsCountPerPage={12}
                            totalItemsCount={userCount}
                            onChange={(page) => setPageNumber(page)}
                            itemClass='page-item'
                            linkClass='page-link'
                            prevPageText='<'
                            nextPageText='>'
                            firstPageText='<<'
                            lastPageText='>>'
                        />
                    )}
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
    .searchOptions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .filter {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .filter input {
        max-width: 250px;
        height: 40px;
        padding: 4px 8px;
        outline: none;
        border-radius: 0;
        border: 2px solid green;
    }
    .filter button {
        max-width: 50px;
        height: 40px;
        outline: none;
        border-radius: 0;
        font-size: 1.3rem;
        padding: 2px 6px;
        background: green;
        border: 0;
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
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .page-item {
        width: 38px !important;
        height: 38px !important;
        margin: 0 7px;
        margin-bottom: 10px;
    }
    .page-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .page-item, .page-link {
        border-radius: 50% !important;
        color: green;
        border-color: green;
    }
    .page-item.active .page-link {
        background-color: green;
        border-color: green;
    }
    .page-link:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 128, 0, 0.3);
    }
    .page-link:hover {
        background-color: rgba(0, 128, 0, 0.1);
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
        .searchOptions {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
        }
        .filter {
            margin-top: 2rem;
        }
    }
    @media(max-width: 400px) {
        .userItem {
            width: 290px;
        }
    }
`

export default UserListScreen
