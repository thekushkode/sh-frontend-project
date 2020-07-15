import React from 'react'
import { MDBIcon } from "mdbreact";
import { useSelector } from 'react-redux';
import moment from 'moment';
moment().format()

export default function Post(props) {
    // const feed = useSelector(state => state.feed)

    return (
        <div className="news">
            <div className="label">
                <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
                    alt=""
                    className="rounded-circle z-depth-1-half"
                />
            </div>
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
        // <div>
        //     <p>{props.data.Content}</p>
        //     <p>{props.data.Sender}</p>
        // </div>   
    )
}