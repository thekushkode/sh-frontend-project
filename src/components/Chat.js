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
  MDBAvatar,
  MDBBadge,
  MDBIcon,
  MDBChip
} from 'mdbreact';
import { Link } from 'react-router-dom';
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
    window.scrollTo(0, 0)
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
    // console.log(target)
    // console.log(target.charCode)
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

    // to trigger notifications
    Object.keys(reduxMessages.data.newMessages)
      .forEach(msg => {
        if (msg === user.uid) { reduxMessages.data.newMessages[msg] = false }
        else { reduxMessages.data.newMessages[msg] = true }
      })
    const updateNewMessages = { ...reduxMessages.data.newMessages }
    db.collection('Messages').doc(reduxMessages.id).update({
      'messages': allNewMessages,
      newMessages: updateNewMessages
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

  // console.log(profile.data);


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

  const messages = allMessages && allMessages.sort((a, b) => {
    if (a.data.messages[a.data.messages.length - 1].timeStamp < b.data.messages[b.data.messages.length - 1].timeStamp) {
      return 1
    } else {
      return -1
    }
  }).map((item) => {
    return (
      <ChatListItem id={item} />
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
              <MDBChip size="lg" src={profile.data.avatar} alt="Contact Person" bgColor="aqua-gradient"
                text="white" waves>
                {profile.data.dogName}'s Messages
              </MDBChip>
              {/* <MDBInput type='text' icon='search' label='Search Your Messages' containerClass="text-left" /> */}
              <MDBListGroup style={{ maxHeight: '70vh', overflow: "scroll", margin: 'auto' }}>
                {messages && messages.map((item) => <>{item}</>)}
              </MDBListGroup>
            </MDBCol>
            <MDBCol lg='8' className='mt-lg-0 mt-5'>

              <MessagesWindow />

              <MDBRow>
                <MDBCol>
                  <div className='d-flex flex-row'>
                    <form onSubmit={(e) => submitMessage(e)}
                      style={{
                        display: 'flex',
                      }}>
                      <input
                        type='input'
                        // containerClass='chat-message-type'
                        placeholder='Type your message'
                        rows='1'
                        style={{
                          marginTop: '8px',
                          width: '50vw',
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
                </MDBCol>
              </MDBRow>
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
