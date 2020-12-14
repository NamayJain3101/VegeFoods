import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Container } from 'react-bootstrap'

const UserListScreen = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        } else {
            dispatch(listUsers())
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <UserListWrapper>
                <Container>

                </Container>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    users.map(user => {
                        return (
                            <p>{user.name} --&gt; {user.email}</p>
                        )
                    })
                )}
            </UserListWrapper>
        </div>
    )
}

const UserListWrapper = styled.div`
    padding: 5rem 2rem;
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
`

export default UserListScreen
