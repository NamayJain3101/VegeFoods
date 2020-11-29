import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { FaBars, FaHeart, FaShoppingCart } from 'react-icons/fa'

const Product = ({ product, history }) => {
    const { image, name, price, discountPrice } = product
    return (
        <ProductWrapper>
            <div className='img-wrapper' onClick={() => { history.push(`/shop/${name}`) }}>
                <img src={image} alt={name} className='img-fluid w-100' />
            </div>
            <div className={discountPrice ? 'discount' : 'discount d-none'}>
                {discountPrice && ((discountPrice - price) * 100 / discountPrice).toFixed(0)}%
            </div>
            <div className='desc'>
                <div className='data'>
                    <h6>{name.toUpperCase()}</h6>
                    <p>
                        {discountPrice && <span className='text-muted'>&#8377;{discountPrice}</span>}
                        &#8377;{price}
                    </p>
                </div>
                <div className="buttons">
                    <button onClick={() => { history.push(`/shop/${name}`) }}><FaBars /></button>
                    <button><FaHeart /></button>
                    <button><FaShoppingCart /></button>
                </div>
            </div>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.div`
    padding: 1rem;
    padding-top: 0;
    margin: 1rem 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    position: relative;
    transition: all 0.3s ease;
    * {
        transition: all 0.5s ease;
    }
    :hover {
        box-shadow: 0 1px 20px 2px #ccc;
    }
    :hover .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :hover .data {
        display: none;
    }
    .img-wrapper {
        cursor: pointer;
        overflow: hidden;
        margin-bottom: 1rem;
        height: 70%;
    }
    .img-wrapper img{
        transform: scale(1.1);;
    }
    .img-wrapper img:hover {
        transform: scale(1.3);
    }
    .desc {
        width: 100%;
        text-align: center;
        height: 52px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .data {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        visibility: visible;
    }
    .desc .data span {
        text-decoration: line-through;
        margin-right: 5px;
    }
    .desc .data p {
        color: green;
        font-family: sans-serif;
        margin: 0;
    }
    .desc .data p span {
        font-family: sans-serif;       
    }
    .buttons {
        width: 100%;
        height: 100%;
        background: white;
        display: none;
    }
    .buttons button {
        outline: none;
        border: none;
        background: #82ae46;
        color: white;
        border-radius: 50%;
        padding: 0.5rem 0.7rem;;
        margin: 0 3px;
    }
    .discount {
        background: #82ae46;
        color: white;
        padding: 4px 8px;
        position: absolute;
        top: 0;
        left: 0;
    }
`

export default (withRouter)(Product)
