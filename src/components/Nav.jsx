import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer, MDBBtn } from "mdbreact";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggedOut, unSetPrivateFeed, clearMessages } from '../redux/actions/index'


class NavbarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            redirect: false,
            inbox: '',
            user: '',
            dogData: []
        };
    }


    // ComponentDidMount & DidUpdate not working correctly...
    componentDidMount() {
        console.log(this.props)
        const db = firebase.firestore();
        let user = firebase.auth().currentUser;
        if (user) {
            if (this.props.profile.id) {
                db.collection("Dogs")
                    .doc(this.props.profile.id)
                    .get()
                    .then(doc => {
                        const dogData = {
                            ...doc.data(),
                            dogId: doc.id
                        }
                        this.setState({
                            dogData: dogData,
                            user: user
                        })
                    })
            }

        }
    }

    componentDidUpdate(prevProps) {
        let dogId = this.props.profile.id;
        if (prevProps.profile.id !== dogId) {
            const db = firebase.firestore();
            let user = firebase.auth().currentUser;
            if (user) {
                db.collection('Dogs').doc(this.props.profile.id)
                    .get()
                    .then(doc => {
                        const dogData = {
                            ...doc.data(),
                            dogId: doc.id
                        }
                        this.setState({
                            dogData: dogData,
                            user: user
                        })
                    })
            }
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    signOut = (e) => {
        firebase.auth().signOut().then(() => {
            this.setState({
                redirect: true
            })
            this.props.unSetPrivateFeed()
            this.props.clearMessages()
            this.props.loggedOut()
            this.props.history.push('/')
        }).catch(function (error) {
            console.log(error);
            // alert('No User Logged In.')
        });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        console.log(this.props.inbox)
        console.log(this.props.inbox.length)
        return (
            <MDBNavbar color="aqua-gradient" dark expand="md" scrolling fixed="top">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <MDBNavLink to="/"><strong className="white-text">SocialHound</strong></MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            {this.props.profile && (
                                <MDBNavItem>
                                    <MDBNavLink to={`/profile/${this.props.profile.id}`}>Profile</MDBNavLink>
                                </MDBNavItem>
                            )}
                            <MDBNavItem>
                                <MDBNavLink to='/messages'>
                                    Messages
                                    {this.props.inbox.length >= 1 && <span class="badge badge-pill badge-danger ml-1 mb-1">{this.props.inbox.length}</span>}
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        Discover
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" color="aqua-gradient">
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/furends">Furends</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/outside">Go Outside</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/petcare">Boarding & Daycare</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/vets">Vets</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/adopt">Adopt</MDBNavLink></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        Feeds
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" color="aqua-gradient">
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/feed">Public Feed</MDBNavLink></MDBDropdownItem>
                                        <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to="/lost">Lost Dogs</MDBNavLink></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            {/* <MDBNavItem>
                                <MDBNavLink to="/feed">Feed</MDBNavLink>
                            </MDBNavItem> */}
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
                                    {this.props.profile && this.props.profile.data ?
                                        <MDBDropdownMenu className="dropdown-default">
                                            <div style={{ marginLeft: '8px' }}>
                                                <p>logged in as:</p>
                                                <p style={{ marginTop: "-15px" }}><b>{this.props.profile.data.ownerName}</b></p>
                                            </div>
                                            <hr />
                                            <MDBDropdownItem onClick={this.signOut}>Sign-out</MDBDropdownItem>
                                            <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to='/contact'>Get Help</MDBNavLink></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                        :
                                        <MDBDropdownMenu className="dropdown-default">
                                            <div style={{ marginLeft: '8px' }}>
                                                <p>logged in as:</p>
                                            </div>
                                            <hr />
                                            <MDBDropdownItem onClick={this.signOut}>Sign-out</MDBDropdownItem>
                                            <MDBDropdownItem className='p-0'><MDBNavLink className='black-text' to='/contact'>Get Help</MDBNavLink></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    }
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer >
            </MDBNavbar >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile,
        inbox: state.inbox
    }
}

const mapDispatchToProps = {
    loggedOut,
    unSetPrivateFeed,
    clearMessages
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarPage)

