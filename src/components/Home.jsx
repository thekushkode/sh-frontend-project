import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBAnimation
} from 'mdbreact';
import './Home.css';
import Background from './background.gif';
import NavbarPage from './Nav';

class Home extends React.Component {


    render() {
        return (
            <div id='classicformpage'>
                <div>
                    <NavbarPage />
                </div>

                <MDBView>
                    <MDBMask className='d-flex justify-content-center align-items-center gradient' />
                    <MDBContainer
                        style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
                        className='mt-1 d-flex justify-content-center align-items-center'
                    >
                        <MDBRow>
                            <MDBAnimation
                                type='fadeInLeft'
                                delay='.3s'
                                className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'
                            >
                                <h1 className='h1-responsive font-weight-bold'>
                                    Welcome to Social Hound!
                                </h1>
                                <hr className='hr-light' />
                                <h6 className='mb-4'>
                                    Social Hound is the 1st social media platform made just for your pup. Use the sign-up form to get started and once signed-in, you'll be able to create your pup's profile, find friend's location and posts, set-up play dates, and search for places you and your pup can enjoy together!<br/><br/>Socialization is one of the most important things you can do for your dog. Dogs are social by nature and exposure to other dogs and animals gives many more opportunities to explore with your pup outside of your yard. We hope you enjoy SocialHound and making new fur-ends!
                                </h6>
                                <MDBBtn outline color='white'>
                                    Learn More
                                </MDBBtn>
                            </MDBAnimation>

                            <MDBCol md='6' xl='5' className='mb-4'>
                                <MDBAnimation type='fadeInRight' delay='.3s'>
                                    <MDBCard id='classic-card'>
                                        <MDBCardBody className='white-text'>
                                            <h3 className='text-center'>
                                                <MDBIcon icon='user' /> Register:
                                            </h3>
                                            <hr className='hr-light' />
                                            
                                            <MDBInput
                                                className='white-text'
                                                iconClass='white-text'
                                                label='Your Name'
                                                icon='user'
                                            />
                                            <MDBInput
                                                className='white-text'
                                                iconClass='white-text'
                                                label='Your Email'
                                                icon='envelope'
                                            />
                                            <MDBInput
                                                className='white-text'
                                                iconClass='white-text'
                                                label='Your Password'
                                                icon='lock'
                                                type='password'
                                            />
                                            <MDBInput
                                                className='white-text'
                                                iconClass='white-text'
                                                label='Zip Code'
                                                icon='map-pin'
                                            />
                                            <div className='text-center mt-4 black-text'>
                                                <MDBBtn color='indigo'>Sign Up</MDBBtn>
                                                <hr className='hr-light' />
                                                <div className='text-center d-flex justify-content-center white-label'>
                                                    <a href='#!' className='p-2 m-2'>
                                                        <MDBIcon
                                                            fab
                                                            icon='twitter'
                                                            className='white-text'
                                                        />
                                                    </a>
                                                    <a href='#!' className='p-2 m-2'>
                                                        <MDBIcon
                                                            fab
                                                            icon='facebook'
                                                            className='white-text'
                                                        />
                                                    </a>
                                                    <a href='#!' className='p-2 m-2'>
                                                        <MDBIcon
                                                            fab
                                                            icon='instagram'
                                                            className='white-text'
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBAnimation>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBView>

                <MDBContainer>
                    <MDBRow className='py-5'>
                        <MDBCol md='12' className='text-center'>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Home;