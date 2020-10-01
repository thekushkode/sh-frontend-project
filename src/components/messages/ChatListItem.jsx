// Google Firebase Cloud Messaging (FCM) stores messages in a cloud database - message size must be < 1Mb
// moment used to parse, validate, manipulate, and display dates and times in JavaScript.

import React from 'react'
import {
    MDBListGroupItem,
    MDBAvatar
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessages, loadInbox } from '../../redux/actions/index.js'
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import moment from 'moment';
moment().format()



export default function ChatListItem(props) {
    // const reduxMessages = useSelector(state => state.messages)
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    const inbox = useSelector(state => state.inbox)
    const db = firebase.firestore();
    const dispatch = useDispatch();

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

        const updatedNotification = inbox.filter(msg => msg.id === val)
        console.log(updatedNotification)
        if (updatedNotification.length > 0 && updatedNotification[0].data.notifications[user.uid] === true) {
            db.collection('Messages').doc(val).update({ notifications: { ...updatedNotification[0].data.notifications, [user.uid]: false } });
            const updatedInbox = inbox.filter(msg => msg.id !== val)
            dispatch(loadInbox(updatedInbox));
        }
        dispatch(loadMessages(props.id));
    }
    const messageData = props.id.data
    const lastMessage = (messageData.messages.length - 1)
    const them = messageData.userNames.filter((name) => {
        { console.log(name) }
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
                    <small style={{ textAlign: 'right' }}>
                        {moment(messageData.messages[lastMessage].timeStamp).format('MMM Do')}
                        <br />
                        <div className="badge badge-pill badge-danger ml-1 mb-1">
                            {messageData.notifications && messageData.notifications[user.uid] && `New Message`}
                        </div>
                    </small>
                </div>
                <p className='text-truncate' style={{ textAlign: "left" }}>
                    {messageData.messages[0].message && messageData.messages[lastMessage].message.slice(0, 24) + (messageData.messages[lastMessage].message.length > 24 ? "..." : '')}
                </p>
            </MDBListGroupItem >
        </>
    )
}
