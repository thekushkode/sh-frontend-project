import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import { MDBJumbotron, MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom'
import moment from 'moment';
import ModalImage from "react-modal-image";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
moment().format()


export default function PrivateFeed(props) {

  const db = firebase.firestore();
  const dispatch = useDispatch();
  const lostDog = useSelector(state => state.lostDog)
  const id = props.location.slice(props.location.length - 20)
  let lostArray = [];
  
  useEffect(() => {
    db.collection('Lost').orderBy("timestamp", "desc").limit(10).onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(function (doc) {
          const feedData = {
            ...doc.data(),
            docId: doc.id
          }
          lostArray.push(feedData);
        })
        // dispatch(setPrivateFeed(lostArray))
      });
  }, [])


  return (
    <div>
      <main>
        <MDBRow>
          <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
            {lostArray && lostArray.map((item, index) => {
              return (
                <MDBJumbotron>
                  <div className='news'>
                    <div className="excerpt ml-4 d-flex justify-content-between">
                      <div className='label m-auto align-items-start h-100 mt-0 col-4'>
                        <img
                          src={item.Avatar}
                          alt=""
                          className="rounded-circle z-depth-1-half"
                          style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto' }}
                        />
                        <div className="brief">
                          <Link to={`/user/${item.DogID}`} className="name">
                            {item.SenderName}
                          </Link> posted a new photo
                      <div className="date">- {moment(item.timestamp.toDate()).fromNow()}</div>
                        </div>
                      </div>
                      <div className="added-text my-2 m-auto col-8 align-items-center">
                        <h6><strong>{item.Content}</strong></h6>
                        {<ModalImage small={item.feedImgURL} large={item.feedImgURL} style={{ width: '350px', borderRadius: '25px' }} />}
                        <div className="feed-footer">
                        </div>
                        <MDBContainer className='mt-2'>
                          <FacebookShareButton url={`https://www.socialhound.co/user/${item.DogID}`} quote={item.content}>
                            <FacebookIcon className='mr-1' size={32} round />
                          </FacebookShareButton>
                          <TwitterShareButton url={`localhost:3000/user/${item.DogID}`} title={item.content}>
                            <TwitterIcon className='mr-1' size={32} round />
                          </TwitterShareButton>
                          <EmailShareButton url={`localhost:3000/user/${item.DogID}`} subject={`Email from ${item.SenderName}`}>
                            <EmailIcon className='mr-1' size={32} round />
                          </EmailShareButton>
                        </MDBContainer>
                      </div>
                    </div>
                  </div>
                </MDBJumbotron>
              )
            }
            )}
          </MDBCol>
        </MDBRow>
      </main>
    </div>
  )
}