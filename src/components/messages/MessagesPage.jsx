import React, { useEffect } from 'react'
import firebase from '../../firebase';
import MessagesBar from './MessagesBar'
import MessagesWindow from './MessagesWindow'
import Conversation from './Conversation';

export default function MessagesPage() {
    const [allMessages, setAllMessages] = React.useState({});
    const db = firebase.firestore();


    useEffect(() => {
        // db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').update({
        //     'eSoolOZFcrpniMgINzq1':
        //         [
        //             {
        //                 message: 'newest',
        //                 timeStamp: Date.now(),
        //                 sender: 'thisuesername'
        //             },
        //             {
        //                 message: 'test2',
        //                 timeStamp: Date.now(),
        //                 sender: 'thisuesername'
        //             },
        //             {
        //                 message: 'test2',
        //                 timeStamp: Date.now(),
        //                 sender: 'thisuesername'
        //             },
        //             {
        //                 message: 'test2',
        //                 timeStamp: Date.now(),
        //                 sender: 'thisuesername'
        //             },
        //             {
        //                 message: 'test2',
        //                 timeStamp: Date.now(),
        //                 sender: 'thisuesername'
        //             }
        //         ]
        // }).then(res => {
        //     return console.log(res)
        // })

        db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').get()
            .then(res => {
                console.log(res.data())
                setAllMessages(res.data());
            })

    }, [])


    const messages = Object.keys(allMessages).length && Object.keys(allMessages).map((item) => {
        return (
            <Conversation messages={allMessages[item]} />
        )
    })



    return (
        <div>
            Main Messages Page
            <div>
                <MessagesBar />
            </div>
            <MessagesWindow />
            {messages.length && messages.map((item) => <>{item}</>)}
        </div>
    )
}
