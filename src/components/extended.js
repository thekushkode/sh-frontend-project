import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBIcon,
  MDBBadge,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBInput,
  MDBAvatar,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import './extended.css';
import Ike from './images/ike.png';
import SocialPage2 from './feed2';
import FooterPage from './Footer';
import firebase from '../firebase';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';



class PExtended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spayneut: false,
      wordpress: false,
      angular: false,
      mdb: false,
      community: false,
      pro: false,
      send: false,
      submit: false,
      user: '',
      dogData: {}
    };
  }



  componentDidMount() {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let currDog = this;
    if (user) {
      console.log(user)
      // User is signed in.
      db.collection("Dogs")
        .where('ownerId', '==', user.uid)
        .get()
        .then(function (querySnapshot) {
          let data;
          querySnapshot.forEach(function (doc) {
            data = doc.data();
            console.log(data)
            currDog.setState({
              dogData: data,
              user: user
            })
          })
        })
    } else {
      alert('Please log-in or create an account.');
    }
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
                      alt='Rottweiler dog photo'
                      width='400'
                      src={Ike}
                      className='rounded-circle z-depth-1-half mb-4'
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
                        {this.state.dogData.bio}
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

                      <MDBBtn
                        color='light-blue'
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        Neutered | Spayed: {this.state.dogData.spayNeut}
                      </MDBBtn>
                      <MDBBtn
                        color='blue-grey'
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        {this.state.dogData.temperament}
                      </MDBBtn>
                      <MDBBtn
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        Has Vaccines: {this.state.dogData.vaccines}
                      </MDBBtn>
                      <MDBBtn
                        color='secondary'
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        {this.state.dogData.size}
                      </MDBBtn>
                      <MDBBtn
                        color='deep-purple'
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        {this.state.dogData.breed}
                      </MDBBtn>
                      <MDBBtn
                        color='indigo'
                        size='sm'
                        rounded
                        className='px-3'
                      >
                        {this.state.dogData.city}
                      </MDBBtn>
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
                          <label htmlFor="exampleFormControlTextarea1">
                            Write New Post:
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                          />
                        </div>
                        <div className='d-flex justify-content-around'>
                          <ProfileUpload />
                          <MDBBtn
                          className='btn btn-rounded blue-gradient'
                          onClick={() => {
                            this.toggle('submit');
                          }}
                          >
                          Post <MDBIcon icon='image' className='ml-1' />
                        </MDBBtn>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <div className='ml-5 mt-3'>
                        <ProfileFeed />
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

export default PExtended;
