import React from 'react'
import SocialPage2 from './feed2'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import FooterPage from './Footer';

export default function PublicFeed() {
    return (
        <div>
            <header style={{ marginBottom: '80px' }}>

            </header>
            <div style={{ backgroundColor: '#e1f5fe' }}>
                <MDBRow className='d-flex'>
                    <SocialPage2 />

                    <MDBCol md='4'>
                        <h1>AdSense</h1>
                    </MDBCol>
                </MDBRow>
            </div>
            <FooterPage />
        </div >
    )
}
