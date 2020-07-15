import React from 'react'
import { MDBIcon } from "mdbreact";
import moment from 'moment';
moment().format()

export default function FriendPost(props) {
  return (
    <div className="news">
      <div className="label">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" alt="" className="rounded-circle z-depth-1-half" />
      </div>
      <div className="excerpt">
        <div className="brief">
          <div><a href="#!" className="name">{props.data.Sender}</a> added you as a friend</div>
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
    // <div>
    //   <p>{props.data.Content}</p>
    //   <p>{props.data.Sender}</p>
    // </div>
  )
}
