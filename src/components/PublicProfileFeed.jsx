import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { setUserFeed } from '../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase';
import Post from "./Post";
import FriendPost from "./FriendPost";
import PhotoPost from "./PhotoPost";


export default function PublicProfileFeed(props) {

  const db = firebase.firestore();
  const dispatch = useDispatch();
  const userFeed = useSelector(state => state.userFeed)
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
              dispatch(setUserFeed(privateArray))
          });
  }, [])

  
    return (
        <div>
            <main>
                <MDBRow>
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                    {userFeed && userFeed.map((item, index) => {
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