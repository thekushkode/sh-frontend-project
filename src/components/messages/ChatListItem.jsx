// Google Firebase Cloud Messaging (FCM) stores messages in a cloud database - message size must be < 1Mb
// moment used to parse, validate, manipulate, and display dates and times in JavaScript.

import React from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,
    MDBAvatar
} from 'mdbreact';
import { useDispatch } from 'react-redux';
import MessagesWindow from './MessagesWindow'
import { loadMessages } from '../../redux/actions/index.js'
import firebase from '../../firebase';
import moment from 'moment'
moment().format()



export default function ChatListItem({ messages }) {

    const db = firebase.firestore();

    // <visible> state variable, initialized to false
    const [visible, setVisible] = React.useState(false);

    let dispatch = useDispatch();

    function itemClicked() {
        dispatch(loadMessages(messages));
    }

    return (
        <MDBListGroupItem hover onClick={itemClicked}>
            <MDBAvatar
                // User Profile Photo - this should match the profile link for the message recipient in FireBase
                src='https://www.gravatar.com/avatar/05b6d7cc7c662bf81e01b39254f88a49?d=identicon'
                alt='User Profile'
                tag='img'
                className='float-left mr-3'
            />
            <div className='d-flex justify-content-between mb-1'>
                <span className='mb-1'>
                    <strong>{messages[0].sender}</strong>
                </span>
                <small>{moment(messages[0].timeStamp).format('MMM Do')}</small>
            </div>
            <p className='text-truncate'>
                {messages[0].message && messages[0].message.slice(0, 24) + (messages[0].message.length > 24 ? "..." : '')}
            </p>
            {visible && <MessagesWindow content={messages} />}
        </MDBListGroupItem>
    )
}