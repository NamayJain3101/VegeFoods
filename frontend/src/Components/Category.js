import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Category = ({ products, match, history }) => {
    const categories = ['All', ...new Set(products.map(({ category }) => category))]
    const [category, setCategory] = useState('All')

    const selectCategory = (itemCategory) => {
        if (category !== itemCategory) {
            setCategory(itemCategory)
        }
    }

    return (
        <CategoryWrapper>
            {categories.map((item, index) => {
                return (
                    <Button
                        key={index}
                        variant='success'
                        type='button'
                        className={item === category ? 'active' : ''}
                        onClick={() => { selectCategory(item) }}
                    >{item}</Button>
                )
            })}
        </CategoryWrapper>
    )
}

const CategoryWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem;
    padding-bottom: 0;
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
`

export default (withRouter)(Category)
