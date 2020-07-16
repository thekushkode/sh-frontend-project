import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBadge,
  MDBAvatar,
  MDBBtn,
} from 'mdbreact';
import './extended.css';
import Ike from './images/ike.png';
import FooterPage from './Footer';
import firebase from '../firebase';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';
import GoOutside from './GoOutside';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      user: '',
      dogData: [],
      postValue: '',
      imgValue: ''
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
            Content: `${this.props.profile.data.ownerName} and ${dog.dogName} are friends`,
            Likes: 0,
            SenderID: user.uid,
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
    console.log('testing')
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
                          alt='Rottweiler dog photo'
                          // width='20%'
                          src={Ike}
                          className='rounded-circle z-depth-1-half mb-4 h-50 w-100 d-flex justify-content-center align-items-center'
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
                          <MDBBtn
                            className='peach-gradient'
                            size='sm'
                            rounded
                            onClick={() => this.addFriend(dog)}
                          >
                            Follow {dog.dogName}
                          </MDBBtn>
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
                          <ul className='list-unstyled pt-4'>
                            <li>
                              <p>
                                Questions{' '}
                                <MDBBadge color='primary' className='float-right'>
                                  34
                                </MDBBadge>
                              </p>
                            </li>
                            <hr />
                            <li>
                              <p>
                                Answers{' '}
                                <MDBBadge color='primary' className='float-right'>
                                  17
                                </MDBBadge>
                              </p>
                            </li>
                            <hr />
                            <li>
                              <p>
                                Submited projects{' '}
                                <MDBBadge color='primary' className='float-right'>
                                  12
                                </MDBBadge>
                              </p>
                            </li>
                            <hr />
                            <li>
                              <p>
                                Pull requests{' '}
                                <MDBBadge color='primary' className='float-right'>
                                  3
                                </MDBBadge>
                              </p>
                            </li>
                          </ul>
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
                            {/* <ProfileFeed /> */}
                            <MDBCard

                              className="mb-5 px-5 pt-4 fluid"
                              style={{ fontWeight: 300, maxWidth: 2000 }}
                            >
                              <MDBCardBody className="py-0">
                                <MDBRow>
                                  <div className="mdb-feed">
                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Spot
                                  </a> added you as a friend
                                  <div className="date">1 hour ago</div>
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>5 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Heidi
                                  </a> added <a href="#!">2 new photos</a>
                                          <div className="date">4 hours ago</div>
                                        </div>
                                        <div className="added-images">
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                          />
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                          />
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>18 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Herschel
                                  </a> added you as a friend
                                  <div href="#!" className="date">
                                            7 hours ago
                                  </div>
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>11 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Wilder
                                  </a> posted on her page
                                <div className="date">2 days ago</div>
                                        </div>
                                        <div className="added-text">
                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                          Vero inventore, iste quas libero eius? Vitae sint neque
                                          animi alias sunt dolor, accusantium ducimus, non placeat
                                          voluptate.
                                </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>7 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Kobe
                                  </a> added
                                  <a href="#!"> 2 new photos</a> of you
                                  <div className="date">3 days ago</div>
                                        </div>
                                        <div className="added-images">
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/29.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                          />
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                          />
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>53 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Spot
                                  </a> added you as a friend
                    <div className="date">1 hour ago</div>
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>5 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="news">
                                      <div className="label">
                                        <img
                                          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg"
                                          alt=""
                                          className="rounded-circle z-depth-1-half"
                                        />
                                      </div>
                                      <div className="excerpt">
                                        <div className="brief">
                                          <a href="#!" className="name">
                                            Heidi
                                  </a> added <a href="#!">2 new photos</a>
                                          <div className="date">4 hours ago</div>
                                        </div>
                                        <div className="added-images">
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                          />
                                          <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                          />
                                        </div>
                                        <div className="feed-footer">
                                          <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>18 likes</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCard>
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
