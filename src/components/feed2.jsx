// import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
//import FooterPage from "./Footer";
import GoogleAd from "./GoogleAd";
//import AdSense from 'react-adsense';

import React, { useEffect } from 'react'
import firebase from '../firebase';
import Post from "./Post";

export default function SocialPage2() {

    // <allMessages> state variable, initialized to an empty object {}
    // <stuff> state variable, initialized to an empty string ''
    const [allFeedContent, setAllFeedContent] = React.useState([]);
    // const [stuff, setStuff] = React.useState('');

    const db = firebase.firestore();

    useEffect(() => {
        // db.collection('Messages').doc('0y0bZo5QnIQp4b0SJbE2').update({
        //     'eSoolOZFcrpniMgINzq1':
        //         [...currentMessages, newMessage]
        // }).then(res => {
        //     return console.log(res)
        // })

        db.collection('Feed').doc('s8WggZvXWEZRiMfnaxBq').get()
            .then(res => {
                console.log(res.data())
                setAllFeedContent(res.data().posts);
            })

        // find dogs where the owner = 'uid'
        // db.collection("Dogs")
        //     .where("ownerId", "==", "wV4u772G0cRAEoOXK5NMweIWi8w2")
        //     .get()
        //     .then(function (querySnapshot) {
        //         let data;
        //         querySnapshot.forEach(function (doc) {
        //             data = doc.data();
        //         })
        //         setStuff(data);
        //     })

    }, [])

    return (
        <div style={{ marginTop: '200px' }}>
            {allFeedContent && allFeedContent.map((item) => {
                switch (item.Type) {
                    case 'Post':
                        return (
                            <Post data={item} />
                        )
                        break;
                    // case 'Friend':
                    //     return (
                    //         <FriendPost data={item} />
                    //     )
                    //     break;
                    // case 'Photo':
                    // return (
                    //     <PhotoPost data={item} />
                    //     )
                    //     break;
                    default:
                        break;
                }
                
            })}
        </div>
    )

    // return (
    //     Object.keys(allFeedContent).length && Object.keys(allFeedContent).map((item) => {
    //         {console.log(allFeedContent[item][0].Content)}
    //         {console.log(item)}
    //         return (
    //             // <Conversation messages={allMessages[item]} />
    //             <div style={{marginTop: '200px'}}>
    //                 <p>{allFeedContent[item][0].Content}</p>
    //                 <p>-{allFeedContent[item][0].Sender}</p>
    //                 {/* <p>posted at: {allFeedContent[item][0].timestamp}</p> */}
    //             </div>
    //         )
    //     })
    // )
    // return (
    //     feed.length && feed[0].map((item) => {
    //         {console.log(feed[item])}
    //         {console.log(item)}
    //         return (
    //             // <Conversation messages={allMessages[item]} />
    //         <p>{item}</p>
    //         )
    //     })
    // )
}


// const SocialPage2 = () => {
//     return (
//         <div>
//             <header style={{ marginBottom: '100px' }}>
//             </header>
//             <main>
//                 <MDBRow>
//                     <MDBCol md={6}>

//                         <MDBCard

