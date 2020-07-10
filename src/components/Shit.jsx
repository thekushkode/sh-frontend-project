//Logged/Not Logged Logic
var user = firebase.auth().currenUser
{ user ? <NavbarPage /> : <NotLoggedNav /> }


// dogresults component
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


// dogresults css
.scrollbar {
    overflow: scroll;
}

.scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
}

/* custom colors  */

.scrollbar-primary::-webkit-scrollbar {
    background-color: #F5F5F5;
}

.scrollbar-primary {
    scrollbar-color: #4285f4 #f5f5f5;
}

.scrollbar-primary::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #4285F4;
}


//inputpage component
import React, { Component } from "react";
import { MDBFileInput } from "mdbreact";

class InputPage extends Component {

    render() {
        return (
            <MDBFileInput />
        );
    }
}

export default InputPage;

//findfurends render function
render() {
    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    const containerStyle = {
        marginLeft: '20px',
        width: '60%',
        height: '80%',
    }


    const scrollContainerStyle = { width: "450px", maxHeight: "330px" };

    const { users } = this.state;
    //console.log({ users });


    return (
        <div>
            <header style={{ marginBottom: '100px' }}>
            </header>
            <main>
                <div className='d-flex flex-row justify-content-between'>
                    <div style={{ width: '500px' }}>
                        <Map
                            containerStyle={containerStyle}
                            google={this.props.google}
                            onClick={this.onMapClicked}
                            onReady={this.fetchPlaces}
                            zoom={10}

                            style={mapStyles}
                            initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                        >
                            {this.state.users.map((user, index, mapProps) => {
                                let address = users[index].street + ' ' + users[index].city + ', ' + users[index].userState + ' ' + users[index].zipcode;
                                // console.log(address);
                                return (
                                    <AddressMarker google={this.props.google} key={index} id={index} address={address} name={user.name}
                                        onClick={this.onMarkerClick} />

                                )
                            })}
                            {this.state.users.map((user, index) => {
                                return (
                                    < InfoWindow marker={this.state.activeMarker} key={index}
                                        visible={this.state.selectedPlace.id === index} name={user.name} >
                                        <div>
                                            <h4>{user.dogName}</h4>
                                            <p>{user.breed}</p>
                                            <p>{user.temperament}</p>
                                        </div>
                                    </InfoWindow >

                                )
                            })}
                        </Map>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '40%', paddingLeft: '30px' }}>
                        <div style={{ paddingLeft: '120px' }}>
                            <SearchPage />
                        </div>
                        <div className='scrollbar scrollbar-primary' style={scrollContainerStyle}>
                            <DogResults />
                            <DogResults />
                            <DogResults />
                            <DogResults />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
};

//notlogged nav

import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBBtn
} from "mdbreact";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';


class NotLoggedNav extends Component {
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
                                        <MDBDropdownItem href="/login">Sign-in</MDBDropdownItem>
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

export default NotLoggedNav;