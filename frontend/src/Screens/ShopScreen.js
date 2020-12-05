import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Scroll from 'react-scroll'
import Veg1 from '../Assets/veg1.jpg'
import Hero from '../Components/Hero'
import Subscribe from '../Components/Subscribe'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import styled from 'styled-components'
import { useEffect } from 'react'
import { listCategories, listProducts } from '../Actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import SearchResults from '../Components/SearchResults'

const ShopScreen = () => {
    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList

    const productListCategory = useSelector(state => state.productListCategory)
    const { categories, error: errorCategory, loading: loadingCategory } = productListCategory

    const dispatch = useDispatch()

    const [category, setCategory] = useState('All')
    const [search, setSearch] = useState('')
    const [searchName, setSearchName] = useState('')

    const [focus, setFocus] = useState(false)

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({
            duration: 1500,
            smooth: 'easeInOutQuint'
        })
        dispatch(listProducts(category, searchName))
        dispatch(listCategories())
    }, [category, dispatch, searchName])

    const selectCategory = (itemCategory) => {
        if (category !== itemCategory) {
            setCategory(itemCategory)
            setSearch('')
            setSearchName('')
        }
    }

    const searchProducts = () => {
        setSearchName(search)
    }

    return (
        <div>
            <Hero img={Veg1} title='Products' />
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <React.Fragment>
                    <CategoryWrapper>
                        {loadingCategory ? <Loader /> : errorCategory ? <Message variant='danger'>{errorCategory}</Message> : (
                            categories.map((item, index) => {
                                return (
                                    <Button
                                        key={index}
                                        variant='success'
                                        type='button'
                                        className={item === category ? 'active' : ''}
                                        onClick={() => { selectCategory(item) }}
                                    >{item}</Button>
                                )
                            })
                        )}
                    </CategoryWrapper>
                    <SearchWrapper>
                        <Container className='search'>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={search}
                                onClick={() => setFocus(true)}
                                onBlur={() => setTimeout(() => {
                                    setFocus(false)
                                }, 500)}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                variant='outline-success'
                                type='button'
                                onClick={() => searchProducts()}
                            >
                                Search
                            </Button>
                        </Container>
                        <SearchResults category={category} search={search} focus={focus} />
                    </SearchWrapper>
                    <Container>
                        <ProductListWrapper>
                            <Row>
                                {products.length > 0 ? (
                                    products.map(product => {
                                        return (
                                            <Col key={product.name} md={6} lg={3}>
                                                <Product product={product} />
                                            </Col>
                                        )
                                    })
                                ) : <Message>No Product Found</Message>
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
    padding: 4rem 0;
`

const SearchWrapper = styled.div`
    max-width: 700px;
    margin: auto;
    position: relative;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    input {
        width: 78%;
        padding: 9px 12px;
        border: 1px solid green;
    }
    button {
        width: 20%;
        padding: 9px 12px;
    }
    @media(max-width: 501px) {
        input {
            width: 74%;
        }
        button {
            width: 24%;
        }
    }
`

const CategoryWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
    overflow: auto;
    button {
        margin: 0 0.5rem;
        background: white;
        color: #82ae46;
        border: none;
        outline: none;
    }
    button:hover, button:focus {
        background: lightgreen;
        color: green;
    }
    .active {
        background: #82ae46 !important;
        color: white;
    }
    @media(max-width: 701px) {
        padding-bottom: 3rem;
    }
`

export default ShopScreen
