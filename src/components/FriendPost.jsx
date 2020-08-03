import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import { Link } from 'react-router-dom';
import moment from 'moment';
import firebase from '../firebase';
import HamburgerFriend from './HamburgerFriend';
import { useSelector } from 'react-redux';
moment().format()

export default function FriendPost(props) {
  const user = useSelector(state => state.user)
  let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

  const db = firebase.firestore();

  function handleIncrement() {
    db.collection('Feed').doc(props.data.docId).set({
      Likes: props.data.Likes + 1,
    }, { merge: true })
  }

  return (
    <MDBJumbotron>
      <div className='mb-4' style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '-10px' }}>
        <HamburgerFriend />
        {props.data.SenderID === user.uid && <button onClick={() => props.delete(props.data.docId)}>X</button>}
      </div>
      <div className="news d-flex justify-content-center">
        <div className="label">
          <img
            src={props.data.Avatar ? props.data.Avatar : defaultDogImg}
            alt=""
            className="rounded-circle z-depth-1-half"
            style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto' }}
          />
          <img
            src={props.data.DogAvatar ? props.data.DogAvatar : defaultDogImg}
            alt=""
            className="rounded-circle z-depth-1-half"
            style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto', marginLeft: '-15px' }}
          />
        </div>
        <div className="excerpt ml-4">
          <div className="brief">
            <div><Link to={`/user/${props.data.FriendID}`}>{props.data.FriendName}</Link> added <Link to={`/user/${props.data.DogID}`}>{props.data.DogName}</Link> as a friend</div>
            <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
          </div>
          <div className="feed-footer">
            <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like mt-2">
              <MDBIcon icon="heart" />
              <span> {props.data.Likes} </span> likes
            </button>
          </div>
        </div>
      </div>
    </MDBJumbotron>
  )
}
