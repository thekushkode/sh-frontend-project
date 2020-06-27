import React from 'react';
import { MDBContainer } from 'mdbreact';
import NavbarPage from './Nav';

import GoogleMapReact from 'google-map-react';

const MFull = () => {
  const location = { lat: 33.753746, lng: -84.386330 };

  return (
    <div id='maps-full' className='mt-4'>
      <header>
        <NavbarPage />
      </header>
      <MDBContainer fluid>
        <GoogleMapReact
          defaultCenter={location}
          defaultZoom={14}
          style={{ height: '100vh' }}
        />
      </MDBContainer>
    </div>
  );
};

export default MFull;
