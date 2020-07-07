import React from 'react'
import SingleMessage from './SingleMessage'

export default function MessagesWindow({ content }) {
    console.log('messagewindow', content);
    return (
        <div>
            <ul>
                {content && content.map((item) => {
                    console.log(item, 'messages.map')
                    return (
                        <SingleMessage content={item} />
                    )
                })}
            </ul>
        </div>
    )
}
