import React from 'react'

export default function SingleMessage({ content }) {
    return (
        <li>
            {content.sender} :{content.message}
        </li>
    )
}
