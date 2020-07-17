import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import GoogleAd from "./GoogleAd";
//import AdSense from 'react-adsense';
import { setFeed } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import Post from "./Post";
import FriendPost from "./FriendPost";
import PhotoPost from "./PhotoPost";

export default function SocialPage2() {

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed)

    useEffect(() => {
        db.collection('Feed').orderBy("timestamp", "desc").limit(20).onSnapshot(
            querySnapshot => {
                let feed = [];
                querySnapshot.forEach(function (doc) {
                    const feedData = {
                        ...doc.data(),
                        docId: doc.id
                    }
                    feed.push(feedData);
                })
                dispatch(setFeed(feed))
            });
    }, [])


    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1100px' }}>
                        {feed && feed.map((item, index) => {
                            switch (item.Type) {
                                case 'Post':
                                    return <Post data={item} />
                                case 'Friend':
                                    return <FriendPost data={item} />
                                case 'Photo':
                                    return <PhotoPost data={item} />
                                default:
                                    break;
                            }
                        })}
                    </MDBCol>
                </MDBRow>
            </main>
        </div>
    )
}