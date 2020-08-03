import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { loadMessages } from '../redux/actions'
import firebase from '../firebase';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
moment().format()

const db = firebase.firestore();
function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

let id = randomString(20)

class SelectDate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            date: '',
            redirect: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }




    createPlayDate = (date) => {
        id = randomString(20)
        let userID = this.props.user.uid
        let userName = this.props.profile.data.ownerName
        let dog = this.props.dog
        if (userID) {

            let usersArray = []
            db.collection("Messages").where("members", "array-contains", userID).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    usersArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
            })
                .then(() => {
                    let filteredArray = usersArray.filter((message) => {
                        return message.data.members.length <= 2 && message.data.members.includes(`${dog.ownerId}`)
                    })
                    console.log(filteredArray)
                    return filteredArray
                })
                .then((filteredArray) => {
                    if (filteredArray.length > 0) {
                        const newMessage = {
                            sender: 'PlayDate Request',
                            timeStamp: Date.now(),
                            // message: `<a href="/user/${this.props.profile.id}">${this.props.profile.data.dogName}</a> &nbsp; has setup a PlayDate with ${dog.dogName} on ${moment().format(this.state.date)}`,
                            message: `A PlayDate has been setup between&nbsp<Link to="/user/${dog.dogId}" target='_blank'>${dog.dogName}</Link>&nbspand&nbsp<Link to="/user/${this.props.profile.id}" target="_blank">${this.props.profile.data.dogName}</Link>&nbspon ${moment().format(this.state.date)}`,
                            playDate: date,
                        }
                        db.collection("Messages").doc(filteredArray[0].id)
                            .update({
                                messages: [...filteredArray[0].data.messages, newMessage]
                            })
                            .then(() => {
                                const newReduxMessage = {
                                    id: filteredArray[0].id,
                                    data: {
                                        members: [userID, dog.ownerId],
                                        userNames: [userName, dog.ownerName],
                                        messages: [...filteredArray[0].data.messages, newMessage],
                                        senderAvatar: this.props.profile.data.avatar,
                                        receiverAvatar: dog.avatar
                                    }
                                }
                                this.props.loadMessages(newReduxMessage)
                                this.setState({
                                    redirect: '/messages'
                                })
                            })
                    } else {
                        const newMessage = {
                            sender: 'PlayDate Request',
                            timeStamp: Date.now(),
                            // message: `<a href="/user/${this.props.profile.id}">${this.props.profile.data.dogName}</a> &nbsp; has setup a PlayDate with ${dog.dogName} on ${moment().format(this.state.date)}`,
                            message: `A PlayDate has been setup between&nbsp<Link to="/user/${dog.dogId}" target='_blank'>${dog.dogName}</Link>&nbspand&nbsp<Link to="/user/${this.props.profile.id}" target="_blank">${this.props.profile.data.dogName}</Link>&nbspon ${moment().format(this.state.date)}`,
                            playDate: date,
                        }
                        db.collection("Messages").doc(id)
                            .set({
                                members: [userID, dog.ownerId],
                                userNames: [userName, dog.ownerName],
                                messages: [newMessage],
                                senderAvatar: this.props.profile.data.avatar,
                                receiverAvatar: dog.avatar
                            })
                            .then(() => {
                                const newReduxMessage = {
                                    id: id,
                                    data: {
                                        members: [userID, dog.ownerId],
                                        userNames: [userName, dog.ownerName],
                                        messages: [newMessage],
                                        senderAvatar: this.props.profile.data.avatar,
                                        receiverAvatar: dog.avatar
                                    }
                                }
                                this.props.loadMessages(newReduxMessage)
                                this.setState({
                                    redirect: '/messages'
                                })
                            })
                    }
                })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let playDateRef;
        let userID = this.props.user.uid
        let userName = this.props.profile.data.ownerName
        let dog = this.props.dog
        let doggo = this

        db.collection('PlayDates').add({
            members: [userID, dog.ownerId],
            userNames: [userName, dog.ownerName],
            [userID]: true,
            [dog.ownerId]: false,
            date: this.state.date,
            createdAt: Date.now(),
            confirmed: false,
            location: null,
            feedback: null,
        })
            .then(function (docRef) {
                playDateRef = docRef.id
                doggo.createPlayDate(playDateRef)
            })
    }


    handleChange = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    render() {
        return (
            <MDBContainer>
                <form onSubmit={this.handleSubmit}>
                    <MDBBtn className='btn-rounded purple-gradient' onClick={this.toggle}>Request Playdate</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}><strong>Select Date</strong></MDBModalHeader>
                        <MDBModalBody>
                            <input type='date' name='party' onChange={this.handleChange}></input>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn className='btn-rounded' color="danger" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn className='btn-rounded' color="info" type='submit' >Request Date</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </form>
                {this.state.redirect && <Redirect to={this.state.redirect} />}
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile
    }
}

const mapDispatchToProps = {
    loadMessages
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectDate)