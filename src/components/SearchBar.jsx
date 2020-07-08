import React from 'react';
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact';
const SearchPage = () => {
  return (
    <div style={{marginTop: '100px', marginBottom: '0px', paddingBottom: '0px'}}>
      {/* <h1>Hello World</h1> */}
    <MDBCol md="6">
      <MDBFormInline className="md-form">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
      </MDBFormInline>
    </MDBCol>
    </div>
  );
}
export default SearchPage;