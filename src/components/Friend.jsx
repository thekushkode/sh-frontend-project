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
import { useLocation } from 'react-router-dom'



class Friend extends Component {
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
      dogData: []
    };
  }

  
  componentDidMount() {
    const db = firebase.firestore();
    let user = firebase.auth().currentUser;
    let currDog = this;
    console.log(this.props.location.pathname.slice(8));
    let friend = this.props.location.pathname.slice(8);
    // if (user) {
      // console.log(user)
      // User is signed in.
      db.collection("Dogs")
        // .where('dogName', '==', friend)
        .where('zipcode', '==', friend)
        .get()
        .then(function (querySnapshot) {
          console.log(querySnapshot)
          let data = [];
          querySnapshot.forEach(function (doc) {
            data.push(doc.data());
          })
          console.log(data)
          currDog.setState({
            dogData: data,
            user: user
          })
        })
    // } else {
    //   alert('Please log-in or create an account.');
    // }
  }

  toggle = item => {
    console.log(item);
    this.setState({
      [item]: !this.state[item]
    });
  };

  renderModal = type => {
    const string =
      type === 'spayneut'
        ? 'Spayed or Neutered'
        : type === 'wordpress'
          ? 'Wordpress Master'
          : type === 'angular'
            ? 'Angular Master'
            : type === 'mdb'
              ? 'MDB Master'
              : type === 'community'
                ? 'Community Contributor'
                : type === 'pro'
                  ? 'MDB Pro User'
                  : type === 'send'
                    ? 'New Message'
                    : type === 'submit'
                      ? 'Submit new project'
                      : false;
    const icon =
      type === 'send' ? 'envelope-o' : type === 'submit' ? 'file' : 'trophy';
    const lBtnTxt = type === 'send' ? 'cancel' : 'close';
    const rBtnTxt =
      type === 'send' ? 'send' : type === 'submit' ? 'submit ' : 'Go to';
    const rBtnIcon =
      type === 'send'
        ? 'paper-plane'
        : type === 'submit'
          ? 'check'
          : 'arrow-right';

    return (
      <MDBModal
        isOpen={this.state[type]}
        toggle={() => this.toggle(type)}
        cascading
      >
        <MDBModalHeader
          toggle={() => this.toggle(type)}
          className='light-blue darken-3 white-text'
        >
          <MDBIcon icon={icon} className='mr-2' /> {string}
        </MDBModalHeader>
        <MDBModalBody>
          {type === 'send' ? (
            <MDBInput type='textarea' label='Your message' rows={15} />
          ) : type === 'submit' ? (
            <div>
              <MDBInput type='text' label='Project name' />
              <MDBInput type='text' label='Project URL address' />
              <MDBInput type='text' label='Image URL' />
              <MDBInput type='textarea' label='Description' />
            </div>
          ) : (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
                  quibusdam modi veritatis non accusamus distinctio consequuntur
                  aliquam, assumenda tempore in illum aspernatur quia, minus ex!
                  Eius tenetur praesentium, consectetur quod!
                </p>
              )}
        </MDBModalBody>
        <MDBModalFooter center>
          <MDBBtn outline color='primary' onClick={() => this.toggle(type)}>
            {lBtnTxt}
          </MDBBtn>
          <MDBBtn color='primary'>
            {rBtnTxt} <MDBIcon icon={rBtnIcon} className='ml-1' />
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  };
  render() {
    return (
      <div>
        <header style={{ marginBottom: '100px' }}>
        </header>
        <main>

          <div id='profile-ex' className='mb-5 mt-4 mx-4'>
            {this.renderModal('wordpress')}
            {this.renderModal('bootstrap')}
            {this.renderModal('angular')}
            {this.renderModal('mdb')}
            {this.renderModal('community')}
            {this.renderModal('pro')}
            {this.renderModal('send')}
            {this.renderModal('submit')}

            <MDBContainer fluid>
            { this.state.dogData && this.state.dogData.map(dog => {
              return (
                <div>
                  <MDBRow>
                    <MDBCol lg='4' md='12'>
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
                            <strong>{dog.dogName}</strong>
                          </MDBCardTitle>
                          <p className='card-text mt-3'>
                            <b>Breed: </b>{dog.breed}
                          </p>
                          <p className='card-text mt-3'>
                            <b>Bio: </b>{dog.bio}
                          </p>
                          <p className='dark-grey-text'>{dog.city}, {dog.userState}</p>
                          
                          <p className='card-text mt-3'>
                          <MDBBtn floating tag='a' className='morpheus-den-gradient'>
                            <MDBIcon fab icon='facebook' className='white-text' />
                          </MDBBtn>
                          <MDBBtn floating tag='a' className='young-passion-gradient'>
                            <MDBIcon fab icon='instagram' className='white-text' />
                          </MDBBtn>
                          </p>
                          {/* <MDBCard className='mb-4'>
                        <MDBCardBody className='text-center'> */}
                          <h5>
                            <strong>{dog.dogName}'s Badges</strong>
                          </h5>
                          <hr className='my-3' />
                          <MDBBtn
                            color='light-blue'
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('bootstrap')}
                          >
                            Neutered | Spayed: {dog.spayNeut}
                      </MDBBtn>
                          <MDBBtn
                            color='blue-grey'
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('wordpress')}
                          >
                            {dog.temperament}
                      </MDBBtn>
                          <MDBBtn
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('angular')}
                          >
                            Has Vaccines: {dog.vaccines}
                      </MDBBtn>
                          <MDBBtn
                            color='secondary'
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('mdb')}
                          >
                            {dog.size}
                      </MDBBtn>
                          <MDBBtn
                            color='deep-purple'
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('community')}
                          >
                            {dog.breed}
                      </MDBBtn>
                          <MDBBtn
                            color='indigo'
                            size='sm'
                            rounded
                            className='px-3'
                            onClick={() => this.toggle('pro')}
                          >
                            {dog.city}
                      </MDBBtn>
                        {/* </MDBCardBody>
                      </MDBCard> */}
                        </MDBCardBody>
                        <MDBCardFooter>
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
                            Follow {dog.dogName}
                        </MDBBtn>
                        </MDBCardFooter>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              )
              })
            }
            <MDBPagination circle className='my-4 float-right'>
                <li className='page-item disabled clearfix d-none d-md-block'>
                  <a className='page-link' href='#!'>
                    First
              </a>
                </li>
                <MDBPageItem disabled>
                  <MDBPageNav className='page-link' aria-label='Previous'>
                    <span aria-hidden='true'>&laquo;</span>
                    <span className='sr-only'>Previous</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active>
                  <MDBPageNav className='page-link'>
                    1 <span className='sr-only'>(current)</span>
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link'>2</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link'>3</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link'>4</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link'>5</MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link' aria-label='Next'>
                    <span aria-hidden='true'>&raquo;</span>
                    <span className='sr-only'>Next</span>
                  </MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
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

export default Friend;