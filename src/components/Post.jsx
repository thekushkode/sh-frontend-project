import React from 'react'
import { MDBIcon, MDBJumbotron } from "mdbreact";
import { Link } from 'react-router-dom'
import moment from 'moment';
import ModalImage from "react-modal-image";
import firebase from '../firebase';
import { Modal } from 'antd';
moment().format()

export default function Post(props) {

    let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'
    const db = firebase.firestore();

    function handleIncrement() {
        db.collection('Feed').doc(props.data.docId).set({
            Likes: props.data.Likes + 1,
        }, { merge: true })
    }

    if (props.data.feedImgURL) {
        return (
            <MDBJumbotron>
                <div className='news'>
                    <div className="excerpt ml-4 d-flex justify-content-between">
                        <div className='label m-auto align-items-start h-100 mt-0 col-4'>
                            <img
                                src={props.data.Avatar ? props.data.Avatar : defaultDogImg}
                                alt=""
                                className="rounded-circle z-depth-1-half"
                                style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto' }}
                            />
                            <div className="brief">
                                <Link to={`/user/${props.data.DogID}`} className="name">
                                    {props.data.SenderName}
                                </Link> posted a new photo
                        <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
                            </div>
                        </div>
                        <div className="added-text my-2 m-auto col-8 align-items-center">
                            <h6><strong>{props.data.Content}</strong></h6>
                            {<ModalImage small={props.data.feedImgURL} large={props.data.feedImgURL} style={{ width: '350px', borderRadius: '25px' }} />}
                            <div className="feed-footer">
                                <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like mt-2">
                                    <MDBIcon icon="heart" />
                                    <span> {props.data.Likes} </span> likes
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBJumbotron>
        )
    } else {
        return (
            <MDBJumbotron>
                <div className='news d-flex justify-content-center'>
                    <div className='label mt-2'>
                        <img
                            src={props.data.Avatar ? props.data.Avatar : defaultDogImg}
                            alt=""
                            className="rounded-circle z-depth-1-half"
                            style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto' }}
                        />
                    </div>
                    <div className="excerpt ml-4">
                        <div className="brief">
                            <Link to={`/user/${props.data.DogID}`} className="name">
                                {props.data.SenderName}
                            </Link> posted on their page
                        </div>
                        <div className="added-text my-2">
                            <h6><strong>{props.data.Content}</strong></h6>
                        </div>
                        <div className="date">- {moment(props.data.timestamp.toDate()).fromNow()}</div>
                        <div className="feed-footer">
                            <button onClick={handleIncrement} style={{ border: 'none', color: 'red' }} className="like mt-2">
                                <MDBIcon icon="heart" />
                                <span> {props.data.Likes} </span> likes
                            </button>
                        </div>
                    </div>
                </div>
            </MDBJumbotron>
        )
    }
}