import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import moment from 'moment';
import Ike from './images/ike.png';
import firebase from '../firebase';
moment().format()

export default function Post(props) {

    //const dispatch = useDispatch();
    const db = firebase.firestore();


    function handleIncrement() {
        db.collection('Feed').doc(props.data.docId).set({
            Likes: props.data.Likes + 1,
        }, {merge: true})
        //dispatch(increment(props.data.docId));
    }


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
                            <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like">
                                <MDBIcon icon="heart" />
                                <span> {props.data.Likes} </span> likes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MDBJumbotron>
    )
}