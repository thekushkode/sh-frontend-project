import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import moment from 'moment';
import firebase from '../firebase';
moment().format()

export default function FriendPost(props) {

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
          <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" alt="" className="rounded-circle z-depth-1-half" />
        </div>
        <div className="excerpt">
          <div className="brief">
            <div>{props.data.Content}</div>
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
