import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBIcon,
  MDBAvatar,
  MDBBtn,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBView,
  MDBMask,
} from 'mdbreact';
import './extended.css';
import FooterPage from './Footer';
import PrivateFeed from './PrivateFeed';
import firebase from '../firebase';
import { Link } from 'react-router-dom'
import ModalImage from "react-modal-image";
import { connect } from 'react-redux';
import InputPage from './InputPage';
import { setFeed, unSetFeed, setProfile, clearProfile } from '../redux/actions/index';
import PlayDates from './PlayDates';
import Ads from './Ads';


const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'
const defaultFeedImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/social-hound-logo-512.png?alt=media'

class DogProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      user: '',
      dogData: [],
      postValue: '',
      imgValue: '',
      allDogData: [],
      feedImgURL: '',
      hidden: true,
      playDates: false,
      photos: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    window.scrollTo(0, 0)
    if (user) {
      if (this.props.match.params.dogId) {
        db.collection("Dogs")
          .doc(this.props.match.params.dogId)
          .get()
          .then(doc => {
            console.log(doc.data())
            const dogData = {
              ...doc.data(),
              dogId: doc.id
            }
            this.setState({
              dogData: dogData,
              user: user
            })
            const profile = {
              data: doc.data(),
              id: this.props.match.params.dogId
            }
            this.props.setProfile(profile)
            this.setState({
              photos: this.props.profile.data.photos
            })
          })
        db.collection("Dogs")
          .where('ownerId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            let data = [];
            querySnapshot.forEach(function (doc) {
              const dogData = {
                ...doc.data(),
                dogId: doc.id
              }
              data.push(dogData);
            })
            this.setState({
              allDogData: data,
              user: user,
              photos: this.props.profile.data.photos
            })
          })
      }
    }
  }

  componentDidUpdate(prevProps) {
    let dogID = this.props.match.params.dogId
    if (prevProps.match.params.dogId !== dogID) {
      const db = firebase.firestore();
      let user = firebase.auth().currentUser;
      if (user) {
        db.collection("Dogs")
          .doc(this.props.match.params.dogId)
          .get()
          .then(doc => {
            const dogData = {
              ...doc.data(),
              dogId: doc.id
            }
            this.setState({
              dogData: dogData,
              user: user,
              photos: this.props.profile.data.photos
            })
          })
      }
    }
  }


  handleClick = (id) => () => {
    const db = firebase.firestore();
    db.collection("Dogs")
      .doc(id)
      .get()
      .then(doc => {
        const dogData = {
          ...doc.data(),
          dogId: doc.id
        }
        let data = doc.data()
        let id = doc.id
        let profile = {
          data: data,
          id: id
        }
        this.setState({
          dogData: dogData
        })
        this.props.setProfile(profile)
      })
  }

  handleChange = (e) => {
    this.setState({
      postValue: e.target.value,
      // imgValue: e.target.imgValue
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let newPost
    if (this.props.profile.avatar) {
      newPost = {
        Avatar: this.props.profile.avatar,
        Content: this.state.postValue,
        Likes: 0,
        SenderName: this.props.profile.dogName,
        FriendID: this.props.profile.id,
        SenderID: user.uid,
        DogID: this.props.profile.dogId,
        Type: 'Post',
        timestamp: new Date(),
        feedImgURL: this.state.feedImgURL
      }
    } else {
      newPost = {
        Avatar: this.props.profile.data.avatar,
        Content: this.state.postValue,
        Likes: 0,
        SenderName: this.props.profile.data.dogName,
        FriendID: this.props.profile.id,
        SenderID: user.uid,
        DogID: this.props.profile.id,
        Type: 'Post',
        timestamp: new Date(),
        feedImgURL: this.state.feedImgURL
      }
    }
    if (this.state.feedImgURL) {
      this.addPhoto()
    }
    db.collection('Feed').add(newPost)
    this.setState({
      postValue: ''
    })
  }

  addPhoto = () => {
    const db = firebase.firestore();
    return db.collection("Dogs").doc(this.props.profile.id)
      .update({
        photos: firebase.firestore.FieldValue.arrayUnion(this.state.feedImgURL)
      })
      /* 
      COMMENTS:
      local state needs to be updated for the component to render the uploaded image to the page
      */
      .then(() => {
        const newImg = this.state.feedImgURL
        if (this.state.photos) {
          this.setState({
            photos: [...this.state.photos, this.state.feedImgURL],
          })
        } else {
          this.setState({
            photos: [this.state.feedImgURL]
          })
        }
      })
      .then(() => {
        this.setState({
          feedImgURL: '',
          postValue: ''
        })
      })
  }

  showPlayDates = () => {
    this.setState({
      playDates: !this.state.playDates
    })
  }

  toggle = item => {
    this.setState({
      [item]: !this.state[item]
    });
  };

  render() {

    return (
      <div style={{ maxHeight: '1500px' }}>
        <header style={{ marginBottom: '80px' }}>
        </header>
        <main style={{ backgroundColor: '#e1f5fe', marginTop: '10px' }}>
          <div id='profile-ex' className='mt-4'>
            <MDBContainer fluid>
              <MDBCard
                style={{ fontWeight: 300 }}
              >
                <MDBCardBody style={{ paddingTop: 0 }}>
                  <MDBRow>
                    <MDBCol md="12" lg="6">
                      {/* <div className="mb-2"> */}
                      <img
                        id='mobile'
                        tag='img'
                        alt='Dog'
                        style={{ width: '500px', height: '500px', objectFit: 'cover', margin: '0 auto' }}
                        src={this.state.dogData.avatar ? this.state.dogData.avatar : defaultDogImg}
                        className='img-fluid rounded z-depth-1-half mb-4 mt-3'
                      />
                      <MDBDropdown>
                        <MDBDropdownToggle caret className="aqua-gradient btn-rounded">
                          Select Dog
                          </MDBDropdownToggle>
                        <MDBDropdownMenu basic >
                          {this.state.allDogData && this.state.allDogData.map((dog, index) => {
                            return (
                              <MDBDropdownItem><Link to={`/profile/${dog.dogId}`} key={index} onClick={this.handleClick(dog.dogId)}>{dog.dogName}</Link></MDBDropdownItem>
                            )
                          })}
                          < MDBDropdownItem divider />
                          <MDBDropdownItem><Link to={`/add`}>Add Dog</Link></MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                      {/* </div> */}
                    </MDBCol>

                    <MDBCol md="12" lg="6">
                      <div>
                        <MDBRow>
                          <MDBCol md="12" lg='12'>
                            <MDBView hover rounded className="z-depth-1-half mb-2 mt-2">
                              <MDBCardBody>
                                <MDBCardTitle>
                                  <h2><strong>{this.state.dogData.dogName}</strong></h2>
                                </MDBCardTitle>
                                <p className='dark-grey-text'>{this.state.dogData.city}, {this.state.dogData.userState}</p>
                                <hr className='my-2' />
                                <h5>
                                  {this.state.dogData.bio}
                                </h5>
                                {this.state.dogData.facebook ?
                                  <MDBBtn floating tag='a' href={this.state.dogData.facebook} target='_blank' className='blue-gradient'>
                                    <MDBIcon fab icon='facebook' className='white-text'>
                                    </MDBIcon>
                                  </MDBBtn>
                                  : null}
                                {this.state.dogData.instagram ?
                                  <MDBBtn floating tag='a' href={`https://www.instagram.com/${this.state.dogData.instagram}`} target='_blank' className='purple-gradient'>
                                    <MDBIcon fab icon='instagram' className='white-text'>
                                    </MDBIcon>
                                  </MDBBtn>
                                  :
                                  null
                                }
                              </MDBCardBody>
                            </MDBView>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md='12' lg='12'>
                            <MDBCard className='mb-4'>
                              <MDBCardBody className='text-center'>
                                <h5>
                                  <strong>{this.state.dogData.dogName}'s Badges</strong>
                                </h5>

                                <hr className='my-3' />

                                {this.state.dogData.spayNeut &&
                                  <MDBBtn
                                    color='light-blue'
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    Neutered | Spayed: {this.state.dogData.spayNeut}
                                  </MDBBtn>}
                                {this.state.dogData.temperament &&
                                  <MDBBtn
                                    color='blue-grey'
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    {this.state.dogData.temperament}
                                  </MDBBtn>}
                                {this.state.dogData.vaccines &&
                                  <MDBBtn
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    Has Vaccines: {this.state.dogData.vaccines}
                                  </MDBBtn>}
                                {this.state.dogData.size &&
                                  <MDBBtn
                                    color='secondary'
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    {this.state.dogData.size}
                                  </MDBBtn>}
                                {this.state.dogData.breed &&
                                  <MDBBtn
                                    color='deep-purple'
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    {this.state.dogData.breed}
                                  </MDBBtn>}
                                {this.state.dogData.city &&
                                  <MDBBtn
                                    color='indigo'
                                    size='sm'
                                    rounded
                                    className='px-3'
                                  >
                                    {this.state.dogData.city}
                                  </MDBBtn>}
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="12" lg='12'>
                            <MDBCard className='mb-4'>
                              <MDBCardBody>
                                <MDBBtn
                                  className='purple-gradient'
                                  rounded
                                >
                                  <Link style={{ textDecoration: 'none', color: 'white' }} to={`/editprofile/${this.state.dogData.dogId}`}>Edit Profile</Link>
                                </MDBBtn>
                                <MDBBtn
                                  className='blue-gradient'
                                  rounded
                                >
                                  <Link style={{ textDecoration: 'none', color: 'white' }} to='/furends'>Find Furends</Link>
                                </MDBBtn>
                                <MDBBtn
                                  className='peach-gradient'
                                  rounded
                                >
                                  <Link style={{ textDecoration: 'none', color: 'white' }} to='/messages'>Messages</Link>
                                </MDBBtn>
                                <MDBBtn
                                  className='aqua-gradient'
                                  rounded
                                  onClick={this.showPlayDates}
                                >
                                  {this.state.playDates ? <span>My Feed</span> : <span>Playdates</span>}
                                </MDBBtn>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>

                        </MDBRow>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBRow>
                <MDBCol lg='4' md='4'>
                  {/* <MDBCard className='profile-card text-center mb-4'>
                    <MDBAvatar
                      tag='img'
                      alt='Dog photo'
                      style={{ width: '300px', height: '300px', objectFit: 'cover', margin: '0 auto' }}
                      src={this.state.dogData.avatar ? this.state.dogData.avatar : defaultDogImg}
                      className='rounded-circle z-depth-1-half mb-4 mt-3'
                    />
                    <MDBDropdown>
                      <MDBDropdownToggle caret className="aqua-gradient btn-rounded">
                        Select Dog
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic >
                        {this.state.allDogData && this.state.allDogData.map((dog, index) => {
                          return (
                            <MDBDropdownItem><Link to={`/profile/${dog.dogId}`} key={index} onClick={this.handleClick(dog.dogId)}>{dog.dogName}</Link></MDBDropdownItem>
                          )
                        })}
                        < MDBDropdownItem divider />
                        <MDBDropdownItem><Link to={`/add`}>Add Dog</Link></MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBCardBody>
                      <MDBCardTitle>
                        <strong>{this.state.dogData.dogName}</strong>
                      </MDBCardTitle>
                      <p className='dark-grey-text'>{this.state.dogData.city}, {this.state.dogData.userState}</p>
                      <hr className='my-2' />
                      <h5>
                        {this.state.dogData.bio}
                      </h5>
                      {this.state.dogData.facebook ?
                        <MDBBtn floating tag='a' href={this.state.dogData.facebook} target='_blank' className='blue-gradient'>
                          <MDBIcon fab icon='facebook' className='white-text'>
                          </MDBIcon>
                        </MDBBtn>
                        : null}
                      {this.state.dogData.instagram ?
                        <MDBBtn floating tag='a' href={`https://www.instagram.com/${this.state.dogData.instagram}`} target='_blank' className='purple-gradient'>
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
                        className='purple-gradient'
                        rounded
                      >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={`/editprofile/${this.state.dogData.dogId}`}>Edit Profile</Link>
                      </MDBBtn>
                      <MDBBtn
                        className='blue-gradient'
                        rounded
                      >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/furends'>Find Furends</Link>
                      </MDBBtn>
                      <MDBBtn
                        className='peach-gradient'
                        rounded
                      >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/messages'>Messages</Link>
                      </MDBBtn>
                      <MDBBtn
                        className='aqua-gradient'
                        rounded
                        onClick={this.showPlayDates}
                      >
                        {this.state.playDates ? <span>My Feed</span> : <span>Playdates</span>}
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                  <MDBCard className='mb-4'>
                    <MDBCardBody className='text-center'>
                      <h5>
                        <strong>{this.state.dogData.dogName}'s Badges</strong>
                      </h5>

                      <hr className='my-3' />

                      {this.state.dogData.spayNeut &&
                        <MDBBtn
                          color='light-blue'
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          Neutered | Spayed: {this.state.dogData.spayNeut}
                        </MDBBtn>}
                      {this.state.dogData.temperament &&
                        <MDBBtn
                          color='blue-grey'
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          {this.state.dogData.temperament}
                        </MDBBtn>}
                      {this.state.dogData.vaccines &&
                        <MDBBtn
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          Has Vaccines: {this.state.dogData.vaccines}
                        </MDBBtn>}
                      {this.state.dogData.size &&
                        <MDBBtn
                          color='secondary'
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          {this.state.dogData.size}
                        </MDBBtn>}
                      {this.state.dogData.breed &&
                        <MDBBtn
                          color='deep-purple'
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          {this.state.dogData.breed}
                        </MDBBtn>}
                      {this.state.dogData.city &&
                        <MDBBtn
                          color='indigo'
                          size='sm'
                          rounded
                          className='px-3'
                        >
                          {this.state.dogData.city}
                        </MDBBtn>}
                    </MDBCardBody>
                  </MDBCard> */}

                  {this.state.dogData.friends ?
                    <MDBCard className='mt-4'>
                      <MDBCardBody>
                        <h5 className='text-center mb-4'>
                          <strong>{this.state.dogData.dogName}'s Friends </strong>
                        </h5>
                        <MDBRow style={{ maxHeight: '300px', overflow: 'scroll'}}>
                          {this.state.dogData.friends && this.state.dogData.friends.map((dog, index) => {
                            return (

                              <MDBCol md='6' lg='4' sm='6' xs='6' className='mt-1' key={index}>
                                <MDBView hover>
                                  <Link to={`/user/${dog.dogID}`}>
                                  <MDBAvatar
                                      tag='img'
                                      src={dog.avatar}
                                      // small={photo}
                                      // large={photo}
                                      className="img-fluid z-depth-1-half rounded-circle"
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
                    :
                    <></>
                  }


                  {this.state.photos ?
                    <MDBCard className='mt-2'>
                      <MDBCardBody>
                        <h5 className='text-center mb-4'>
                          <strong>{this.state.dogData.dogName}'s Photos</strong>
                        </h5>
                        <MDBRow style={{ maxHeight: '300px', overflow: 'scroll'}}>
                          {this.state.photos && this.state.photos.map((photo, index) => {
                            console.log(photo)
                            return (
                              <MDBCol md='6' lg='4' sm='6' className='mt-1' key={index}>
                                <MDBView hover>
                                  <Link>
                                    <MDBAvatar
                                      tag='img'
                                      src={`${photo}`}
                                      // small={photo}
                                      // large={photo}
                                      className="img-fluid z-depth-1-half rounded-circle"
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
                    :
                    <></>
                  }
                  <Ads />
                </MDBCol>
                <MDBCol lg='8' md='8' className='text-center'>
                  <MDBRow>
                    <MDBCol>
                      <div style={{ marginTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <div className="form-group">
                          <form onSubmit={this.handleSubmit}>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="2"
                              value={this.state.postValue}
                              name='post'
                              onChange={this.handleChange}
                              placeholder='Create new post...'
                            />

                            <MDBAvatar
                              tag='img'
                              alt='Feed Image'
                              src={(this.state.feedImgURL ? this.state.feedImgURL : defaultFeedImg)}
                              style={{ maxWidth: '400px', maxHeight: '400px', margin: '0 auto', borderRadius: '5px' }}
                              className='z-depth-1-half mb-4 mt-4'
                              hidden
                            />

                            <InputPage
                              value={this.state.feedImgURL}
                              id={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
                              onUpload={(imgRef) => {
                                this.setState({ feedImgURL: imgRef });
                              }} />

                            <MDBBtn
                              type='submit'
                              className='btn btn-rounded blue-gradient'
                            >
                              Post <MDBIcon icon='image' className='ml-1' />
                            </MDBBtn>
                          </form>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {this.state.playDates ?
                        <PlayDates id={this.state.user.uid} />
                        :
                        <PrivateFeed location={this.props.location.pathname} key={window.location.pathname} />
                      }
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </main>

        <FooterPage />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
    profile: state.profile
  }
}

const mapDispatchToProps = {
  setFeed,
  unSetFeed,
  setProfile,
  clearProfile
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DogProfile)

