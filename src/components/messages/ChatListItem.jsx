// Google Firebase Cloud Messaging (FCM) stores messages in a cloud database - message size must be < 1Mb
// moment used to parse, validate, manipulate, and display dates and times in JavaScript.

import React from 'react'
import {
    MDBListGroupItem,
    MDBAvatar
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessages } from '../../redux/actions/index.js'
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import moment from 'moment';
moment().format()



export default function ChatListItem(props) {
    // const reduxMessages = useSelector(state => state.messages)
    const profile = useSelector(state => state.profile)
    const db = firebase.firestore();
    let dispatch = useDispatch();

    function itemClicked(val) {
        db.collection('Messages').doc(val)
            .onSnapshot((querySnapshot) => {
                dispatch(loadMessages(
                    {
                        id: querySnapshot.id,
                        data: querySnapshot.data()
                    }
                ))
            })
        dispatch(loadMessages(props.id));
    }
    let messageData = props.id.data
    let lastMessage = (messageData.messages.length - 1)
    let them = messageData.userNames.filter((name) => 
    {
        {console.log(name)}
        return name !== profile.data.ownerName
    })

    return (
        <>
            <MDBListGroupItem hover onClick={() => itemClicked(props.id.id)}>
                <MDBAvatar
                    src={messageData.senderAvatar === profile.data.avatar ? messageData.receiverAvatar : messageData.senderAvatar}
                    alt='User Profile'
                    tag='img'
                    className='float-left mr-3'
                />
                <div className='d-flex justify-content-between mb-1'>
                    <span className='mb-1'>
                        <strong>{them.join(', ')}</strong>
                    </span>
                    <small>{moment(messageData.messages[lastMessage].timeStamp).format('MMM Do')}</small>
                </div>
                <p className='text-truncate' style={{ textAlign: "left" }}>
                    {messageData.messages[0].message && messageData.messages[lastMessage].message.slice(0, 24) + (messageData.messages[lastMessage].message.length > 24 ? "..." : '')}
                </p>
            </MDBListGroupItem >
        </>
    )
}