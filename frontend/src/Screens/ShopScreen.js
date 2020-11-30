import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hero from '../Components/Hero'
import Subscribe from '../Components/Subscribe'

import Veg1 from '../Assets/veg1.jpg'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import styled from 'styled-components'
import Category from '../Components/Category'
import { useEffect } from 'react'
import { listProducts } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ShopScreen = () => {
    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <Hero img={Veg1} max='true' title='Products' />
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <React.Fragment>
                    <Category products={products} />
                    <Container>
                        <ProductListWrapper>
                            <Row>
                                {
                                    products.map(product => {
                                        return (
                                            <Col key={product.name} md={6} lg={4}>
                                                <Product product={product} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </ProductListWrapper>
                    </Container>
                </React.Fragment>
            )}
            <Subscribe />
        </div>
    )
}

const ProductListWrapper = styled.div`
    padding: 5rem 0;
`

export default ShopScreen
