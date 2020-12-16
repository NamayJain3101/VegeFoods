import React, { useEffect, useState } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'
import styled from 'styled-components'
import Loader from '../Components/Loader'
import * as Scroll from 'react-scroll'
import { listProductDetails, updateProduct } from '../Actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../Constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [discountPrice, setDiscountPrice] = useState('')
    const [inStock, setInStock] = useState('')

    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            category,
            description,
            discountPrice,
            InStock: inStock,
            image
        }))
    }

    const uploadFilehandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form/data'
                }
            }
            const { data } = await axios.post('/api/uploads', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setMessage(error.message)
            setUploading(false)
        }
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        if (successUpdate) {
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            history.push('/admin/productlist')
        } else {
            if (!userInfo || !userInfo.isAdmin) {
                history.push('/')
            } else {
                if (!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    setName(product.name)
                    setCategory(product.category)
                    setDescription(product.description)
                    setInStock(product.InStock)
                    setPrice(product.price)
                    setDiscountPrice(product.discountPrice)
                    setImage(product.image)
                }
            }
        }
    }, [dispatch, history, userInfo, product, productId, successUpdate])

    return (
        <div>
            <ProductEditWrapper>
                <Animated animationIn="flipInX" animationOut="zoomOutDown" isVisible={true}>
                    <Container>
                        <Link to='/admin/productlist' className='btn mt-0 btn-danger btnClose'><GrClose /></Link>
                        <h3 className='d-block text-center text-uppercase font-weight-bold'>Edit Product</h3>
                        <Row>
                            {loading || loadingUpdate || uploading ? <Loader /> : (
                                <React.Fragment>
                                    <Col lg={6} className='mb-4 mb-lg-0 pr-lg-5 img-container'>
                                        <Tilt className="Tilt"
                                            options={{
                                                max: 30,
                                                perspective: 1000,
                                                scale: 0.9,
                                                speed: 700,
                                                transition: true,
                                                easing: "cubic-bezier(.03,.98,.52,.99)"
                                            }}
                                        >
                                            <img src={image} alt='login' className='w-100 img-fluid' />
                                        </Tilt>
                                    </Col>
                                    <Col lg={6} className='form'>
                                        <label htmlFor='name' className='w-100 ml-4 text-left'>Name<span className='req'>*</span></label>
                                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder='Name' />

                                        <label htmlFor='image-file' className='w-100 ml-4 text-left'>Image<span className='req'>*</span></label>
                                        <input type="file" required name="image-file" id="image-file" onChange={uploadFilehandler} />
                                        {message && <p className='text-danger text-capitalize error'>{message}</p>}

                                        <label htmlFor='category' className='w-100 ml-4 text-left'>Category<span className='req'>*</span></label>
                                        <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="category" placeholder='Category' />

                                        <label htmlFor='Description' className='w-100 ml-4 text-left'>Description</label>
                                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" placeholder='Description (Separated by ",")' />

                                        <label htmlFor='discountPrice' className='w-100 ml-4 text-left'>Original Price</label>
                                        <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} name="discountPrice" id="discountPrice" placeholder='Original Price' />

                                        <label htmlFor='Price' className='w-100 ml-4 text-left'>Selling Price<span className='req'>*</span></label>
                                        <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder='Selling Price' />

                                        <label htmlFor='InStock' className='w-100 ml-4 text-left'>In Stock<span className='req'>*</span></label>
                                        <input type="number" required value={inStock} onChange={(e) => setInStock(e.target.value)} name="inStock" id="inStock" placeholder='In Stock (in Kg)' />

                                        {error && <p className='text-danger text-capitalize error'>{error}</p>}
                                        {errorUpdate && <p className='text-danger text-capitalize error'>{errorUpdate}</p>}

                                        <Button variant='success' className='btn btn-block text-uppercase' onClick={submitHandler}>update</Button>
                                    </Col>
                                </React.Fragment>
                            )}
                        </Row>
                    </Container>
                </Animated>
            </ProductEditWrapper>
        </div>
    )
}

const ProductEditWrapper = styled.div`
    background: linear-gradient(170deg, yellowgreen, lightgreen, yellowgreen);
    padding: 5rem 0;
    .container {
        padding: 3rem;
        background: white;
        border-radius: 2rem;
        box-shadow: 5px 5px 40px 5px green;
        position: relative;
    }
    img {
        border-radius: 50%;
    }
    .img-container {
        position: relative;
    }
    .img-container > input {
        position: absolute;
        bottom: 0;
        right: 0;
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
    .container label {
        font-weight: bold;
        text-transform: capitalize;
        letter-spacing: 3px;
        margin-top: 10px;
        color: grey;
    }
    .req {
        color: red;
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

export default ProductEditScreen
