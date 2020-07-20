import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { setPrivateFeed } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import Post from "./Post";
import FriendPost from "./FriendPost";
import PhotoPost from "./PhotoPost";


export default function PrivateFeed(props) {

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const privateFeed = useSelector(state => state.privateFeed)
    const id = props.location.slice(props.location.length - 20)

    useEffect(() => {
        db.collection('Feed').where('DogID', '==', `${id}`).orderBy("timestamp", "desc").limit(10).onSnapshot(
            querySnapshot => {
                let privateArray = [];
                querySnapshot.forEach(function (doc) {
                    const feedData = {
                        ...doc.data(),
                        docId: doc.id
                    }
                    privateArray.push(feedData);
                })
                dispatch(setPrivateFeed(privateArray))
            });
    }, [])


    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                        {privateFeed && privateFeed.map((item, index) => {
                            switch (item.Type) {
                                case 'Post':
                                    return <Post data={item} key={index} />
                                case 'Friend':
                                    return <FriendPost data={item} key={index} />
                                case 'Photo':
                                    return <PhotoPost data={item} key={index} />
                                default:
                                    break;
                            }
                        }
                        )}
                    </MDBCol>
                </MDBRow>
            </main>
        </div>
    )
}