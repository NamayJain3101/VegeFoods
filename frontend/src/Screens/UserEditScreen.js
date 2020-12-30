import React, { useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Tilt from 'react-tilt'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import * as Scroll from 'react-scroll'
import LoginImg from '../Assets/login.png'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUser } from '../Actions/userActions'
import { USER_UPDATE_RESET } from '../Constants/usersConstants'
import { GrClose } from 'react-icons/gr'
import Toggle from 'react-toggle'

const UserEditScreen = ({ history, match }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [wallet, setWallet] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            wallet,
            isAdmin
        }))
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        } else {
            if (!userInfo || !userInfo.isAdmin) {
                history.push('/login')
            } else {
                if (!user || user._id !== userId) {
                    dispatch(getUserDetails(userId))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                    setWallet(user.wallet)
                    setIsAdmin(user.isAdmin)
                }
            }
        }
    }, [dispatch, history, successUpdate, user, userId, userInfo])

    return (
        <div>
            <UserEditWrapper>
                <Animated animationIn="bounceIn" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <Link to='/admin/userlist' className='btn mt-0 btn-danger btnClose'><GrClose /></Link>
                        <Row>
                            <Col lg={6} className='d-none d-lg-flex pr-lg-5'>
                                <Tilt className="Tilt"
                                    options={{
                                        max: 45,
                                        perspective: 700,
                                        scale: 1.2,
                                        speed: 700,
                                        transition: true,
                                        easing: "cubic-bezier(.03,.98,.52,.99)"
                                    }}
                                >
                                    <img src={LoginImg} alt='login' className='w-100 img-fluid' />
                                </Tilt>
                            </Col>
                            <Col lg={6} className='form'>
                                <h3 className='text-center text-uppercase font-weight-bold'>Edit User</h3>
                                {loading || loadingUpdate ? <Loader /> : (
                                    <React.Fragment>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder='Name' />
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Email' />
                                        <input type="number" value={wallet} onChange={(e) => setWallet(e.target.value)} name="wallet" id="wallet" placeholder='Wallet' />
                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                            <label htmlFor='toggleDiscountType' className='m-0 mx-3'>{'admin'.toUpperCase()}</label>
                                            <Toggle
                                                id='toggleDiscountType'
                                                className='toggle-custom'
                                                checked={isAdmin}
                                                icons={false}
                                                onChange={(e) => setIsAdmin(e.target.checked)}
                                            />
                                        </div>
                                        {successUpdate && <p className='text-success text-capitalize error'>User Updated</p>}
                                        {error && <p className='text-danger text-capitalize error'>{error}</p>}
                                        {errorUpdate && <p className='text-danger text-capitalize error'>{errorUpdate}</p>}
                                        <Button variant='success' className='btn btn-block text-uppercase' onClick={submitHandler}>update</Button>
                                    </React.Fragment>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Animated>
            </UserEditWrapper>
        </div>
    )
}

const UserEditWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 5rem 0;
    .container {
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 5px 5px 40px 5px green;
        position: relative;
    }
    .btnClose {
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 2rem;
        border-bottom-left-radius: 2rem;
        margin: 0;
        padding: 0.8rem 1rem;
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container h3 {
        margin-bottom: 3rem;
    }
    .container input {
        width: 100%;
        margin-bottom: 1rem;
        border-radius: 2rem;
        padding: 0.7rem 1.5rem;
        border: none;
        outline: none;
        background: #f0f0f0;
    }
    .container input:focus {
        box-shadow: 1px 1px 15px 3px lightgreen;
    }
    .container button {
        border-radius: 2rem;
        padding: 0.7rem 1.5rem;
        border: none;
        outline: none;
        margin-top: 1rem;
    }
    .container a {
        color: black;
        margin-top: 1rem;
    }
    .container > .row > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }
    .error {
        text-align: center;
    }
    .error-input {
        box-shadow: 1px 1px 5px 1px red;
    }
    .isAdmin {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        margin: auto;
    }
    .isAdmin input {
        margin: 0;
        width: 20px;
        margin-left: 10px;
    }
    @media(max-width: 600px) {
        padding: 2rem;
        padding-bottom: 4rem;
        .container {
            padding: 2rem;
            box-shadow: 3px 3px 20px 5px green;
        }
        .container h3 {
            margin-bottom: 2rem;
        }
    }
    @media(max-width: 400px) {
        padding: 2rem 1rem;
        padding-bottom: 4rem;
        .container {
            padding: 2rem 1rem;
        }
    }
`

export default UserEditScreen
