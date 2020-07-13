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
import { connect } from 'react-redux';
import firebase from '../firebase';



class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      email: '',
      password: '',
      user: ''
    };

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
                            icon='envelope'
                            className='mt-2 mb-2 text-white'
                          />{' '}
                          Received!
                        </h3>
                      </div>
                      <h5 className='white-text'>
                        Thank you for your email.<br/>Someone will be back in touch shortly!
                      </h5>
                      <div className='text-center mt-3 white-text'>
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

export default ThankYou;
