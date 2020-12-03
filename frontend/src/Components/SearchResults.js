import React from 'react'
import { useEffect } from 'react'
import { Container, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { listProductsSuggestion } from '../Actions/productActions'
import Loader from './Loader'
import Message from './Message'

const SearchResults = ({ search, focus, category, history }) => {
    const productListSuggestion = useSelector(state => state.productListSuggestion)
    const { products, error, loading } = productListSuggestion

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductsSuggestion(category, search))
    }, [category, dispatch, search])

    if (search === '' || !focus) {
        return (
            <SearchResultsWrapper>
                <Container>
                    <div className="result-display-none"></div>
                </Container>
            </SearchResultsWrapper>
        )
    }
    return (
        <SearchResultsWrapper>
            <Container>
                <div className='search-results'>
                    {loading ? <Loader margin='2rem' /> : error ? <Message variant='danger'>{error}</Message> : (
                        (products.length > 0) ? (
                            products.map(product => {
                                return (
                                    <ListGroupItem
                                        key={product._id}
                                        className='w-100 product'
                                        onClick={() => history.push(`/shop/${product._id}`)}
                                    >
                                        <img src={product.image} alt={product.name} className='img-fluid' />
                                        <h5>{product.name}</h5>
                                    </ListGroupItem>
                                )
                            })
                        ) : <Message>No Product Found</Message>
                    )}
                </div>
            </Container>
        </SearchResultsWrapper>
    )
}

const SearchResultsWrapper = styled.div`
    max-width: 650px;
    margin: auto;

    @keyframes example {
        from {
            width: 0;
        }
        to {
            width: 78%;
        }
    }

    @keyframes exampleReverse {
        from {
            box-shadow: 1px 1px 10px 1px grey;
            width: 58%;
            height: 100px;
            display: block;
        }
        to {
            box-shadow: none;
            width: 0;
            height: 0;
            display: none;
        }
    }

    .container > .result-display-none {
        box-shadow: none;
        animation-name: exampleReverse;
        animation-duration: 1s;
    }

    .container > div {
        border: 1px solid #f0f0f0;
        box-shadow: 1px 1px 10px 1px grey;
        width: 78%;
        max-height: 200px;
        overflow: auto;
        animation-name: example;
        animation-duration: 0.3s;
    }
    .container > div::-webkit-scrollbar {
        display: none;
    }
    .search-results {
        width: 100%;
    }
    .product {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0 0.75rem;
    }
    .product:hover {
        background: #f0f0f0;
        cursor: pointer;
    }
    .product img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .product h5 {
        width: calc(100% - 50px);
        margin: 0 10px;
    }
`

export default (withRouter)(SearchResults)
