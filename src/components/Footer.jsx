import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBtn, MDBIcon } from "mdbreact";

const FooterPage = () => {
    return (
        <MDBFooter color="aqua-gradient" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">Social Hound</h5>
                        <p>
                            The worlds first social network for dogs!
                        </p>
                        <MDBContainer>
                            <MDBBtn href='https://www.facebook.com/SocialHound-110112560760116' size="lg" tag="a" floating social="fb">
                                <MDBIcon fab icon="facebook-f" />
                            </MDBBtn>
                            <MDBBtn href='https://twitter.com/socialhoundco' size="lg" tag="a" floating social="tw">
                                <MDBIcon fab icon="twitter" />
                            </MDBBtn>
                            <MDBBtn href='https://www.instagram.com/socialhound.co/' size="lg" tag="a" floating social="ins">
                                <MDBIcon fab icon="instagram" />
                            </MDBBtn>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol md="6">
                        <ul>
                            <li className="list-unstyled">
                                <a href="/about">About</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="/contact">Contact</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="/terms">Terms & Conditions</a>
                            </li>
                            <li className="list-unstyled">
                                <a href="/privacy">Privacy</a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: SocialHound
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;