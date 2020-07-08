// Google Firebase Cloud Messaging (FCM) stores messages in a cloud database - message size must be < 1Mb
// moment used to parse, validate, manipulate, and display dates and times in JavaScript.

import React from 'react'
import { MDBListGroupItem } from 'mdbreact'
import { useDispatch } from 'react-redux';
import MessagesWindow from './MessagesWindow'
import { loadMessages } from '../../redux/actions/index.js'
import firebase from '../../firebase';
import moment from 'moment'
moment().format()



export default function ChatListItem({ messages }) {
    
    // set db to firebase store 
    const db = firebase.firestore();

    // <visible> state variable, initialized to false
    const [visible, setVisible] = React.useState(false);

    let dispatch = useDispatch();

    function itemClicked() {
        dispatch(loadMessages(messages));
    }

    return (
        <MDBListGroupItem hover onClick={itemClicked}>
            <div className='d-flex justify-content-between mb-1'>
                <span className='mb-1'>
                    <strong>{messages[0].sender}</strong>
                </span>
                <small>{moment(messages[0].timeStamp).format('MMMM Do')}</small>
            </div>
            {visible && <MessagesWindow content={messages} />}
        </MDBListGroupItem>
    )
}
