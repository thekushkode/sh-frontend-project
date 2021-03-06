import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';


class NotLogged extends Component {
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
            this.props.history.push('/')
        }).catch(function (error) {
            console.log(error);
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
                                <MDBNavLink to='/about'>About</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to='/contact'>Contact</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBBtn href='https://twitter.com/socialhoundco' target='_blank' tag="a" color='white' size='sm' floating social="tw">
                                    <MDBIcon fab icon="twitter" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBBtn href='https://www.instagram.com/socialhound.co.beta/' target='_blank' size="sm" tag="a" floating social="ins">
                                    <MDBIcon fab icon="instagram" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBBtn href='https://www.facebook.com/SocialHound-110112560760116' target='_blank' size="sm" tag="a" floating social="fb">
                                    <MDBIcon fab icon="facebook-f" />
                                </MDBBtn>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret className='mt-2'>
                                        <MDBIcon icon="user" size='lg' />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem className='p-0'><MDBNavLink to='/' className='black-text'>Sign-up</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink to='/login' className='black-text'>Sign-in</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink to='/contact' className='black-text'>Get Help</MDBNavLink></MDBDropdownItem>
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

export default NotLogged;