//                             className="mb-5 px-5 pt-4 fluid"
//                             style={{ fontWeight: 300, maxWidth: 2000 }}
//                         >
//                             <MDBCardBody className="py-0">
//                                 <MDBRow>
//                                     <div className="mdb-feed">
//                                         <div className="news">
//                                             <div className="label">
//                                                 <img
//                                                     src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
//                                                     alt=""
//                                                     className="rounded-circle z-depth-1-half"
//                                                 />
//                                             </div>
//                                             <div className="excerpt">
//                                                 <div className="brief">
//                                                     <a href="#!" className="name">
//                                                         Spot
//                     </a> added you as a friend
//                     <div className="date">1 hour ago</div>
//                                                 </div>
//                                                 <div className="feed-footer">
//                                                     <a href="#!" className="like">
//                                                         <MDBIcon icon="heart" />
//                                                         <span>5 likes</span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="news">
//                                             <div className="label">
//                                                 <img
//                                                     src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg"
//                                                     alt=""
//                                                     className="rounded-circle z-depth-1-half"
//                                                 />
//                                             </div>
//                                             <div className="excerpt">
//                                                 <div className="brief">
//                                                     <a href="#!" className="name">
//                                                         Heidi
//                     </a> added <a href="#!">2 new photos</a>
//                                                     <div className="date">4 hours ago</div>
//                                                 </div>
//                                                 <div className="added-images">
//                                                     <img
//                                                         src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
//                                                         alt=""
//                                                         className="z-depth-1 rounded mb-md-0 mb-2"
//                                                     />
//                                                     <img
//                                                         src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
//                                                         alt=""
//                                                         className="z-depth-1 rounded"
//                                                     />
//                                                 </div>
//                                                 <div className="feed-footer">
//                                                     <a href="#!" className="like">
//                                                         <MDBIcon icon="heart" />
//                                                         <span>18 likes</span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="news">
//                                             <div className="label">
//                                                 <img
//                                                     src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg"
//                                                     alt=""
//                                                     className="rounded-circle z-depth-1-half"
//                                                 />
//                                             </div>
//                                             <div className="excerpt">
//                                                 <div className="brief">
//                                                     <a href="#!" className="name">
//                                                         Herschel
//                     </a> added you as a friend
//                     <div href="#!" className="date">
//                                                         7 hours ago
//                     </div>
//                                                 </div>
//                                                 <div className="feed-footer">
//                                                     <a href="#!" className="like">
//                                                         <MDBIcon icon="heart" />
//                                                         <span>11 likes</span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="news">
//                                             <div className="label">
//                                                 <img
//                                                     src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
//                                                     alt=""
//                                                     className="rounded-circle z-depth-1-half"
//                                                 />
//                                             </div>
//                                             <div className="excerpt">
//                                                 <div className="brief">
//                                                     <a href="#!" className="name">
//                                                         Wilder
//                     </a> posted on her page
//                     <div className="date">2 days ago</div>
//                                                 </div>
//                                                 <div className="added-text">
//                                                     Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                                                     Vero inventore, iste quas libero eius? Vitae sint neque
//                                                     animi alias sunt dolor, accusantium ducimus, non placeat
//                                                     voluptate.
//                     </div>
//                                                 <div className="feed-footer">
//                                                     <a href="#!" className="like">
//                                                         <MDBIcon icon="heart" />
//                                                         <span>7 likes</span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="news">
//                                             <div className="label">
//                                                 <img
//                                                     src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg"
//                                                     alt=""
//                                                     className="rounded-circle z-depth-1-half"
//                                                 />
//                                             </div>
//                                             <div className="excerpt">
//                                                 <div className="brief">
//                                                     <a href="#!" className="name">
//                                                         Kobe
//                     </a> added <a href="#!"> 2 new photos</a> of you
//                     <div className="date">3 days ago</div>
//                                                 </div>
//                                                 <div className="added-images">
//                                                     <img
//                                                         src="https://mdbootstrap.com/img/Photos/Others/images/29.jpg"
//                                                         alt=""
//                                                         className="z-depth-1 rounded mb-md-0 mb-2"
//                                                     />
//                                                     <img
//                                                         src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg"
//                                                         alt=""
//                                                         className="z-depth-1 rounded"
//                                                     />
//                                                 </div>
//                                                 <div className="feed-footer">
//                                                     <a href="#!" className="like">
//                                                         <MDBIcon icon="heart" />
//                                                         <span>53 likes</span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </MDBRow>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                     <MDBCol md={6}>
//                         <div>
//                             Adsense Here
//                             <GoogleAd />
//                         </div>
//                     </MDBCol>
//                 </MDBRow>
//             </main>

//         </div>
//     );
// }

// export default SocialPage2;