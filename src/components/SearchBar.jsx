import React from 'react';
import { MDBCol, MDBFormInline, Button } from 'mdbreact';

const SearchPage = () => {
  return (
    <MDBCol md="6">
      <MDBFormInline className="md-form">
        <input className="form-control form-control-sm ml-2 w-200" type="text" placeholder="Enter Furends Name" aria-label="Search" />
        <Button type='submit' size='sm' className='btn-rounded aqua-gradient' >Search</Button>
      </MDBFormInline>
    </MDBCol>
  );
}
export default SearchPage;