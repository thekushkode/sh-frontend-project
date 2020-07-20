import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBBtn
} from "mdbreact";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';


class LoggedNav extends Component {
    state = {
        isOpen: false,
        redirect: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    signOut = (e) => {
        firebase.auth().signOut().then(() => {
            this.setState({
                redirect: true
            })
            alert('You have been logged out!')
        }).catch(function (error) {
            // console.log(error);
            alert('No User Logged In.')
        });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <MDBNavbar color="aqua-gradient" dark expand="md" scrolling fixed="top">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <MDBNavLink to="/"><strong className="white-text">SocialHound</strong></MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        Discover
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" color="aqua-gradient">
                                        <MDBDropdownItem href="/furends">Find Furends</MDBDropdownItem>
                                        <MDBDropdownItem href="/outside">Go Outside</MDBDropdownItem>
                                        <MDBDropdownItem href="/petcare">Boarding & Daycare</MDBDropdownItem>
                                        <MDBDropdownItem href="/vets">PetCare</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/messages'>Messages</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/contact'>Contact</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/about'>About</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBBtn href='https://twitter.com/socialhoundco' tag="a" color='white' size='sm' floating social="tw">
                                    <MDBIcon fab icon="twitter" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBBtn href='https://www.instagram.com/socialhound.co/' size="sm" tag="a" floating social="ins">
                                    <MDBIcon fab icon="instagram" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBBtn href='https://www.facebook.com/SocialHound-110112560760116' size="sm" tag="a" floating social="fb">
                                    <MDBIcon fab icon="facebook-f" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret className='mt-2'>
                                        <MDBIcon icon="user" size='lg' />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem>signed in as:</MDBDropdownItem>
                                        <MDBDropdownItem>[blank]</MDBDropdownItem>
                                        {/* <MDBDropdownItem href="/login">Sign-in</MDBDropdownItem> */}
                                        <MDBDropdownItem onClick={this.signOut}>Sign-out</MDBDropdownItem>
                                        <MDBDropdownItem href="/contact">Get Help</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        );
    }
}

export default LoggedNav;