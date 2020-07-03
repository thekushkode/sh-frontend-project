import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer
} from "mdbreact";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';


class NavbarPage extends Component {
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
            console.log(error);
            alert('No User Logged In.')
        });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/'/>
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
                                <MDBNavLink to="/feed2">My Feed</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/profile">Profile</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        Discover
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" color="aqua-gradient">
                                        <MDBDropdownItem href="/furends">Find Furiends</MDBDropdownItem>
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
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink className="waves-effect waves-light" to="https://twitter.com/socialhoundco">
                                    <MDBIcon fab icon="twitter" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="waves-effect waves-light" to="https://www.instagram.com/socialhound.co/">
                                    <MDBIcon fab icon="instagram" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="waves-effect waves-light" to="https://www.facebook.com/SocialHound-110112560760116">
                                    <MDBIcon fab icon="facebook" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem to="/editprofile">Settings</MDBDropdownItem>
                                        <MDBDropdownItem to="/profile">Profile</MDBDropdownItem>
                                        <MDBDropdownItem to=".login">Sign-in</MDBDropdownItem>
                                        <MDBDropdownItem onClick={this.signOut}>Sign-out</MDBDropdownItem>
                                        <MDBDropdownItem to="/contact">Get Help</MDBDropdownItem>
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

export default NavbarPage;