import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBtn, MDBIcon } from "mdbreact";

const FooterPage = () => {
    return (
        <MDBFooter color="aqua-gradient" className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">SocialHound</h5>
                        <p>
                            The World's First Social Network for Dogs!
                        </p>
                        <MDBContainer className='text-left'>
                            <MDBBtn href='https://www.facebook.com/SocialHound-110112560760116' target='_blank' size="lg" tag="a" floating social="fb">
                                <MDBIcon fab icon="facebook-f" target='_blank' />
                            </MDBBtn>
                            <MDBBtn href='https://twitter.com/socialhoundco' target='_blank' size="lg" tag="a" floating social="tw">
                                <MDBIcon fab icon="twitter" target='_blank' />
                            </MDBBtn>
                            <MDBBtn href='https://www.instagram.com/socialhound.co.beta/' target='_blank' size="lg" tag="a" floating social="ins">
                                <MDBIcon fab icon="instagram" target='_blank' />
                            </MDBBtn>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol md="6" className='text-right pr-2'>
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