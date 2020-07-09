import React from "react";
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Jon from './images/jon.gif';
import Gerrit from './images/gerrit.gif';
import Logan from './images/logan.gif';

class DogResults extends React.Component {
    render() {
        return (
            <MDBContainer className="mt-2">
                <MDBRow>
                    <MDBCol md="4">
                        <MDBView hover>
                            <img
                                src={Jon}
                                className="img-fluid rounded-circle"
                                alt=""
                            />
                            <MDBMask className="flex-center flex-column" overlay="blue-strong">
                                <p className="white-text">Dog Name</p>
                                <p className="white-text">Dog Breed</p>
                            </MDBMask>
                        </MDBView>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBView hover>
                            <img
                                src={Gerrit}
                                className="img-fluid rounded-circle"
                                alt=""
                            />
                            <MDBMask className="flex-center" overlay="blue-strong">
                                <p className="white-text">Dog Name</p>
                                <p className="white-text">Dog Breed</p>
                            </MDBMask>
                        </MDBView>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBView hover>
                            <img
                                src={Logan}
                                className="img-fluid rounded-circle"
                                alt=""
                            />
                            <MDBMask className="flex-center" overlay="blue-strong">
                                <p className="white-text">Dog Name</p>
                                <p className="white-text">Dog Breed</p>
                            </MDBMask>
                        </MDBView>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        );
    }
}

export default DogResults;