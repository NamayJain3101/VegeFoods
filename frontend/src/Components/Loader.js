import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ margin }) => {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                width: '100px',
                height: '100px',
                margin: `${margin || '5rem'} auto`,
                display: 'block',
                color: 'green',
                borderRadius: '0%',
                borderRightColor: 'green'
            }}
        >
            <Spinner
                animation='grow'
                role='status'
                style={{
                    width: '60px',
                    height: '60px',
                    margin: '1rem auto',
                    display: 'block',
                    color: 'green',
                    borderRadius: '1rem',
                    borderRightColor: 'green'
                }}
            ></Spinner>
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
