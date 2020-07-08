import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { loadMessages } from '../redux/actions/index.js'
import { useDispatch } from 'react-redux';


const Chat = () => {
  const db = firebase.firestore();
  let dispatch = useDispatch();
  const [allMessages, setAllMessages] = React.useState({});
  const [chatInput, setChatInput] = React.useState('')
  const reduxMessages = useSelector(state => state.messages)

  useEffect(() => {
    // db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').get()
    //   .then(res => {
    //     console.log(res.data())
    //     setAllMessages(res.data());
    //   })

    db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2')
      .onSnapshot((snapshot) => {
        setAllMessages(snapshot.data());
        // dispatch(loadMessages(snapshot.data()))
      })
  }, [])

  function changeInput(value) {
    setChatInput(value);
  }

  function submitMessage() {
    db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').update({
      'eSoolOZFcrpniMgINzq1':
        [...reduxMessages, { message: chatInput, timeStamp: Date.now(), sender: 'jerrySeinfeld' }]
    })
    dispatch(loadMessages([...reduxMessages, { message: chatInput, timeStamp: Date.now(), sender: 'jerrySeinfeld' }]
    ))
    setChatInput('')
  }


  const messages = Object.keys(allMessages).length && Object.keys(allMessages).map((item) => {
    return (
      <ChatListItem id={item} messages={allMessages[item]}></ChatListItem>
    )
  })

  return (
    <div>
      <header style={{ marginBottom: '100px' }}>
        <NavbarPage />
      </header>
      <div id='chat' className='m-4'>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol lg='4'>
              <MDBInput type='text' icon='search' label='Search Messages' containerClass="text-left"/>
              <MDBListGroup>
                {messages.length && messages.map((item) => <>{item}</>)}
                <a href='#!'>
                  <MDBListGroupItem hover active>
                    <MDBAvatar
                      src='https://avatars0.githubusercontent.com/u/26091324?s=460&u=6eeeb5f4240af272f7f35e2197630ecb07195148&v=4'
                      alt='User Profile - Logan'
                      tag='img'
                      className='float-left mr-3'
                    />
                    <div className='d-flex justify-content-between mb-1 '>
                      <span className='mb-1'>
                        <strong>Logan</strong>
                      </span>
                      <small>Jul 13</small>
                    </div>
                    <p className='text-truncate' style={{textAlign: "left"}}>
                    Hey, I see that you too are a dog dad!  Do you think that your dog and my dog would want to ...
                  </p>
                  </MDBListGroupItem>
                </a>
                <a href='#!'>
                  <MDBListGroupItem hover active style={{background: 'none', backgroundColor: 'none', borderColor: 'rgba(0,0,0,0.125) !important', border: '1px rgba(0,0,0,0.125) !important', color: '#495057'}}>
                    <MDBAvatar
                      src='https://avatars3.githubusercontent.com/u/60439987?s=400&u=e190fc8437480d708e1dae41861555aca792716e&v=4'
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
                    <p className='text-truncate' style={{textAlign: "left"}}>
                    Yo Bro!  I've got a friendly Rottweiler...
                  </p>
                  </MDBListGroupItem>
                </a>
              </MDBListGroup>
            </MDBCol>

            <MDBCol lg='8' className='mt-lg-0 mt-5'>
              <div className='border border-dark p-4' style={{ overflowY: 'auto', maxHeight: '75vh' }}>
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
