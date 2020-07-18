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
moment().format()



export default function ChatListItem(props) {
    //const reduxMessages = useSelector(state => state.messages)
    //const user = useSelector(state => state.user)
    let dispatch = useDispatch();
    const db = firebase.firestore();

    // <visible> state variable, initialized to false
    //const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        // console.log(props.id.id)
    }, [])

    function itemClicked() {
        db.collection('Messages').doc(props.id.id)
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
    let messageData = props.id.data
    let lastMessage = (messageData.messages.length - 1)
    // console.log(messageData.userNames)
    // console.log(messageData)

    const arrOfMessageParticipantIds = [];

    // let userNames = messageData.userNames.filter((name) => name !== user.data.displayName)

    return (
        <MDBListGroupItem hover onClick={itemClicked}>
            <div className='mr-3 float-left' style={{ position: 'relative' }}>
                <MDBAvatar
                    // User Profile Photo - this should match the profile link for the message recipient in FireBase
                    // src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + arrOfMessageParticipantIds[1] + '?alt=media'
                    src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/jon.gif?alt=media'
                    alt='User Profile'
                    tag='img'
                    // className='float-left'
                    style={{ position: 'absolute', border: '3px solid #dddddd', zIndex: '4' }}
                />
                <MDBAvatar
                    // User Profile Photo - this should match the profile link for the message recipient in FireBase
                    src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/logan.gif?alt=media'
                    alt='User Profile'
                    tag='img'
                    // className='float-left'
                    style={{ position: 'absolute', marginLeft: '8px', marginTop: '-4px', border: '3px solid #dddddd', zIndex: '3' }}
                />
                <MDBAvatar
                    // User Profile Photo - this should match the profile link for the message recipient in FireBase
                    src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/gerrit.gif?alt=media'
                    alt='User Profile'
                    tag='img'
                    // className='float-left'
                    style={{ position: 'absolute', marginLeft: '16px', marginTop: '-8px', border: '3px solid #dddddd', zIndex: '2' }}
                />
            </div>
            <div className='d-flex justify-content-between mb-1'>
                <span className='mb-1'>
                    {/* {userNames.map((name, index) => {
                        return (
                            <strong>{name}{index < (userNames.length - 1) ? ', ' : null}</strong>
                        )
                    })} */}
                    {messageData.userNames && messageData.userNames.map((name, index) => {
                        return (
                            <strong style={{ textAlign: "left" }}>{name ? name : <i>null</i>}{index < (messageData.userNames.length - 1) ? ', ' : null}</strong>
                        )
                    })}
                </span>
                <small>{moment(messageData.messages[lastMessage].timeStamp).format('MMM Do')}</small>
            </div>
            <p className='text-truncate' style={{ textAlign: "left" }}>
                {messageData.messages[0].message && messageData.messages[lastMessage].message.slice(0, 24) + (messageData.messages[lastMessage].message.length > 24 ? "..." : '')}
            </p>
        </MDBListGroupItem >
    )
}