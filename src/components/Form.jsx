import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

const FormPage = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol>
                    <form data-netlify="true" name='social hound contact'>
                        <p className="h5 text-center mb-4">Write to us</p>
                        <div className="grey-text">
                            <MDBInput label="Your name" name='name' icon="user" group type="text" validate error="wrong"
                                success="right" />
                            <MDBInput label="Your email" name='email' icon="envelope" group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Subject" name='subject' icon="tag" group type="text" validate error="wrong" success="right" />
                            <MDBInput type="textarea" name='message' rows="2" label="Your message" icon="pencil-alt" />
                        </div>
                        <div className="text-center">
                            <MDBBtn outline color="primary" type='submit'>
                                Send
                                <MDBIcon far icon="paper-plane" className="ml-1" />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default FormPage;