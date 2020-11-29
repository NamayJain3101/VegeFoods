import React, { useState } from 'react'
import axios from 'axios'
import Hero from '../Components/Hero'
import Subscribe from '../Components/Subscribe'

import Veg1 from '../Assets/veg1.jpg'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import styled from 'styled-components'
import Category from '../Components/Category'
import { useEffect } from 'react'

const ShopScreen = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <Hero img={Veg1} max='true' title='Products' />
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
            <Subscribe />
        </div>
    )
}

const ProductListWrapper = styled.div`
    padding: 5rem 0;
`

export default ShopScreen
