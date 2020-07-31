import React from 'react';
import { MDBCard, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import './Ads.css';

const Ads = () => {
    return (
        <>
            <MDBRow>
                <MDBCol md='12' className='mr-2 my-2'>
                    <MDBCard
                        className='card-image bg1'
                    >
                        <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4'>
                            <div>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='chart-pie' /> Ad Space
                                </h5>
                                <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong>Advertise Here!</strong>
                                </MDBCardTitle>
                                <p>
                                    Get in front of your target audience with ads on SocialHound! Contact <a href='mailto:woof@socialhound.co'>woof@socialhound.co</a> for information and pricing. Amazing introductory rates available!
                                </p>
                                <MDBBtn href='mailto:woof@socialhound.co' color='pink'>
                                    <MDBIcon icon='paper-plane' /> Contact Us
                            </MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol md='12'>
                    <MDBCard
                        className='card-image bg2'
                    >
                        <div className='text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4'>
                            <div>
                                <h5 className='orange-text'>
                                    <MDBIcon icon='chart-pie' /> Ad Space
                                </h5>
                                <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong>Advertise Here!</strong>
                                </MDBCardTitle>
                                <p>
                                    Get in front of your target audience with ads on SocialHound! Contact <a href='mailto:woof@socialhound.co'>woof@socialhound.co</a> for information and pricing. Amazing introductory rates available!
                                </p>
                                <MDBBtn href='mailto:woof@socialhound.co' color='deep-orange'>
                                    <MDBIcon icon='paper-plane' /> Contact Us
                            </MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md='12' className='mr-2 my-2'>
                    <MDBCard
                        className='card-image bg3'

                    >
                        <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4'>
                            <div>
                                <h5 className='pink-text'>
                                    <MDBIcon icon='chart-pie' /> Ad Space
                                </h5>
                                <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong>Advertise Here!</strong>
                                </MDBCardTitle>
                                <p>
                                    Get in front of your target audience with ads on SocialHound! Contact <a href='mailto:woof@socialhound.co'>woof@socialhound.co</a> for information and pricing. Amazing introductory rates available!
                                </p>
                                <MDBBtn href='mailto:woof@socialhound.co' color='pink'>
                                    <MDBIcon icon='paper-plane' /> Contact Us
                            </MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol md='12'>
                    <MDBCard
                        className='card-image bg4'
                    >
                        <div className='text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4'>
                            <div>
                                <h5 className='orange-text'>
                                    <MDBIcon icon='chart-pie' /> Ad Space
                                </h5>
                                <MDBCardTitle tag='h3' className='pt-2'>
                                    <strong>Advertise Here!</strong>
                                </MDBCardTitle>
                                <p>
                                    Get in front of your target audience with ads on SocialHound! Contact <a href='mailto:woof@socialhound.co'>woof@socialhound.co</a> for information and pricing. Amazing introductory rates available!
                                </p>
                                <MDBBtn href='mailto:woof@socialhound.co' color='deep-orange'>
                                    <MDBIcon icon='paper-plane' /> Contact Us
                            </MDBBtn>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default Ads;