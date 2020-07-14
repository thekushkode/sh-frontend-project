import React from 'react';
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer
} from 'mdbreact';
import './LoadingPage.css';
import DogVid from './images/dogvid.mp4';
import Poster from './images/dogposter.png';

function LoadingPage() {


        return (
            <div id='videobackground'>
                <MDBView>
                    <MDBMask className='gradient'>
                        <video
                            className='video-intro'
                            poster={Poster}
                            muted
                            loop
                            autoPlay
                        >
                            <source
                                src={DogVid}
                                type='video/mp4'
                            />
                        </video>
                    </MDBMask>{' '}
                    <MDBContainer
                        className='d-flex justify-content-center align-items-center px-md-3 px-sm-0'
                        style={{ height: '100vh', width: '100%' }}
                    >
                        <MDBRow>
                            
                        </MDBRow>
                    </MDBContainer>
                </MDBView>

                <MDBContainer>
                    <MDBRow className='pt-5 pb-4'>
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

export default LoadingPage;