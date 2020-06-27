import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBContainer } from "mdbreact";
import NavbarPage from "./Nav";
import FooterPage from "./Footer";

const ContactPage = () => {
    return (
        <div>
            <header style={{ marginBottom: '100px' }}>
                <NavbarPage />
            </header>
            <main className='mt-4'>
                <MDBContainer className="my-5">
                    <h2 className="h1-responsive font-weight-bold text-center mt-4">
                        Contact us
                    </h2>
                    <p className="text-center w-responsive mx-auto pb-5">
                        Have questions about SocialHound? Use the form below to get in touch. A member of our team will back with you in no time!
                    </p>
                    <MDBRow>
                        <MDBCol lg="5" className="lg-0 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                    <div className="form-header blue accent-1">
                                        <h3 className="mt-2">
                                            <MDBIcon icon="envelope" /> Write to us:
                                        </h3>
                                    </div>
                                    <p className="dark-grey-text">
                                        We'll write rarely, but only the best content.
                                    </p>
                                    <div className="md-form">
                                        <MDBInput
                                            icon="user"
                                            label="Name"
                                            iconClass="grey-text"
                                            type="text"
                                            id="form-name"
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                            icon="envelope"
                                            label="Email"
                                            iconClass="grey-text"
                                            type="text"
                                            id="form-email"
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                            icon="tag"
                                            label="Subject"
                                            iconClass="grey-text"
                                            type="text"
                                            id="form-subject"
                                        />
                                    </div>
                                    <div className="md-form">
                                        <MDBInput
                                            icon="pencil-alt"
                                            label="Message"
                                            iconClass="grey-text"
                                            type="textarea"
                                            id="form-text"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn color="light-blue">Submit</MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        <MDBCol lg="7">
                            <div
                                id="map-container"
                                className="rounded z-depth-1-half map-container"
                                style={{ height: "400px" }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.74113915075!2d-84.56069130338265!3d33.76763376986689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1593213793237!5m2!1sen!2sus"
                                    title="Atlanta, Ga google map rendering"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                />
                            </div>
                            <br />
                            <MDBRow className="text-center">
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="map-marker-alt" />
                                    </MDBBtn>
                                    <p>Atlanta, GA 30305</p>
                                    <p className="mb-md-0">United States</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="phone" />
                                    </MDBBtn>
                                    <p>404.555.1234</p>
                                    <p className="mb-md-0">Mon - Fri, 9:00am-5:00pm</p>
                                </MDBCol>
                                <MDBCol md="4">
                                    <MDBBtn tag="a" floating color="blue" className="accent-1">
                                        <MDBIcon icon="envelope" />
                                    </MDBBtn>
                                    <p>woof@socialhound.co</p>
                                    <p className="mb-md-0">Email Us!</p>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </main>

            <FooterPage />
        </div>
    );
}

export default ContactPage;