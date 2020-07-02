import React from 'react';
import MDBFileupload from 'mdb-react-fileupload';
import Ike from './ike.png';

const Upload = () => {
    return (
        <MDBFileupload defaultFileSrc={Ike} />
    );
};

export default Upload;