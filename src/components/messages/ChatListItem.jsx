// Google Firebase Cloud Messaging (FCM) stores messages in a cloud database - message size must be < 1Mb
// moment used to parse, validate, manipulate, and display dates and times in JavaScript.

import React, { useEffect } from 'react'
import {
    MDBListGroupItem,
    MDBAvatar
} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
//import MessagesWindow from './MessagesWindow'
import { loadMessages } from '../../redux/actions/index.js'
import firebase from '../../firebase';
import moment from 'moment'
import { message } from 'antd';
moment().format()



export default function ChatListItem(props) {
    const reduxMessages = useSelector(state => state.messages)
    const profile = useSelector(state => state.profile)
    let dispatch = useDispatch();
    const db = firebase.firestore();

    // <visible> state variable, initialized to false
    //const [visible, setVisible] = React.useState(false);

    // useEffect(() => {
    //     itemClicked(reduxMessages.id)
    // }, [])

    function itemClicked(val) {
        console.log(val)
        // console.log(props.id)
        db.collection('Messages').doc(val)
            .onSnapshot((querySnapshot) => {
                // console.log(querySnapshot.id)
                // dispatch(loadMessages({ querySnapshot }))
                dispatch(loadMessages(
                    {
                        id: querySnapshot.id,
                        data: querySnapshot.data()
                    }
                ))
            })
        dispatch(loadMessages(props.id));
    }
    console.log(props);
    let messageData = props.id.data
    let lastMessage = (messageData.messages.length - 1)
    // console.log(messageData.userNames)
    // console.log(messageData)

    const arrOfMessageParticipantIds = [];

    // let userNames = messageData.userNames.filter((name) => name !== user.data.displayName)

    {console.log(messageData)}
    return (
        <>
            {messageData.userNames && messageData.userNames.map((name, index) => {
                // {let imgURL = messageData.messages[0].senderAvatar }
                return (
                    <MDBListGroupItem hover onClick={() => itemClicked(props.id.id)}>
                        {console.log(`${name}`)}
                        {/* {console.log(`https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/${arrOfMessageParticipantIds[1]}?alt=media`)} */}
                        <MDBAvatar
                            // User Profile Photo - this should match the profile link for the message recipient in FireBase
                            src={messageData.senderAvatar === profile.data.avatar ? messageData.receiverAvatar : messageData.senderAvatar}
                            // src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/5rhZ4tsqyYFHTE2q3Qua.jpg?alt=media'
                            alt='User Profile'
                            tag='img'
                            className='float-left mr-3'
                        />

                        <div className='d-flex justify-content-between mb-1'>
                            <span className='mb-1'>
                                <strong>{name ? name : <i>null</i>}{index < (messageData.userNames.length - 1) ? ', ' : null}</strong>
                                {console.log(messageData.messages)}
                                {console.log(messageData.messages[lastMessage])}
                            </span>
                            <small>{moment(messageData.messages[lastMessage].timeStamp).format('MMM Do')}</small>
                        </div>
                        <p className='text-truncate' style={{ textAlign: "left" }}>
                            {messageData.messages[0].message && messageData.messages[lastMessage].message.slice(0, 24) + (messageData.messages[lastMessage].message.length > 24 ? "..." : '')}
                        </p>
                    </MDBListGroupItem >
                )
            })}
        </>

    )
}