import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import { useSelector } from 'react-redux';
import moment from 'moment';
import Ike from './images/ike.png';
moment().format()

export default function Post(props) {
    // const feed = useSelector(state => state.feed)

    return (
        <MDBJumbotron>
            <div className='d-flex'>
                <div className='w-30'>
                    <img
                        src={Ike}
                        alt=""
                        className="rounded-circle z-depth-1-half"
                        width='100'
                    />
                </div>
                <div className='w-80 ml-5'>
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

        // <div>
        //     <p>{props.data.Content}</p>
        //     <p>{props.data.Sender}</p>
        // </div>   
    )
}