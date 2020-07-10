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
  MDBBadge,
  MDBAvatar
} from 'mdbreact';

import firebase from '../firebase';
import ChatListItem from './messages/ChatListItem'
import './Chat.css';
import NavbarPage from './Nav';
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
      db.collection("Messages")
        .where("members", "array-contains", user.id)
        .get()
        .then(function (querySnapshot) {
          let dataArray = []
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, doc.data())
            dataArray.push({ id: doc.id, data: doc.data() })
          })
          setAllMessages(dataArray)
        })
    }
  }, [db, user])

  function changeInput(value) {
    setChatInput(value);
  }

  function submitMessage() {
    let allNewMessages = [...reduxMessages.data.messages,
    {
      message: chatInput,
      timeStamp: Date.now(),
      sender: user.data.displayName
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




  const messages = allMessages && Object.keys(allMessages).length && allMessages.map((item) => {
    return (
      <ChatListItem id={item} messages={allMessages[item]}></ChatListItem>
    )
  })

  const ROOT_CSS = css({
    height: 600,
    width: 600
  });

  return (
    <div>
      <header style={{ marginBottom: '100px' }}>
      </header>
      <div id='chat' className='m-4'>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol lg='4'>
              <MDBInput type='text' icon='search' label='Search Messages' containerClass="text-left" />
              <MDBListGroup>
                {messages && messages.map((item) => <>{item}</>)}
                <a href='#!'>
                  <MDBListGroupItem hover>
                    <MDBAvatar
                      src='https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default.jpg?alt=media'
                      alt='User Profile - Logan'
                      tag='img'
                      className='float-left mr-3'
                    />
                    <div className='d-flex justify-content-between mb-1 '>
                      <span className='mb-1'>
                        <strong>Gerrit</strong>
                      </span>
                      <small>Jul 13</small>
                    </div>
                    <p className='text-truncate' style={{ textAlign: "left" }}>
                      Hey, I see that you too are a dog dad!  Do you think that your dog and my dog would want to ...
                  </p>
                  </MDBListGroupItem>
                </a>
                <a href='#!'>
                  <MDBListGroupItem hover style={{ background: 'none', backgroundColor: 'none', borderColor: 'rgba(0,0,0,0.125) !important', border: '1px rgba(0,0,0,0.125) !important', color: '#495057' }}>
                    <MDBAvatar
                      src={imgRef}
                      alt='User Profile - Logan'
                      tag='img'
                      className='float-left mr-3'
                    />
                    <div className='d-flex justify-content-between mb-1'>
                      <span className='mb-1'>
                        <strong>Rob</strong>
                      </span>
                      <small>Jul 10</small>
                    </div>
                    <p className='text-truncate' style={{ textAlign: "left" }}>
                      Yo Bro!  I've got a friendly Rottweiler...
                  </p>
                  </MDBListGroupItem>
                </a>
              </MDBListGroup>
            </MDBCol>

            <MDBCol lg='8' className='mt-lg-0 mt-5'>
              <div className='border border-dark py-4'>
                <ScrollToBottom className={ROOT_CSS}>
                  <MessagesWindow />
                </ScrollToBottom>
                {/* <div className='text-center'>
                  <small>16 July, 23:54</small>
                </div>
                <div className='d-flex justify-content-end'>
                  <p className='primary-color rounded p-3 text-white w-75 '>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestiae modi exercitationem dignissimos repellat, voluptas
                    iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                    fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
                </div>

                <div className='text-center'>
                  <small>16 July, 23:55</small>
                </div>
                <div className='d-flex justify-content-start media'>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />

                  <p className='grey lighten-3 rounded p-3 w-75'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestiae modi exercitationem dignissimos repellat, voluptas
                    iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                    fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
                </div>

                <div className='text-center'>
                  <small>16 July, 23:56</small>
                </div>
                <div className='d-flex justify-content-start media'>
                  <MDBAvatar
                    src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                    alt='User mugshot'
                    tag='img'
                    className='float-left mr-3'
                  />
                  <p className='grey lighten-3 rounded p-3 w-75'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestiae modi exercitationem dignissimos repellat, voluptas
                    iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                    fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
                </div>

                <div className='text-center'>
                  <small>16 July, 23:54</small>
                </div>
                <div className='d-flex justify-content-end'>
                  <p className='primary-color rounded p-3 text-white w-75 '>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestiae modi exercitationem dignissimos repellat, voluptas
                    iure quod aliquid voluptatem perspiciatis quidem sit eos, cum
                    fugit voluptatibus quos laboriosam sed tenetur voluptate!
                </p>
                </div> */}

              </div>

              <div className='row'>
                <div className='col-md-12'>
                  <div className='d-flex flex-row'>
                    <MDBInput
                      type='textarea'
                      containerClass='chat-message-type'
                      label='Type your message'
                      rows='2'
                      value={chatInput}
                      onChange={(e) => changeInput(e.target.value)}
                    />
                    <div className='mt-5'>
                      <a
                        className='btn btn-primary btn-lg waves-effect waves-light'
                        href='#!'
                        onClick={() => submitMessage()}
                      >
                        Send
                      </a>
                    </div>
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
    </div>
  );
};

export default Chat;
