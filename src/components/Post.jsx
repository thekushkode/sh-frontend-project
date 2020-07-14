import React from 'react'
import { MDBIcon } from "mdbreact";

export default function Post(props) {
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
                        {props.data.Sender}
                    </a> posted on her page
                    <div className="date">{props.data.timestamp}</div>
                </div>
                <div className="added-text">
                    {props.data.Content}
                </div>
                <div className="feed-footer">
                    <a href="#!" className="like">
                        <MDBIcon icon="heart" />
                        <span>7 likes</span>
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