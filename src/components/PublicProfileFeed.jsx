import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { setPrivateFeed } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import Post from "./Post";
import FriendPost from "./FriendPost";
import PhotoPost from "./PhotoPost";


export default function PublicProfileFeed(props) {

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const id = props.location.slice(props.location.length - 20)
    let array = []

    useEffect(() => {
        db.collection('Feed').where('DogID', '==', `${id}`).orderBy("timestamp", "desc").onSnapshot(
            querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    const feedData = {
                        ...doc.data(),
                        docId: doc.id
                    }
                    array.push(feedData);
                })
            });
    }, [])

    console.log(array)
    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                        {array.map((item, index) => {
                            // {if (item.FriendID === props.location.slice(props.location.length - 20, props.location.length)) {
                            switch (item.Type) {
                                case 'Post':
                                    return <Post data={item} key={index} />
                                case 'Friend':
                                    return <FriendPost data={item} key={index} />
                                case 'Photo':
                                    return <PhotoPost data={item} key={index} />
                                default:
                                    return <></>;
                            }
                            // }}
                        })}
                    </MDBCol>
                </MDBRow>
            </main>
        </div>
    )
}