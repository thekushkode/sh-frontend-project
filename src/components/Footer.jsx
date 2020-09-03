import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBtn, MDBIcon } from "mdbreact";

const FooterPage = () => {
    return (
        <MDBFooter color="aqua-gradient" className="font-small pt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="6">
                        <h5 className="title">SocialHound</h5>
                        <p>
                            The World's First Social Network for Dogs!
                        </p>
                        <MDBContainer className='text-center text-md-left'>
                            <MDBBtn href='https://www.facebook.com/SocialHound-110112560760116' target='_blank' size="lg" tag="a" floating social="fb">
                                <MDBIcon fab icon="facebook-f" target='_blank' />
                            </MDBBtn>
                            <MDBBtn href='https://twitter.com/socialhoundco' target='_blank' size="lg" tag="a" floating social="tw">
                                <MDBIcon fab icon="twitter" target='_blank' />
                            </MDBBtn>
                            <MDBBtn href='https://www.instagram.com/socialhound.co/' target='_blank' size="lg" tag="a" floating social="ins">
                                <MDBIcon fab icon="instagram" target='_blank' />
                            </MDBBtn>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol md="6" className='pr-5 text-md-right'>
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
                <MDBContainer fluid className='d-flex justify-content-between'>
                    &copy; {new Date().getFullYear()} Copyright: SocialHound
                    <p>Powered by: <a href='https://www.goatwebdesigns.com' target='_blank' rel="noopener noreferrer">Goat Web Design</a></p>
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default FooterPage;