import React from 'react'

export default function Post(props) {
    return (
        <div>
            <p>{props.data.Content}</p>
            <p>{props.data.Sender}</p>
        </div>   
    )
}