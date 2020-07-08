import React from 'react'
import { useSelector } from 'react-redux'
import SingleMessage from './SingleMessage'
import '../Chat.css';


export default function MessagesWindow({ content }) {
    const messages = useSelector(state => state.messages)
    const user = useSelector(state => state.user)
    console.log('messagewindow', content);
    return (
        <div>
            <ul>
                {messages && messages.map((item) => {
                    console.log(item, 'messages.map')
                    let styles;
                    if (item.sender === user.displayName) {
                        styles = ['end', 'primary-color', 'text-white']
                    } else {
                        styles = ['start', 'grey lighten-3', 'text-black']
                    }
                    return (
                        <SingleMessage formating={styles} content={item} />
                    )
                })}
            </ul>
        </div>
    )
}
