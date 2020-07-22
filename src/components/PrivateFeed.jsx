import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { setPrivateFeed } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import Post from "./Post";
import FriendPost from "./FriendPost";
import PhotoPost from "./PhotoPost";


export default function PrivateFeed(props) {

    // const db = firebase.firestore();
    // const dispatch = useDispatch();
    // const feed = useSelector(state => state.feed)
    // const user = useSelector(state => state.user)

    // useEffect(() => {
    //     db.collection('Feed').orderBy("timestamp", "desc").limit(100).onSnapshot(
    //         querySnapshot => {
    //             let feed = [];
    //             querySnapshot.forEach(function (doc) {
    //                 const feedData = {
    //                     ...doc.data(),
    //                     docId: doc.id
    //                 }
    //                 feed.push(feedData);
    //             })
    //             dispatch(setFeed(feed))
    //         });
    // }, [])


    // return (
    //     <div>
    //         <main>
    //             <MDBRow>
    //                 <MDBCol>
    //                     {feed && feed.map((item, index) => {
    //                         {
    //                             if (item.FriendID === props.location.slice(props.location.length - 20, props.location.length)) {
    //                                 { console.log(props.location.slice(props.location.length - 20, props.location.length)) }
    //                                 { console.log(item.FriendID) }
    //                                 switch (item.Type) {
    //                                     case 'Post':
    //                                         return <Post data={item} />
    //                                     case 'Friend':
    //                                         return <FriendPost data={item} />
    //                                     case 'Photo':
    //                                         return <PhotoPost data={item} />
    //                                     default:
    //                                         break;
    //                                 }
    //                             }
    //                         }
    //                     })}
    //                 </MDBCol>
    //             </MDBRow>
    //         </main>
    //     </div>
    // )

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const privateFeed = useSelector(state => state.privateFeed)
    const id = props.location.slice(props.location.length - 20)

    useEffect(() => {
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
                dispatch(setPrivateFeed(privateArray))
            });
    }, [])


    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                        {privateFeed && privateFeed.map((item, index) => {
                            {if (item.FriendID === props.location.slice(props.location.length - 20, props.location.length)) {
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
                            }}
                        })}
                    </MDBCol>
                </MDBRow>
            </main>
        </div>
    )
}