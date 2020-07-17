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
  MDBBtn,
} from 'mdbreact';
import './extended.css';
import FooterPage from './Footer';
import firebase from '../firebase';
import { connect } from 'react-redux'
import SocialPage2 from './feed2';

const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

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

  letsChat = (dog) => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let userID = user.uid
    let userName = user.displayName
    if (userID) {
      return db.collection("Messages").doc()
        .set({
          members: [userID, dog.ownerId],
          userNames: [userName, dog.dogName],
          messages: [
            {
              sender: `${userName}`,
              timeStamp: Date.now(),
              message: `${userName} wants to chat`
            }
          ]
        })
        .then(() => {
          this.props.history.push('/messages')
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
              console.log(`${doc.id} created successfully`)
            })
            .catch(err => {
              console.error(err)
            })
        })
        .then(() => {
          this.setState({
            friends: [...this.state.friends, dog]
          })
        })
    }
  }

  removeFriend = (dog) => {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let userID = user.uid
    if (userID) {
      return db.collection("Dogs").doc(this.props.profile.id)
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove(dog)
        })
        .then(() => {
          let filteredFriends = this.state.friends.filter(friend => friend.dogID !== dog.dogID)
          this.setState({
            friends: filteredFriends
          })
        })
    }
  }

  handleChange = (e) => {
    console.log('changed');
    this.setState({
      postValue: e.target.postValue,
      imgValue: e.target.imgValue
    })
    console.log(this.state.postValue);
    console.log(this.state.imgValue);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    console.log(e.target.postValue);
    this.setState({
      postValue: e.target.postValue,
      imgValue: e.target.imgValue
    });
  }

  toggle = item => {
    console.log(item);
    this.setState({
      [item]: !this.state[item]
    });
  };

  render() {
    return (
      <div>
        <header style={{ marginBottom: '100px' }}>
        </header>
        <main>
          <div id='profile-ex' className='mb-5 mt-4 mx-4'>
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
                          <h5>
                            {dog.bio}
                          </h5>
                          <MDBBtn floating tag='a' className='morpheus-den-gradient'>
                            <MDBIcon fab icon='facebook' className='white-text' />
                          </MDBBtn>
                          <MDBBtn floating tag='a' className='young-passion-gradient'>
                            <MDBIcon fab icon='instagram' className='white-text' />
                          </MDBBtn>
                          <p className='card-text mt-3'>
                            {dog.bio}
                          </p>
                          <MDBBtn
                            className='peach-gradient'
                            size='sm'
                            rounded
                            onClick={() => this.letsChat(dog)}
                          >
                            Chat
                          </MDBBtn>
                          <MDBBtn
                            className='blue-gradient'
                            size='sm'
                            rounded
                            href='/messages'
                          >
                            Request PlayDate
                          </MDBBtn>
                          {/* {this.props.profile.data.friends && this.props.profile.data.friends.find(friend => friend.dogID === dog.dogID) ? */}
                          {this.state.friends.find(friend => friend.dogID === dog.dogID) ?
                            <MDBBtn
                              className='peach-gradient'
                              size='sm'
                              rounded
                              onClick={() => this.removeFriend(dog)}
                            >
                              Unfriend {dog.dogName}
                              {/* {this.state.followUnfollow ? <span>Unfollow {dog.dogName}</span> : <span>Follow {dog.dogName}</span>} */}
                            </MDBBtn>
                            :
                            <MDBBtn
                              className='aqua-gradient'
                              size='sm'
                              rounded
                              onClick={() => this.addFriend(dog)}
                            >
                              Add {dog.dogName} as a friend
                              {/* {this.state.followUnfollow ? <span>Follow {dog.dogName}</span> : <span>Unfollow {dog.dogName}</span>} */}
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
                      {dog.friends && dog.friends.map(dog => {
                        return (
                          <MDBCol md='4' className='mt-1'>
                            <MDBView hover>
                              <a href={`/user/${dog.dogID}`}>
                                <img
                                  src={dog.avatar ? dog.avatar : defaultDogImg}
                                  className="img-fluid rounded-circle"
                                  alt="Dog Avatar"
                                  style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0 auto' }}
                                />
                                <MDBMask className="flex-center flex-column" overlay="blue-strong">
                                  <p className="white-text"><strong>{dog.dogName}</strong></p>
                                  <p className="white-text"><strong>{dog.breed}</strong></p>
                                </MDBMask>
                              </a>
                            </MDBView>
                          </MDBCol>
                        )
                      })}
                    </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol lg='8' md='8' className='text-center'>
                      <MDBRow>
                        <MDBCol>
                          <div className='text-center mt-3'>
                            <h4>
                              <strong>{dog.dogName}'s Feed</strong>
                            </h4>
                          </div>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol>
                          <div className='ml-5 mt-3'>
                            <SocialPage2 />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile
  }
}

export default connect(
  mapStateToProps,
  null
)(UserProfile)
