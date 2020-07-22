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
  MDBJumbotron,
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
import LostDog from './LostDog'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';
moment().format()


const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'
const defaultFeedImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/social-hound-logo-512.png?alt=media'

class Lost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      user: '',
      lostData: [],
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

    if (user) {
      db.collection('Lost').orderBy("timestamp", "desc").limit(10).onSnapshot(
        querySnapshot => {
          let lostArray = []
          querySnapshot.forEach(function (doc) {
            console.log(doc.data())
            const feedData = {
              ...doc.data(),
              docId: doc.id
            }
            lostArray.push(feedData);
          })
          this.setState({
            lostData: lostArray,
            user: user
          })
        })
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
        SenderName: this.props.profile.ownerName,
        FriendID: this.props.profile.id,
        SenderID: user.uid,
        DogID: this.props.profile.dogId,
        Type: 'Lost',
        timestamp: new Date(),
        feedImgURL: this.state.feedImgURL
      }
    } else {
      newPost = {
        Avatar: this.props.profile.data.avatar,
        Content: this.state.postValue,
        SenderName: this.props.profile.data.ownerName,
        FriendID: this.props.profile.id,
        SenderID: user.uid,
        DogID: this.props.profile.id,
        Type: 'Lost',
        timestamp: new Date(),
        feedImgURL: this.state.feedImgURL
      }
    }
    if (this.state.feedImgURL) {
      this.addPhoto()
    }
    db.collection('Lost').add(newPost)
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

  toggle = item => {
    this.setState({
      [item]: !this.state[item]
    });
  };

  render() {

    return (
      <div style={{ maxHeight: '1500px', margin: '0 auto' }}>
        <header style={{ marginBottom: '80px' }}>
        </header>
        <main style={{ backgroundColor: '#e1f5fe' }}>
          <div id='profile-ex' className='mt-4 mx-2'>
            <MDBContainer fluid>
              <MDBRow>
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
                              placeholder='Post a lost dog...'
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
                    <MDBCol className='overflow-auto' style={{ height: '1600px' }}>
                      {this.state.lostData.map((item, index) => {
                        return (
                          <MDBJumbotron>
                            <div className='news'>
                              <div className="excerpt ml-4 d-flex justify-content-between">
                                <div className='label m-auto align-items-start h-100 mt-0 col-4'>
                                  <img
                                    src={item.Avatar}
                                    alt=""
                                    className="rounded-circle z-depth-1-half"
                                    style={{ width: '75px', height: '75px', objectFit: 'cover', margin: '0 auto' }}
                                  />
                                  <div className="brief">
                                    <Link to={`/user/${item.DogID}`} className="name">
                                      {item.SenderName}
                                    </Link> posted a new photo
                      <div className="date">- {moment(item.timestamp.toDate()).fromNow()}</div>
                                  </div>
                                </div>
                                <div className="added-text my-2 m-auto col-8 align-items-center">
                                  <h6><strong>{item.Content}</strong></h6>
                                  {<ModalImage small={item.feedImgURL} large={item.feedImgURL} style={{ width: '350px', borderRadius: '25px' }} />}
                                  <div className="feed-footer">
                                  </div>
                                  <MDBContainer className='mt-2'>
                                    <FacebookShareButton url={`https://www.socialhound.co/user/${item.DogID}`} quote={item.content}>
                                      <FacebookIcon className='mr-1' size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={`localhost:3000/user/${item.DogID}`} title={item.content}>
                                      <TwitterIcon className='mr-1' size={32} round />
                                    </TwitterShareButton>
                                    <EmailShareButton url={`localhost:3000/user/${item.DogID}`} subject={`Email from ${item.SenderName}`}>
                                      <EmailIcon className='mr-1' size={32} round />
                                    </EmailShareButton>
                                  </MDBContainer>
                                </div>
                              </div>
                            </div>
                          </MDBJumbotron>
                        )
                      }
                      )}
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
)(Lost)