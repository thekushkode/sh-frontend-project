import React from 'react'
import MessagesWindow from './MessagesWindow';

export default function Conversation({ messages }) {

    // <visible> state variable, initialized to false
    const [visible, setVisible] = React.useState(false);


    return (
        <>
            <p onClick={() => setVisible(!visible)}>user: {messages[0].sender}</p>
            {visible && <MessagesWindow content={messages} />}
        </>
    )
}
