import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import './extended.css';
import FooterPage from './Footer';
import firebase from '../firebase';
import { connect } from 'react-redux';
import InputPage from './InputPage';
import { setFeed, unSetFeed, setProfile, clearProfile } from '../redux/actions/index';
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
      dogName: '',
      email: '',
      phone: '',
      lastSeen: '',
      addInfo: '',
      lostData: []
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
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let newPost = {
      dogName: this.state.dogName,
      dogImage: this.state.feedImgURL,
      email: this.state.email,
      phone: this.state.phone,
      lastSeen: this.state.lastSeen,
      addInfo: this.state.addInfo,
      DogID: this.props.profile.id,
      Type: 'Lost',
      timestamp: new Date()
    }
    if (this.state.feedImgURL) {
      this.addPhoto()
    }
    db.collection('Lost').add(newPost)
    this.setState({
      dogName: '',
      email: '',
      phone: '',
      lastSeen: '',
      addInfo: '',
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
                <MDBCol md='6' className='text-center'>
                  <form onSubmit={this.handleSubmit}>
                    <p className="h4 text-center mt-3 mb-4">Lost Dog Form</p>
                    <input placeholder="Dog's Name" type="text" id="defaultFormContactNameEx" className="form-control" value={this.state.dogName} onChange={(e) => { if (!null) { this.setState({dogName: e.target.value}) }}} />
                    <br />
                    <input placeholder='Owner Email' type="email" id="defaultFormContactEmailEx" className="form-control" value={this.state.email} onChange={(e) => { if (!null) { this.setState({email: e.target.value}) }}} />
                    <br />
                    <input placeholder='Owner Phone' type="text" id="defaultFormContactSubjectEx" className="form-control" value={this.state.phone} onChange={(e) => { if (!null) { this.setState({phone: e.target.value}) }}} />
                    <br />
                    <input placeholder='Last Seen Location' type="text" id="defaultFormContactSubjectEx" className="form-control" value={this.state.lastSeen} onChange={(e) => { if (!null) { this.setState({lastSeen: e.target.value}) }}} />
                    <br />
                    <textarea placeholder='Additional Info' type="text" id="defaultFormContactMessageEx" className="form-control" rows="2" value={this.state.addInfo} onChange={(e) => { if (!null) { this.setState({addInfo: e.target.value}) }}} />
                    <InputPage
                      value={this.state.feedImgURL}
                      id={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
                      onUpload={(imgRef) => {
                        this.setState({ feedImgURL: imgRef });
                      }} />
                    <div className="text-center mt-4">
                      <MDBBtn color="primary" outline type="submit">
                        Post
                      <MDBIcon far icon="paper-plane" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>

                <MDBCol className='overflow-auto text-center' style={{ height: '500px' }}>
                  {this.state.lostData.map((item, index) => {
                    return (
                      <MDBCard className="card-image mb-2 d-flex align-items-center" style={{
                        backgroundImage:
                          "url(./images/sh-dogplay.gif)", marin: 'auto'
                      }}>
                        <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 rounded">
                          <div>
                            <h4 className="white-text">
                              <MDBIcon icon="exclamation-triangle" />
                              <strong> HELP! I'M LOST</strong>
                            </h4>
                            <h3 className="py-3 font-weight-bold">
                              <strong>Help {item.dogName} get home: </strong>
                            </h3>
                            <img className="img-fluid" src={item.dogImage} alt='lost dog'></img>
                            <h4 className="pb-3">
                              Owner Phone: {item.phone}
                            </h4>
                            <h4 className="pb-3">
                              Owner Email: {item.email}
                            </h4>
                            <h5 className='p-3'>Additional Info: {item.addInfo}</h5>
                            <MDBBtn color="secondary" rounded size="md">
                              <MDBIcon far icon="eye" className="left" /> Last Seen: {item.lastSeen}
                            </MDBBtn>
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
                      </MDBCard>
                    )
                  }
                  )}
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