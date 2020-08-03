import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
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

    const adForFeed = {
        Avatar: "https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/8cy3jc8atc0000000000.jpeg?alt=media",
        Content: "add from Social Hound",
        Likes: 0,
        SenderName: "Social Hound",
        FriendID: 'null',
        SenderID: 'null',
        DogID: 'null',
        Type: 'Post',
        // timestamp: new Date(),
        feedImgURL: 'null',
    }

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
                }
                )
                feed.map((item, index) => index % 7 === 0 && index !== 0 && feed.splice(index, 0, adForFeed))
                dispatch(setFeed(feed))
            });
    }, [])


    return (

        <MDBCol md='8' className='overflow-auto' style={{ height: '1530px' }}>
            {feed && feed.map((item) => {
                switch (item.Type) {
                    case 'Post':
                        return <Post data={item} />
                    // case 'Friend':
                    //     return <FriendPost data={item} />
                    case 'Photo':
                        return <PhotoPost data={item} />
                    default:
                        return <></>;
                }
            })}
        </MDBCol>

    )
}
