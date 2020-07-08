import React from 'react'
import { useDispatch } from 'react-redux';
import { MDBListGroupItem } from 'mdbreact'
import MessagesWindow from './MessagesWindow'
import { loadMessages } from '../../redux/actions/index.js'
import firebase from '../../firebase';
import moment from 'moment'
moment().format()



export default function ChatListItem({ messages }) {
    
    // set db to firebase store 
    const db = firebase.firestore();

    // create React Hook for ChatListItem
    // purpose: boolean for chat list visibility
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
