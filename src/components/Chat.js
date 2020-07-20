import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar
} from 'mdbreact';

import firebase from '../firebase';
import ChatListItem from './messages/ChatListItem'
import './Chat.css';
import FooterPage from './Footer';
import MessagesWindow from './messages/MessagesWindow';
import { loadMessages, setProfile } from '../redux/actions/index.js'



const Chat = () => {
  const db = firebase.firestore();
  let dispatch = useDispatch();
  const [allMessages, setAllMessages] = React.useState('');
  const [chatInput, setChatInput] = React.useState('')
  const reduxMessages = useSelector(state => state.messages)
  const user = useSelector(state => state.user)
  const profile = useSelector(state => state.profile)
  const history = useHistory();

  let currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    history.push('/')
  }


  useEffect(() => {
    if (user) {
      db.collection('Messages')
        .where('members', 'array-contains', user.uid)
        .onSnapshot((querySnapshot) => {
          let dataArray = []
          querySnapshot.forEach(function (doc) {
            // console.log(doc.id, doc.data())
            dataArray.push({ id: doc.id, data: doc.data() })
          })
          setAllMessages(dataArray)
        })
    }
  }, [])

  function changeInput(value) {
    setChatInput(value);
  }

  function enterKey(target) {
    if (target.charCode === 13) {
      alert('enter')
    } else {
      alert('not enter')
    }
    console.log(target)
    console.log(target.charCode)
  }

  function submitMessage(e) {
    console.log('in submit message')
    e.preventDefault()
    // console.log(...reduxMessages)
    let allNewMessages = [...reduxMessages.data.messages,
    {
      message: chatInput,
      timeStamp: Date.now(),
      sender: profile.data.ownerName,
      senderAvatar: profile.data.avatar
    }]
    db.collection('Messages').doc(reduxMessages.id).update({
      'messages': allNewMessages
    })
    dispatch(loadMessages({
      ...reduxMessages,
      data: {
        ...reduxMessages.data,
        messages: allNewMessages
      }
    }))
    setChatInput('')
  }



  // Create a reference with an initial file path and name
  var storage = firebase.storage();
  // var pathReference = storage.ref('images/stars.jpg');

  // Create a reference from a Google Cloud Storage URI
  var gsReference = storage.refFromURL('gs://sh-frontend-8f893.appspot.com/gerrit.gif')

  var imgFileName = 'kush.gif'
  var imgRef = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/' + imgFileName + '?alt=media'

  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  // var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');



  {console.log(allMessages)}
  const messages = allMessages && Object.keys(allMessages).length && allMessages.map((item) => {
    return (
      <ChatListItem id={item} messages={allMessages[item]}></ChatListItem>
    )
  })

  const ROOT_CSS = css({
    height: 600,
    width: 600,
    marginTop: 40,
    overflowX: 'hidden',
  });

  return (
    <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
      <header style={{ marginBottom: '100px' }}>
      </header>
      <div id='chat' className='m-4'>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol lg='4'>
              <MDBInput type='text' icon='search' label='Search Your Messages' containerClass="text-left" />
              <MDBListGroup style={{ height: '70vh', overflow: "scroll" }}>
                {messages && messages.map((item) => <>{item}</>)}
              </MDBListGroup>
            </MDBCol>
            <MDBCol lg='8' className='mt-lg-0 mt-5'>

              <MessagesWindow />
              
              <div className='row'>
                <div className='col-md-12'>
                  <div className='d-flex flex-row'>
                    <form onSubmit={(e) => submitMessage(e)}
                      style={{
                        display: 'flex',
                      }}>
                      <input
                        type='input'
                        // containerClass='chat-message-type'
                        label='Type your message'
                        rows='1'
                        style={{
                          marginLeft: '40px',
                          marginTop: '8px',
                          minWidth: '350px',
                          maxWidth: '450px',
                          height: 37,
                          borderRadius: "20px",
                          border: '2px solid #dddddd',
                        }}
                        value={chatInput}
                        onChange={(e) => changeInput(e.target.value)}
                      // onKeyPress={(e) => enterKey(e.target)}
                      />
                      <div>
                        <button
                          className='btn blue-gradient btn-md rounded-pill waves-effect waves-light'
                          htmlType='submit'
                          style={{
                            display: 'flex',
                          }}
                          onClick={(e) => submitMessage(e)}
                        >
                          Send
                        </button>
                      </div>
                    </form>

                  </div>
                </div>

              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <footer>
        <FooterPage />
      </footer>
    </div >
  );
};

export default Chat;
