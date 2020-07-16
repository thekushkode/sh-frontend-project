import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import moment from 'moment';
import firebase from '../firebase';
moment().format()

export default function FriendPost(props) {
 let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'
 
  const db = firebase.firestore();

  function handleIncrement() {
    db.collection('Feed').doc(props.data.docId).set({
        Likes: props.data.Likes + 1,
    }, {merge: true})

} 
  
  return (
    <MDBJumbotron>
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
            <div><a href={`/profile/${props.data.FriendID}`}>{props.data.FriendName}</a> and <a href={`/user/${props.data.DogID}`}>{props.data.DogName}</a></div>
            <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
          </div>
          <div className="feed-footer">
            <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like">
              <MDBIcon icon="heart" />
              <span> {props.data.Likes} </span> likes
            </button>
          </div>
        </div>
      </div>
    </MDBJumbotron>
  )
}
