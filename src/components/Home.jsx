import React, { useState } from 'react';
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
import firebase from '../firebase';
import FooterPage from './Footer';
import FeaturesPage from './Features';
import { useHistory, Link } from "react-router-dom";

function Home(props) {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const newUser = (e) => {
        // authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    email: email
                })
                
                const db = firebase.firestore();
                history.push('/newprofile')
                //create user in Users db
                db.collection('Users').doc(createdUser.user.uid).set({
                    email: email,
                })
                    .then(doc => {
                        props.history.push('/newprofile')
                    })
                    .catch(err => console.error(err))

                })
                history.push('/newprofile')
    }

    return (
        <div id='classicformpage'>
            <header>
                
            </header>
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
                                Social Hound is the 1st social media platform made just for your pup. Use the sign-up form to get started and once signed-in, you'll be able to create your pup's profile, find friend's location and posts, set-up play dates, and search for places you and your pup can enjoy together! We hope you enjoy SocialHound and making new fur-ends!
                                </h6>
                            <MDBBtn outline color='white'>
                                <Link style={{ textDecoration: 'none', color: 'white' }}>Learn More</Link>
                                </MDBBtn>
                        </MDBAnimation>

                        <MDBCol md='6' xl='5' className='mb-4'>
                            <MDBAnimation type='fadeInRight' delay='.3s'>
                                <MDBCard id='classic-card'>
                                    <MDBCardBody className='white-text'>
                                        <h3 className='text-center'>
                                            <MDBIcon icon='user' /> Register
                                            </h3>
                                        <hr className='hr-light' />

                                        <MDBInput
                                            className='white-text'
                                            iconClass='white-text'
                                            label='Email'
                                            icon='envelope'
                                            name='email'
                                            containerClass="text-left"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                        <MDBInput
                                            className='white-text'
                                            iconClass='white-text'
                                            label='Password'
                                            icon='lock'
                                            type='password'
                                            name='password'
                                            containerClass="text-left"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />

                                        <div className='text-center mt-4 black-text'>
                                            <MDBBtn color='indigo' onClick={newUser}>Sign Up</MDBBtn>
                                            <h6 className='white-text'>Already have an account? <Link to='/login'>Sign In!</Link></h6>
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
                <FeaturesPage />
            </MDBContainer>
            <footer>
                <FooterPage />
            </footer>
        </div>
    );
}

export default Home;