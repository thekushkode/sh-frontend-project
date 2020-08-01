import React, { useEffect } from 'react'
import SocialPage2 from './feed2'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import FooterPage from './Footer';
import Ads from './Ads';

export default function PublicFeed() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <header style={{ marginBottom: '80px' }}>

            </header>
            <div style={{ backgroundColor: '#e1f5fe' }}>
                <MDBRow className='d-flex'>
                    <SocialPage2 />

                    <MDBCol md='4'>
                        <Ads />
                    </MDBCol>
                </MDBRow>
            </div>
            <FooterPage />
        </div >
    )
}
