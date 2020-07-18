import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import GoogleAd from "./GoogleAd";
//import AdSense from 'react-adsense';
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
        console.log(id)
        db.collection('Feed').where('FriendID', '==', `${id}`).orderBy("timestamp", "desc").limit(10).onSnapshot(
            querySnapshot => {
                let privateArray = [];
                querySnapshot.forEach(function (doc) {
                    const feedData = {
                        ...doc.data(),
                        docId: doc.id
                    }
                    privateArray.push(feedData);
                })
                console.log(privateArray)
                dispatch(setPrivateFeed(privateArray))
            });
    }, [])


    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol>
                        {privateFeed && privateFeed.map((item, index) => {

                            // if (item.FriendID === props.location.slice(props.location.length - 20, props.location.length)) {
                            //     { console.log(props.location.slice(props.location.length - 20, props.location.length)) }
                            //     { console.log(item.FriendID) }
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