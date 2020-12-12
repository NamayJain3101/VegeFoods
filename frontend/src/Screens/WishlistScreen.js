import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import styled from 'styled-components'
import { getWishlist, removeItemFromWishlist } from '../Actions/userActions'
import Hero from '../Components/Hero'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Veg1 from '../Assets/veg1.jpg'
import Subscribe from '../Components/Subscribe'
import { GrFormClose } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'

const WishlistScreen = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userWishlist = useSelector(state => state.userWishlist)
    const { wishlist, loading, error } = userWishlist

    const removeFromWishlist = useSelector(state => state.removeFromWishlist)
    const { loading: loadingRemove, error: errorRemove, success } = removeFromWishlist

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (userInfo) {
            dispatch(getWishlist())
        } else {
            history.push('/login?redirect=wishlist')
        }
    }, [dispatch, history, success, userInfo])

    const removeFromWishlistHandler = (id, name) => {
        dispatch(removeItemFromWishlist({
            wishlist: {
                product: id
            }
        }))
        toast(`Successfully removed '${name.toUpperCase()}' from your wishlist`)
    }

    return (
        <div>
            <Hero img={Veg1} title='Wishlist' />
            <WishlistWrapper>
                <Container>
                    {loading || loadingRemove ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorRemove ? <Message variant='danger'>{errorRemove}</Message> : (
                        wishlist && wishlist.wishlistItems && wishlist.wishlistItems.length > 0 ? (
                            <Row>
                                {wishlist.wishlistItems.map(item => {
                                    return (
                                        <Col key={item.product} sm={6} md={6} lg={4}>
                                            <div>
                                                <div className='img-container' onClick={() => history.push(`/shop/${item.product}`)}>
                                                    <img src={item.image} alt={item.name} className='img-fluid' />
                                                </div>
                                                <div className='desc' onClick={() => history.push(`/shop/${item.product}`)}>
                                                    <h5>{item.name}</h5>
                                                    <h5 className='price'>&#8377;{item.price}</h5>
                                                </div>
                                                <div className='availability'>
                                                    <h6 className={item.InStock > 0 ? 'text-success' : 'text-danger'}>
                                                        {item.InStock > 0 ? `(${item.InStock} Kg Available)` : '(Out of Stock)'}
                                                    </h6>
                                                </div>
                                                <Button variant='danger' onClick={(id, name) => removeFromWishlistHandler(item.product, item.name)} className='delete'><GrFormClose /></Button>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        ) : (
                                <Message>No Items in Wishlist</Message>
                            )
                    )}
                </Container>
            </WishlistWrapper>
            <ToastContainer
                closeButton={false}
                position="bottom-center"
                autoClose={3000}
                closeOnClick={false}
                draggable={false}
                pauseOnHover={false}
                bodyClassName="text-center"
                bodyStyle={{ color: 'white', letterSpacing: '2px', fontSize: '1rem' }}
            />
            <Subscribe />
        </div>
    )
}

const WishlistWrapper = styled.div`
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    padding: 5rem 2rem;
    padding-bottom: 4rem;
    .row > div > div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border-radius: 2rem;
        box-shadow: 2px 2px 20px 2px green;
        margin: 1rem;
        background: white;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        cursor: pointer;
        position: relative;
    }
    .img-container {
        border-radius: 2rem;
        overflow: hidden;
    }
    .img-container img {
        border-radius: 50%;
        transition: all 0.3s ease-in;
    }
    .img-container img:hover {
        transform: scale(1.2);
        transition: all 0.3s ease-in;
    }
    .desc {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }
    .desc h5 {
        margin: 0;
    }
    .price {
        font-family: sans-serif;
    }
    .delete {
        position: absolute;
        top: 0;
        right: 0;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border: 0;
        outline: none;
        font-size: 2rem;
        padding: 0 0.5rem;
    }
    @media(max-width: 800px) {
        padding: 2rem;
        .row > div > div {
            margin: 1rem;
        }
        .row > div {
            padding: 1rem 0;
        }
    }
`

export default WishlistScreen
