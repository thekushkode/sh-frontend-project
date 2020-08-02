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

    const deletePost = (id) => {
        console.log(`About to delete post id ${id}`)
        db.collection('Feed').doc(id).delete().then(console.log(`Document ${id} deleted`))
    }


    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                        {console.log(privateFeed)}
                        {privateFeed && privateFeed.map((item, index) => {
                            if (item.FriendID === props.location.slice(props.location.length - 20, props.location.length)) {
                                switch (item.Type) {
                                    case 'Post':
                                        return <Post data={item} key={index} />
                                    case 'Friend':
                                        return <FriendPost data={item} key={index} delete={(val) => deletePost(val)} />
                                    case 'Photo':
                                        return <PhotoPost data={item} key={index} />
                                    default:
                                        return <></>;
                                }
                            }
                        })}
                    </MDBCol>
                </MDBRow>
            </main>
        </div>
    )
}