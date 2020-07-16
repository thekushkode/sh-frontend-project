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
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBView,
  MDBMask
} from 'mdbreact';
import './extended.css';
import Ike from './images/ike.png';
import FooterPage from './Footer';
import firebase from '../firebase';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';
import GoOutside from './GoOutside';
import { Link } from 'react-router-dom'
import SocialPage2 from './feed2';
import { connect } from 'react-redux'
import { setFeed, unSetFeed, setProfile, clearProfile } from '../redux/actions/index';

const defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

class DogProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      user: '',
      dogData: [],
      postValue: '',
      imgValue: '',
      allDogData: []
    };
  }


  componentDidMount() {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;

    if (user) {
      if (this.props.match.params.dogId) {
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
              user: user
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
              user: user
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
        this.setState({
          dogData: dogData
        })
        this.props.setProfile(dogData)
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
    const newPost = {
      Content: this.state.postValue,
      Likes: 0,
      SenderName: this.props.profile.data.dogName,
      SenderID: user.uid,
      Type: 'Post',
      timestamp: new Date()
    }
    db.collection('Feed').add(newPost)
      .then(doc => {
        console.log(`${doc.id} created successfully`)
      })
      .catch(err => {
        console.error(err)
      })
    this.setState({
      postValue: ''
      // imgValue: e.target.imgValue
    })
    // dispatch(setFeed(newPost))
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
            <MDBContainer fluid>
              <MDBRow>
                <MDBCol lg='4' md='4'>
                  <MDBCard className='profile-card text-center mb-4'>
                    <MDBAvatar
                      tag='img'
                      alt='Dog photo'
                      style={{ width: '300px', height: '300px', objectFit: 'cover', margin: '0 auto' }}
                      src={this.state.dogData.avatar}
                      className='rounded-circle z-depth-1-half mb-4 mt-3'

                    //className='rounded-circle z-depth-1-half mb-4 h-50 w-100 d-flex justify-content-center align-items-center'

                    />
                    <MDBDropdown>
                      <MDBDropdownToggle caret rounded className="aqua-gradient">
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
                      <h5>
                        Bio: {this.state.dogData.bio}
                      </h5>
                      <MDBBtn floating tag='a' className='blue-gradient'>
                        <MDBIcon fab icon='facebook' className='white-text' />
                      </MDBBtn>
                      <MDBBtn floating tag='a' className='purple-gradient'>
                        <MDBIcon fab icon='instagram' className='white-text' />
                      </MDBBtn>
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
                        className='peach-gradient'

                        rounded
                        href='#!'
                      >
                        Follow {this.state.dogData.dogName}
                      </MDBBtn>
                      <MDBBtn
                        className='blue-gradient'

                        rounded
                        href='/messages'
                      >
                        Request PlayDate
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
                  </MDBCard>

                  <MDBCard className='mb-4'>
                    <MDBCardBody>
                      <h5 className='text-center mb-4'>
                        <strong>{this.state.dogData.dogName}'s Friends </strong>
                      </h5>
                      {this.state.dogData.friends && this.state.dogData.friends.map(dog => {
                        return (

                          <MDBCol md='4' className='mt-1'>
                            <MDBView hover>
                              <a href={`/user/${dog.dogID}`}>
                                <img
                                  src={defaultDogImg}
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
                      {/* <ul className='list-unstyled pt-4'>
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
                      </ul> */}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg='8' md='8' className='text-center'>
                  <MDBRow>
                    <MDBCol>
                      <div className='text-center mt-3'>
                        <h4>
                          <strong>{this.state.dogData.dogName}'s Feed</strong>
                        </h4>
                      </div>
                      <div style={{ marginTop: '20px', paddingLeft: '100px', paddingRight: '100px' }}>
                        <div className="form-group">
                          <form onSubmit={this.handleSubmit}>
                            <label htmlFor="exampleFormControlTextarea1">
                              Write New Post:
                          </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="2"
                              value={this.state.postValue}
                              name='post'
                              onChange={this.handleChange}
                            />
                            <ProfileUpload value={this.state.imgValue} name='upload' onChange={this.handleChange} />
                            <MDBBtn
                              type='submit'
                              className='btn btn-rounded blue-gradient'
                            >
                              Post <MDBIcon icon='image' className='ml-1' />
                            </MDBBtn>
                          </form>
                        </div>
                        {/* <div className='d-flex justify-content-around'>
                        </div> */}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <SocialPage2 />
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
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