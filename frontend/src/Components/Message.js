import React from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'

const Message = ({ variant, children }) => {
    return (
        <MessageWrapper>
            <Alert
                variant={variant || 'info'}
            >
                {children}
            </Alert>
        </MessageWrapper>
    )
}

const MessageWrapper = styled.div`
    width: 100%;
    .alert {
        width: 70%;
        margin: 4rem auto;
        text-align: center;
        padding: 0.5rem 2rem;
        border-radius: 4rem;
        font-size: 1.2em;
    }
    @media(max-width: 701px) {
        .alert {
            width: 90%;
            margin: 3rem auto;
        }
    }
`

export default Message
