import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBIcon,
  MDBView,
  MDBMask,
  MDBAvatar,
  MDBBtn
} from 'mdbreact';
import './extended.css';
import FooterPage from './Footer';
import PrivateFeed from './PrivateFeed';
import { Link } from 'react-router-dom'
import firebase from '../firebase';
import { connect } from 'react-redux'
import ModalImage from "react-modal-image";
import SelectDate from './SelectDate';
import { loadMessages } from '../redux/actions'

const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media';

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

const id = randomString(20)

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      user: '',
      dogData: [],
      postValue: '',
      imgValue: '',
      followUnfollow: true,
      friends: this.props.profile.data.friends || []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let dogID = this.props.match.params.dogId
    if (user) {
      db.collection("Dogs")
        .doc(dogID)
        .get()
        .then(data => {
          let doggo = []
          let dogData = data.data()
          dogData['dogID'] = dogID
          doggo.push(dogData)
          this.setState({
            dogData: doggo
          })
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let dogID = this.props.match.params.dogId
    if (prevProps.match.params.dogId !== dogID || prevState.friends.length !== this.state.friends.length) {
      const db = firebase.firestore();
      let user = firebase.auth().currentUser;
      if (user) {
        db.collection("Dogs")
          .doc(dogID)
          .get()
          .then(data => {
            let doggo = []
            let dogData = data.data()
            dogData['dogID'] = dogID
            doggo.push(dogData)
            this.setState({
              dogData: doggo
            })
          })
      }
    }
  }

  letsChat = (dog) => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let userID = user.uid
    let userName = this.props.profile.data.ownerName
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
          return filteredArray
        })
        .then((filteredArray) => {
          if (filteredArray.length > 0) {
            const newReduxMessage = {
              id: filteredArray[0].id,
              data: {
                members: [userID, dog.ownerId],
                userNames: [userName, dog.ownerName],
                messages: [...filteredArray[0].data.messages],
                senderAvatar: this.props.profile.data.avatar,
                receiverAvatar: dog.avatar
              }
            }
            this.props.loadMessages(newReduxMessage)
            this.props.history.push('/messages')
          } else {
            const newMessage = {
              sender: 'Social Hound',
              timeStamp: Date.now(),
              message: `${userName} wants to chat`,
              senderAvatar: this.props.profile.data.avatar,
              receiverAvatar: dog.avatar
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
                this.props.history.push('/messages')
              })
          }
        })
    }
  }

  addFriend = (dog) => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let userID = user.uid
    if (userID) {
      return db.collection("Dogs").doc(this.props.profile.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(dog)
        })
        .then(() => {
          const newPost = {
            Avatar: this.props.profile.data.avatar,
            DogAvatar: dog.avatar,
            Likes: 0,
            SenderID: user.uid,
            DogID: dog.dogID,
            DogName: dog.dogName,
            FriendID: this.props.profile.id,
            FriendName: this.props.profile.data.dogName,
            Type: 'Friend',
            timestamp: new Date()
          }
          db.collection('Feed').add(newPost)
            .then(doc => {
              // console.log(`${doc.id} created successfully`)
            })
            .catch(err => {
              console.error(err)
            })
        })
        .then(() => {
          this.setState({
            friends: [...this.state.friends, dog]
          })
          this.props.profile.data.friends = this.state.friends;
        })
    }
  }

  removeFriend = (dog) => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let userID = user
    let filteredFriends = this.state.friends.filter(friend => friend.dogID !== dog.dogID)
    if (userID) {
      return db.collection("Dogs").doc(this.props.profile.id)
        .update({
          friends: filteredFriends
        })
        .then(() => {
          this.setState({
            friends: filteredFriends
          })
          this.props.profile.data.friends = this.state.friends;
        })
    }
  }

  handleChange = (e) => {
    // console.log('changed');
    this.setState({
      postValue: e.target.postValue,
      imgValue: e.target.imgValue
    })
    // console.log(this.state.postValue);
    // console.log(this.state.imgValue);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('submitted');
    // console.log(e.target.postValue);
    this.setState({
      postValue: e.target.postValue,
      imgValue: e.target.imgValue
    });
  }

  toggle = item => {
    // console.log(item);
    this.setState({
      [item]: !this.state[item]
    });
  };

  render() {
    return (
      <div>
        <header style={{ marginBottom: '81px' }}>
        </header>
        <main style={{ backgroundColor: '#e1f5fe' }}>
          <div id='profile-ex' className='mt-4 mx-4' style={{ maxWidth: '1500px', margin: '0 auto' }}>
            {this.state.dogData.map((dog, index) => {
              return (
                <MDBContainer fluid>
                  <MDBRow>
                    <MDBCol lg='4' md='4'>
                      <MDBCard className='profile-card text-center mb-4'>
                        <MDBAvatar
                          tag='img'
                          alt='dog photo'
                          // width='20%'
                          src={dog.avatar}
                          style={{ width: '200px', height: '200px', objectFit: 'cover', margin: '0 auto' }}
                          className='rounded-circle z-depth-1-half mb-4 d-flex justify-content-center align-items-center'
                        />
                        <MDBCardBody>
                          <MDBCardTitle>
                            <strong>{dog.dogName}</strong>
                          </MDBCardTitle>
                          <p className='dark-grey-text'>{dog.city}, {dog.userState}</p>
                          <hr className='my-2' />
                          <h5>
                            {dog.bio}
                          </h5>
                          {dog.facebook ? 
                      <MDBBtn floating tag='a' href={dog.facebook} target='_blank' className='blue-gradient'>
                        <MDBIcon fab icon='facebook' className='white-text'>
                        </MDBIcon>
                      </MDBBtn>
                      : null}
                      {dog.instagram ? 
                      <MDBBtn floating tag='a' href={dog.instagram} target='_blank' className='purple-gradient'>
                        <MDBIcon fab icon='instagram' className='white-text'>
                        </MDBIcon>
                      </MDBBtn>
                      :
                      null
                      }
                        </MDBCardBody>
                      </MDBCard>
                      <MDBCard className='mb-4'>
                        <MDBCardBody>
                          <MDBBtn
                            className='peach-gradient'
                            rounded
                            onClick={() => this.letsChat(dog)}
                          >
                            Chat
                          </MDBBtn>
                          <SelectDate dog={dog} />
                          {this.state.friends.find(friend => friend.dogID === dog.dogID) ?
                            <MDBBtn
                              className='blue-gradient'
                              rounded
                              onClick={() => this.removeFriend(dog)}
                            >
                              Unfriend {dog.dogName}
                            </MDBBtn>
                            :
                            <MDBBtn
                              className='aqua-gradient'
                              rounded
                              onClick={() => this.addFriend(dog)}
                            >
                              Add {dog.dogName} as a friend
                            </MDBBtn>
                          }
                        </MDBCardBody>
                      </MDBCard>

                      <MDBCard className='mb-4'>
                        <MDBCardBody className='text-center'>
                          <h5>
                            <strong>{dog.dogName}'s Badges</strong>
                          </h5>

                          <hr className='my-3' />

                          {dog.spayNeut &&
                            <MDBBtn
                              color='light-blue'
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              Neutered | Spayed: {dog.spayNeut}
                            </MDBBtn>}
                          {dog.temperament &&
                            <MDBBtn
                              color='blue-grey'
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              {dog.temperament}
                            </MDBBtn>}
                          {dog.vaccines &&
                            <MDBBtn
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              Has Vaccines: {dog.vaccines}
                            </MDBBtn>}
                          {dog.size &&
                            <MDBBtn
                              color='secondary'
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              {dog.size}
                            </MDBBtn>}
                          {dog.breed &&
                            <MDBBtn
                              color='deep-purple'
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              {dog.breed}
                            </MDBBtn>}
                          {dog.city &&
                            <MDBBtn
                              color='indigo'
                              size='sm'
                              rounded
                              className='px-3'
                            >
                              {dog.city}
                            </MDBBtn>}
                        </MDBCardBody>
                      </MDBCard>
                      <MDBCard className='mb-4'>
                        <MDBCardBody>
                          <h5 className='text-center mb-4'>
                            <strong>{dog.dogName}'s Friends </strong>
                          </h5>
                          <MDBRow>
                            {dog.friends && dog.friends.map(dog => {
                              return (
                                <MDBCol md='4' className='mt-1'>
                                  <MDBView hover>
                                    <Link to={`/user/${dog.dogID}`}>
                                      <img
                                        src={dog.avatar}
                                        className="img-fluid rounded-circle"
                                        alt="Dog Avatar"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0 auto' }}
                                      />
                                      <MDBMask className="flex-center flex-column" overlay="blue-strong">
                                        <p className="white-text"><strong>{dog.dogName}</strong></p>
                                        <p className="white-text"><strong>{dog.breed}</strong></p>
                                      </MDBMask>
                                    </Link>
                                  </MDBView>
                                </MDBCol>
                              )
                            })}
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                      <MDBCard className='mb-4'>
                        <MDBCardBody>
                          <h5 className='text-center mb-4'>
                            <strong>See photos of {dog.dogName} <span aria-label='camera emoji' role='img'>📸</span></strong>
                          </h5>
                          <MDBRow>
                            {dog.photos && dog.photos.map((photo, index) => {
                              return (
                                <MDBCol md='4' className='mt-1' key={index}>
                                  <MDBView hover>
                                    <Link>
                                      <ModalImage
                                        small={photo}
                                        large={photo}
                                        className="img-fluid rounded-circle"
                                        alt="Dog Avatar"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0 auto' }}
                                      />
                                    </Link>
                                  </MDBView>
                                </MDBCol>
                              )
                            })}
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg='8' md='8' className='text-center'>
                      <MDBRow>
                        <MDBCol>
                          <div className='ml-5 mt-3'>
                            <PrivateFeed location={this.props.location.pathname} key={window.location.pathname} />
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              )
            })
            }
          </div>
        </main>
        <footer>
          <FooterPage />
        </footer>
      </div >
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
)(UserProfile)
