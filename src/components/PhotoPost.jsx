import React from 'react'
import { MDBIcon } from "mdbreact";
import moment from 'moment';
import firebase from '../firebase';
import { useSelector } from 'react-redux';

moment().format()

export default function PhotoPost(props) {
  const user = useSelector(state => state.user)

  const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'
  const db = firebase.firestore();

  function handleIncrement() {
    db.collection('Feed').doc(props.data.docId).set({
      Likes: props.data.Likes + 1,
    }, { merge: true })
  }


  return (
    <div className="news">
      <div className="label">
        <img
          src={props.data.Avatar ? props.data.Avatar : defaultDogImg}
          alt=""
          className="rounded-circle z-depth-1-half"
          style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '0 auto' }}
        />
      </div>
      <div className="excerpt">
        <div className="brief">
          <a href="#!" className="name">
            {props.data.Sender}</a> added
          <a href="#!"> 2 new photos</a>
          <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
        </div>
        <div className="added-images">
          <img
            src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
            alt=""
            className="z-depth-1 rounded mb-md-0 mb-2 w-50 h-50"
          />
          <img
            src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
            alt=""
            className="z-depth-1 rounded w-50 h-50"
          />
        </div>
        <div className="feed-footer">
          <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like">
            <MDBIcon icon="heart" />
            <span> {props.data.Likes} </span>likes
          </button>
        </div>
      </div>
    </div>
  )
}
