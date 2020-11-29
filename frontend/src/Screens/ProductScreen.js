import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Rating from '../Components/Rating'
import Subscribe from '../Components/Subscribe'

const ProductScreen = ({ match, history }) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.name}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])

    let desc;
    if (product.description) {
        if (product.description.color) {
            desc = [...product.description.color]
        } else if (product.description.flavour) {
            desc = [...product.description.flavour]
        }
    }

    const [description, setDescription] = useState(desc && desc[0])
    const [qty, setQty] = useState(1)

    const incQty = () => {
        setQty(qty + 1)
    }

    const decQty = () => {
        setQty(qty - 1)
    }

    return (
        <div>
            {product && (
                <ProductScreenWrapper>
                    <Container>
                        <Button type='button' variant='light' onClick={() => history.push('/shop')}>Go Back</Button>
                        <Row>
                            <Col lg={6}>
                                <img src={product.image} alt={product.name} className='img-fluid w-100' />
                            </Col>
                            <Col lg={6} className='description'>
                                <h2 className='text-uppercase'>{product.name}</h2>
                                <Rating value={product.rating} text={product.numReviews} />
                                <h2 className='price'>
                                    {product.discountPrice && <span className='text-muted'>&#8377;{product.discountPrice}</span>}
                                &#8377;{product.price}/Kg
                            </h2>
                                {desc && (
                                    <Form.Control className='desc' as='select' value={description} onChange={(e) => { setDescription(e.target.value) }}>
                                        {desc.map((cat, index) => (
                                            <option key={index} value={cat}>{cat}</option>
                                        ))}
                                    </Form.Control>
                                )}
                                <div className='quantity'>
                                    <button disabled={qty <= 1} onClick={decQty}>-</button>
                                    <div className='input'>{`${qty} Kg`}</div>
                                    <button disabled={qty >= product.InStock} onClick={incQty}>+</button>
                                </div>
                                <h6>{product.InStock > 0 ? `${product.InStock} Kg available` : `Out Of Stock`}</h6>
                                <Button disabled={product.InStock <= 0} className='cartButton' variant='success' type='button'>Add To Cart</Button>
                            </Col>
                        </Row>
                    </Container>
                </ProductScreenWrapper>
            )}
            <Subscribe />
        </div>
    )
}

const ProductScreenWrapper = styled.div`
    padding: 5rem;
    * {
        margin-bottom: 1rem;
    }
    h2 > span {
        margin-right: 10px;
        font-family: sans-serif !important;
        text-decoration: line-through;
    }
    .description {
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .description * {
        text-align: center;
    }
    .row div {
        width: 100%;
    }
    .price {
        font-family: sans-serif !important;
    }
    .quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50% !important;
        margin-top: 1rem;
    }
    .quantity button {
        border: 1px solid #f0f0f0;
        outline: none;
        background: white;
        padding: 5px;
        font-size: 1.2rem;
        width: 20%;
    }
    .quantity .input {
        text-align: center;
        border: 1px solid #f0f0f0;
        outline: none;
        background: white;
        padding: 5px 13px;
        font-size: 1.2rem;
        width: 50%;
    }
    .desc {
        text-transform: capitalize;
        outline: none;
        border: 1px solid #f0f0f0;
        width: 50% !important;
    }
    .cartButton {
        outline: none;
        padding: 1rem 3rem;
        border-radius: 3rem;
        border: none;
        background: black;
        width: 50%;
    }
    .cartButton:hover, .cartButton:focus, .cartButton:active {
        background: #82ae46;
    } 
    @media(max-width: 701px) {
        padding: 5rem 2rem;
        .quantity {
            width: 80% !important;
        }
        .desc {
            width: 80% !important;
        }
        .cartButton {
            width: 80%;
        }
    }
    @media(max-width: 501px) {
        .quantity {
            width: 100% !important;
        }
        .desc {
            width: 100% !important;
        }
        .cartButton {
            width: 100%;
        }
    }
`

export default ProductScreen
