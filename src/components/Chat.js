import React, { useEffect } from 'react';
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

const Chat = () => {
  const db = firebase.firestore();
  const [allMessages, setAllMessages] = React.useState({});
  const [currentChat, setCurrentChat] = React.useState('')

  useEffect(() => {
    db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').get()
      .then(res => {
        console.log(res.data())
        setAllMessages(res.data());
      })

    // db.collection('Message').doc('0y0bZo5QnIQp4b0SJbE2')
    //   .onSnapshot(snapshot => {
    //     Object.keys(snapshot).forEach((doc) => console.log(doc))
    //   })
  }, [])



  const messages = Object.keys(allMessages).length && Object.keys(allMessages).map((item) => {
    return (
      <ChatListItem id={item} messages={allMessages[item]}></ChatListItem>
    )
  })

  console.log(allMessages)
  return (
    <div>
      <header style={{ marginBottom: '100px' }}>
        <NavbarPage />
      </header>
      <div id='chat' className='m-4'>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol lg='4'>
              <MDBInput type='text' icon='search' label='Search Message' />
              <MDBListGroup>
                {messages.length && messages.map((item) => <>{item}</>)}
                <a href='#!'>
                  <MDBListGroupItem hover active>
                    <MDBAvatar
                      src='https://mdbootstrap.com/img/Photos/Avatars/adach.jpg'
                      alt='User mugshot'
                      tag='img'
                      className='float-left mr-3'
                    />
                    <div className='d-flex justify-content-between mb-1 '>
                      <span className='mb-1'>
                        <strong>Dawid Adach</strong>
                      </span>
                      <small>13 July</small>
                    </div>
                    <p className='text-truncate'>
                      <strong>You: </strong> Donec id elit non mi porta gravida at
                    eget metus. Maecenas sed diam eget risus varius blandit.
                  </p>
                  </MDBListGroupItem>
                </a>
              </MDBListGroup>
            </MDBCol>

            <MDBCol lg='8' className='mt-lg-0 mt-5'>
              <div className='border border-dark p-4'>
                <MessagesWindow />
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

                <div className='row'>
                  <div className='col-md-12'>
                    <div className='d-flex flex-row'>
                      <MDBInput
                        type='textarea'
                        containerClass='chat-message-type'
                        label='Type your message'
                        rows='2'
                      />
                      <div className='mt-5'>
                        <a
                          className='btn btn-primary btn-lg waves-effect waves-light'
                          href='#!'
                        >
                          Send
                      </a>
                      </div>
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
