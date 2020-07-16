import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import moment from 'moment';
moment().format()

export default function FriendPost(props) {
  return (
    <MDBJumbotron>
      <div className="news">
        <div className="label">
          <img
            src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
            alt=""
            className="rounded-circle z-depth-1-half"
            style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '0 auto' }}
          />
        </div>
        <div className="excerpt">
          <div className="brief">
            <div>{props.data.Content}</div>
            <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
          </div>
          <div className="feed-footer">
            <a href="#!" className="like">
              <MDBIcon icon="heart" />
              <span> {props.data.Likes} </span> likes
            </a>
          </div>
        </div>
      </div>
    </MDBJumbotron>
  )
}
