// getDogData = () => {
//   let user = firebase.auth().currentUser;
//   if (user) {
//     if (this.props.match.params.dogId) {
//       console.log(this.props.match.params.dogId)
//       db.collection("Dogs")
//         .doc(this.props.match.params.dogId)
//         .get()
//         .then(this.storeDogData)
//     } else {
//       console.log(user)
//       // User is signed in.
//       db.collection("Dogs")
//         .where('ownerId', '==', user.uid)
//         .get()
//         .then(this.storeDogData)
//     }
//   } 
// }

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


class DogProfile extends Component {
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
    if (user) {
      if (this.props.match.params.dogId) {
        console.log(this.props.match.params.dogId)
        db.collection("Dogs")
          .doc(this.props.match.params.dogId)
          .get()
          .then(doc => {
            // let data = [];
            const dogData = {
              ...doc.data(),
              dogId: doc.id
            }
            // data.push(dogData)
            this.setState({
              dogData: dogData,
              user: user
            })
          })
        // .then(function (querySnapshot) {
        //   console.log(querySnapshot)
        //   let data = [];
        //   querySnapshot.forEach(doc => {
        //     const dogData = {
        //       ...doc.data(),
        //       dogId: doc.id
        //     }
        //     data.push(dogData);
        //   })
        //   console.log(data)
        //   this.setState({
        //     dogData: data,
        //     user: user
        //   })
        // })
      }
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
            <MDBContainer fluid>
              <MDBRow>
                <MDBCol lg='4' md='4'>
                  <MDBCard className='profile-card text-center mb-4'>
                    <MDBAvatar
                      tag='img'
                      alt='Dog photo'
                      width='400'
                      style={{ margin: '0 auto' }}
                      src={this.state.dogData.avatar}
                      className='rounded-circle z-depth-1-half mb-4 mt-3'
                    />
                    <MDBCardBody>
                      <MDBCardTitle>
                        <strong>{this.state.dogData.dogName}</strong>
                      </MDBCardTitle>
                      <h5>
                        Chief Executive Log Lifter
                    </h5>
                      <p className='dark-grey-text'>{this.state.dogData.city}, {this.state.dogData.userState}</p>
                      <MDBBtn floating tag='a' className='morpheus-den-gradient'>
                        <MDBIcon fab icon='facebook' className='white-text' />
                      </MDBBtn>
                      <MDBBtn floating tag='a' className='young-passion-gradient'>
                        <MDBIcon fab icon='instagram' className='white-text' />
                      </MDBBtn>
                      <p className='card-text mt-3'>
                        Bio: {this.state.dogData.bio}
                      </p>
                      <MDBBtn
                        className='purple-gradient'
                        size='sm'
                        rounded
                        href='/editprofile'
                      >
                        Edit Profile
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
                        href='#!'
                      >
                        Follow {this.state.dogData.dogName}
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
                        <div className='d-flex justify-content-around'>
                        </div>
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
          </div>
        </main>
        <footer>
          <FooterPage />
        </footer>
      </div>
    );
  }
}

export default DogProfile;