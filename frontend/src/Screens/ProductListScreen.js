import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import * as Scroll from 'react-scroll'
import { createProduct, deleteProduct, listProducts } from '../Actions/productActions'
import { Link } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { PRODUCT_CREATE_RESET, PRODUCT_DETAILS_RESET } from '../Constants/productConstants'

const ProductListScreen = ({ history }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { product: createdProduct, loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate

    const dispatch = useDispatch()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        dispatch({
            type: PRODUCT_DETAILS_RESET
        })
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/')
        }
        if (successCreate) {
            history.push(`/admin/productlist/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('All', ''))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const removeProduct = (id, name) => {
        dispatch(deleteProduct(id))
        toast(`Successfully removed '${name.toUpperCase()}'`)
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <ProductListWrapper>
                <Container>
                    <div className='mb-4 mb-md-5 productButtons'>
                        <Link to='/admin' className='btn btn-danger mb-4 mb-md-0'>Go To Admin Panel</Link>
                        <Button className='btn btn-dark' onClick={createProductHandler}>+ Add Product</Button>
                    </div>
                    {loading || loadingDelete || loadingCreate ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : errorDelete ? <Message variant='danger'>{errorDelete}</Message> : errorCreate ? <Message variant='danger'>{errorCreate}</Message> : (
                        products && products.length > 0 ? (
                            <Row>
                                {products.map(item => {
                                    return (
                                        <Col key={item._id} sm={6} md={6} lg={4}>
                                            <div>
                                                <div className='img-container' onClick={() => history.push(`/shop/${item._id}`)}>
                                                    <img src={item.image} alt={item.name} className='img-fluid' />
                                                </div>
                                                <div className='desc' onClick={() => history.push(`/shop/${item._id}`)}>
                                                    <h5>{item.name}</h5>
                                                    <h5 className='price'>&#8377;{item.price}</h5>
                                                </div>
                                                <div className='availability'>
                                                    <h6 className={item.InStock > 0 ? 'text-success' : 'text-danger'}>
                                                        {item.InStock > 0 ? `(${item.InStock} Kg Available)` : '(Out of Stock)'}
                                                    </h6>
                                                </div>
                                                <div className="product-buttons">
                                                    <Button variant='primary' onClick={() => history.push(`/admin/productlist/${item._id}/edit`)}><FaRegEdit /></Button>
                                                    <Button variant='danger' onClick={(id, name) => removeProduct(item._id, item.name)} className='delete'><GrClose /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        ) : (
                                <Message>No Products Found</Message>
                            )
                    )}
                </Container>
            </ProductListWrapper>
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
        </div>
    )
}

const ProductListWrapper = styled.div`
    background: linear-gradient(170deg, greenyellow, lightgreen, greenyellow);
    padding: 5rem 2rem;
    padding-bottom: 4rem;
    .productButtons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .product-buttons {
        position: absolute;
        top: 0;
        right: 0;
    }
    .product-buttons > button:last-of-type {
        border-radius: 0;
        border-top-right-radius: 2rem;
        padding-right: 1rem;
        font-size: 1.0rem;
    }
    .product-buttons > button:first-of-type {
        border-radius: 0;
        border-bottom-left-radius: 2rem;
        padding-left: 1.2rem;
        font-size: 1.0rem;
    }
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
    @media(max-width: 768px) {
        padding: 2rem;
        .row > div > div {
            margin: 1rem;
        }
        .row > div {
            padding: 1rem 0;
        }
        .productButtons {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
        }
    }
    @media(max-width: 579px) {
        .row > div > div {
            width: 300px;
            margin: 1rem auto;
        }
    }
`

export default ProductListScreen