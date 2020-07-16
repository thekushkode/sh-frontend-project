import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import { useSelector } from 'react-redux';
import moment from 'moment';
moment().format()

export default function Post(props) {
    // const feed = useSelector(state => state.feed)
    let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

    return (
        <MDBJumbotron>
            <div className=''>
                <div className='w-30'>
                    <img
                        src={props.data.avatar ? props.data.avatar : defaultDogImg}
                        alt=""
                        className="rounded-circle z-depth-1-half"
                        style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '0 auto' }}
                    />
                </div>
                <div className='w-80'>
                    <div className="excerpt">
                        <div className="brief">
                            <a href="#!" className="name">
                                {props.data.SenderName}
                            </a> posted on their page
                        </div>
                        <div className="added-text">
                            {props.data.Content}
                        </div>
                        <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
                        <div className="feed-footer">
                            <a href="#!" className="like">
                                <MDBIcon icon="heart" />
                                <span> {props.data.Likes} </span> likes
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MDBJumbotron>
    )
}