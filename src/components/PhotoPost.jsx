import React from 'react'
import { MDBIcon } from "mdbreact";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../redux/actions';

moment().format()

export default function PhotoPost(props) {

  const feed = useSelector(state => state.feed)
  const dispatch = useDispatch();
  let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

  function handleClick() {
    // console.log('hello world')
    let likes = parseInt(feed[3].Likes)
    console.log(likes)
    likes = likes + 1
    console.log(likes)
    dispatch(setFeed(likes))
  }

  return (
    <div className="news">
      <div className="label">
        <img
          src={props.data.avatar ? props.data.avatar : defaultDogImg}
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
          <a href="#!" className="like">
            <MDBIcon icon="heart" onClick={() => handleClick()} />
            <span> {props.data.Likes} </span>likes
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
