import React from 'react'
import MessagesWindow from './MessagesWindow';

export default function Conversation({ messages }) {
    const [visible, setVisible] = React.useState(false);
    console.log(messages);
    return (
        <>
            <p onClick={() => setVisible(!visible)}>user: {messages[0].sender}</p>
            {visible && <MessagesWindow content={messages} />}
        </>
    )
}
