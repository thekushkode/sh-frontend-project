import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setFeed } from '../redux/actions/index';
import { MDBGallery, MDBGalleryList } from 'mdbreact';
import FooterPage from './Footer';

function HashGallery(props) {

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed)
    const user = useSelector(state => state.user)
    // Need to map through photos, render photos based on hashtag value ---> /hashtags/motivationmonday 

    // useEffect(() => {
    //     console.log(user)
    //     if (user) {
    //         const db = firebase.firestore();
    //         //let hashPosts = []
    //         db.collection('Feed').where('Type', '==', 'Post')
    //             // .get()
    //             .onSnapshot(function (querySnapshot) {
    //                 console.log(querySnapshot);
    //                 let hashArray = [];
    //                 // querySnapshot.forEach(function (doc) {
    //                 //     hashArray.push({})
    //                 // })
    //             })

    //     }
    // })

    useEffect(() => {
        db.collection('Feed').orderBy("timestamp", "desc").limit(30).onSnapshot(
            querySnapshot => {
                let feedArray = [];
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data())
                    const feedData = {
                        ...doc.data(),
                        docId: doc.id
                    }
                    console.log(feedData);
                    feedArray.push(feedData);
                    console.log(feedArray);
                })
                dispatch(setFeed(feedArray))
            });
    }, [])

    const dataImg = [
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg',
            cols: 1,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(72).jpg',
            cols: 2,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(71).jpg',
            cols: 1,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(74).jpg',
            cols: 2,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(75).jpg',
            cols: 2,
            title: 'image',
        },

        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(78).jpg',
            cols: 1,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(77).jpg',
            cols: 2,
            title: 'image',
        },
        {
            img:
                'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(79).jpg',
            cols: 1,
            title: 'image',
        }
    ];

    return (
        <>
            <header style={{ marginBottom: '80px' }}>
            </header>
            <main>
                <MDBGallery cols={4}>
                    {dataImg.map(({ cols, img, title }, i) => { //replace dataImg with feedArray
                        return (
                            <MDBGalleryList
                                key={i}
                                cols={cols || 1}
                                titleClasses='rounded'
                                styles={{ boxShadow: '0 0 3px rgba(0,0,0, .3)' }}
                            >
                                <img src={img} alt={title} />
                            </MDBGalleryList>
                        );
                    })}
                </MDBGallery>
            </main>
            <FooterPage />
        </>
    );
}

export default HashGallery;