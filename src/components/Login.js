import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBIcon,
  MDBView,
  MDBBtn
} from 'mdbreact';
import './Login.css';
import FooterPage from './Footer';
import firebase from '../firebase';
import { setProfile } from '../redux/actions';
import { connect } from 'react-redux';

let db = firebase.firestore();


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      email: '',
      password: '',
      user: ''
    };

  }


  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  userSignIn = (e) => {
    // authentication
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        let userData = {}
        db.collection("Users") //user.email
          .where("email", "==", this.state.email).limit(1).get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              userData = { data: doc.data(), id: doc.id }
            })
          }).then(res => {
            this.props.setProfile(userData)
          })
        this.props.history.push('/profile')
      })
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='classic-form-page' id='login'>
        <MDBView>
          <MDBMask
            className='d-flex justify-content-center align-items-center'
            overlay='stylish-strong'
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      <div className='form-header aqua-gradient'>
                        <h3>
                          <MDBIcon
                            icon='user'
                            className='mt-2 mb-2 text-white'
                          />{' '}
                          Login
                        </h3>
                      </div>
                      <MDBInput
                        type='email'
                        name='email'
                        label='Email'
                        icon='envelope'
                        iconClass='white-text'
                        containerClass="text-left"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <MDBInput
                        type='password'
                        name='password'
                        label='Password'
                        icon='lock'
                        iconClass='white-text'
                        containerClass="text-left"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <div className='text-center mt-3 black-text'>
                        <MDBBtn className='blue-gradient' size='lg' onClick={this.userSignIn}>
                          Sign In
                        </MDBBtn>
                        <hr />
                      </div>
                      <div className='inline-ul text-center d-flex justify-content-center'>
                        <a href='https://twitter.com/socialhoundco'>
                          <MDBIcon
                            fab
                            icon='twitter'
                            size='lg'
                            className='p-2 m-2  white-text'
                          />
                        </a>
                        <a href='https://www.facebook.com/SocialHound-110112560760116'>
                          <MDBIcon
                            fab
                            icon='facebook-f'
                            size='lg'
                            className='p-2 m-2 white-text'
                          />{' '}
                        </a>
                        <a href='https://www.instagram.com/socialhound.co/'>
                          <MDBIcon
                            fab
                            icon='instagram'
                            size='lg'
                            className='p-2 m-2 white-text'
                          />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <footer>
          <FooterPage />
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setProfile
}

export default connect(
  null,
  mapDispatchToProps,
)(Login);
