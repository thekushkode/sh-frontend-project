import React from 'react'
import { MDBIcon } from "mdbreact";

export default function PhotoPost(props) {
  return (
    <div className="news">
      <div className="label">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg"
          alt=""
          className="rounded-circle z-depth-1-half"
        />
      </div>
      <div className="excerpt">
        <div className="brief">
          <a href="#!" className="name">
            {props.data.Sender}</a> added 
          <a href="#!">2 new photos</a>
          <div className="date">{props.data.timestamp}</div>
        </div>
        <div className="added-images">
          <img
            src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
            alt=""
            className="z-depth-1 rounded mb-md-0 mb-2"
          />
          <img
            src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
            alt=""
            className="z-depth-1 rounded"
          />
        </div>
        <div className="feed-footer">
          <a href="#!" className="like">
            <MDBIcon icon="heart" />
            <span>18 likes</span>
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
