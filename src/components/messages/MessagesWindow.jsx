import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SingleMessage from './SingleMessage'
import firebase from '../../firebase';
import '../Chat.css';
import { css } from 'glamor';
import { MDBBtn, MDBIcon } from 'mdbreact';
import ScrollToBottom from 'react-scroll-to-bottom';





export default function MessagesWindow() {
    const db = firebase.firestore();
    const messages = useSelector(state => state.messages)
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    let userNames;
    let friends;
    if (messages.data) {
        console.log('messages.data')
        userNames = messages.data.userNames.filter((name) => name !== profile.data.ownerName)
        if (profile.data.friends) {
            friends = profile.data.friends.map((name) => name)
        }
    }



    function selectUser() {
        console.log(friends);
        // create dropdown or other method for choosing between your friends
        // filter out any friends that are already included in conversation
        // check if user has friends array, some users do not
        let selectableFriends = friends && friends.filter((friend) => friend !== messages.data.members)
        // save the clicked value to the variable chosenFriend
        let chosenFriend = 'b2GTIs6T5zEjHQMvrtiF'
        // get chosenFriends dog profile to access their userName and unique ID
        // .then add them to the current conversation
        // generate a stock message sent from socialhound
        db.collection('Dogs').doc(chosenFriend).get()
            .then(res => {
                let dogProfile = res.data()
                console.log(dogProfile)
                db.collection("Messages").doc(messages.id)
                    .update({
                        members: [...messages.data.members, profile.data.ownerId],
                        userNames: [...messages.data.userNames, profile.data.ownerName],  // should change to dog owners username once username is saved in dogs profile
                        messages: [...messages.data.messages,
                        {
                            sender: 'Social Hound',
                            timeStamp: Date.now(),
                            message: `${profile.data.ownerName} has been added to the chat`  // should change to dog owners username once username is saved in dogs profile
                        }
                        ]
                    })
            })
    }


    return (
        <div>
            <div className="row">
                <div className="col justify-content-start">
                    {userNames && userNames.map((name, index) => {
                        return (
                            <strong>{name}{index < (userNames.length - 1) ? ', ' : null}</strong>
                        )
                    })}
                </div>
                <div className="col">
                    {userNames &&
                        <MDBBtn className='btn-rounded purple-gradient' onClick={() => selectUser()}>Add User<MDBIcon icon='plus-circle' className='ml-1' /></MDBBtn>}
                </div>
            </div>
            <ScrollToBottom>
                <ul style={{ height: '300px', overflow: "scroll" }}>
                    {messages.data && messages.data.messages.map((item) => {
                        let styles;
                        let button;
                        if (item.sender === 'Social Hound') {
                            styles = ['around', '', 'text-black', 'rgb(3, 252, 173)']
                        }
                        else if (item.sender === 'PlayDate Request') {
                            styles = ['around', '', 'text-black', 'rgb(3, 252, 173)']
                            button = ['Confirm PlayDate']
                        }
                        else if (item.sender === profile.data.ownerName) {
                            // styles = ['end', 'aqua-gradient', 'text-white', 'rgb(240, 240, 240)']
                            styles = ['end', '', 'text-white', 'rgb(0,153,255)']
                        } else {
                            // styles = ['start', 'tempting-azure-gradient lighten-3', 'text-black']
                            styles = ['start', '', 'text-black', 'rgb(240, 240, 240)']
                        }
                        return (
                            <SingleMessage formatting={styles} content={item} button={button} />
                        )
                    })}
                </ul>
            </ScrollToBottom>
        </div>
    )
}
