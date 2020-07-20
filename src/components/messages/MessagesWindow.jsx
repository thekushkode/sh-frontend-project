import React from 'react'
import { useSelector } from 'react-redux'
import SingleMessage from './SingleMessage'
import firebase from '../../firebase';
import '../Chat.css';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBRow, MDBCol } from 'mdbreact';





export default function MessagesWindow() {
    const db = firebase.firestore();
    const messages = useSelector(state => state.messages)
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    const [availableFriends, setAvailableFriends] = React.useState('')
    let userNames;
    let friends;
    let selectableFriends;
    if (messages.data) {
        // console.log('messages.data')
        userNames = messages.data.userNames.filter((name) => name !== profile.data.ownerName)
        if (profile.data.friends) {
            friends = profile.data.friends.map((name) => name)
        }
    }



    function selectUser() {
        // console.log(friends);
        if (friends) {
            friends = profile.data.friends.map((name) => name)
            // create dropdown or other method for choosing between your friends
            // filter out any friends that are already included in conversation
            // check if user has friends array, some users do not
            selectableFriends = friends && friends.filter((friend) => messages.data.members.includes(friend.ownerId))
            // console.log(selectableFriends)
            setAvailableFriends(selectableFriends)
            // save the clicked value to the variable chosenFriend
        }
    }

    function addFriend(chosenFriend) {
        // console.log(chosenFriend)
        db.collection('Dogs').doc(chosenFriend).get()
            .then((doc) => {
                let dogProfile = doc.data()
                // console.log(doc.data())
                db.collection("Messages").doc(messages.id)
                    .update({
                        members: [...messages.data.members, dogProfile.ownerId],
                        userNames: [...messages.data.userNames, dogProfile.ownerName],
                        messages: [...messages.data.messages,
                        {
                            sender: 'Social Hound',
                            timeStamp: Date.now(),
                            message: `${dogProfile.ownerName} has been added to the chat`
                        }
                        ]
                    })
            })

    }


    return (
        <>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol>
                    {userNames && userNames.map((name, index) => {
                        return (
                            <h5>
                                Chatting with:&nbsp;<strong>{name}{index < (userNames.length - 1) ? ', ' : null}</strong>
                            </h5>
                        )
                    })}
                </MDBCol>
                <MDBCol>
                    {friends &&
                        <MDBDropdown>
                            <MDBDropdownToggle className='purple-gradient btn-rounded' caret onClick={() => selectUser()}>Add Friend To Chat</MDBDropdownToggle>
                            <MDBDropdownMenu basic >
                                {availableFriends && availableFriends.map((friend) => {
                                    return (
                                        <MDBDropdownItem onClick={() => addFriend(friend.dogID)}>
                                            {friend.dogName}
                                        </MDBDropdownItem>
                                    )
                                })}
                            </MDBDropdownMenu>
                        </MDBDropdown>}
                    {/* // <MDBBtn className='btn-rounded purple-gradient' onClick={() => selectUser()}>Add User<MDBIcon icon='plus-circle' className='ml-1' /></MDBBtn>} */}
                </MDBCol>
            </MDBRow>
                <div className="border border-info p-2 white">
                    <ul style={{ height: '60vh', overflow: "scroll" }}>
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
                </div>
        </>
    )
}
