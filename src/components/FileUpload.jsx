import React from 'react';
import MDBFileupload from 'mdb-react-fileupload';
import Ike from './images/ike.png';

const Upload = () => {
    return (
        <MDBFileupload defaultFileSrc={Ike} />
    );
};

export default Upload;