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
            </div>
        );

}

export default LoadingPage;