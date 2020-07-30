import React, { Component } from 'react';
import {
    MDBNavbarNav, MDBNavItem, MDBBtn, MDBCollapse, MDBHamburgerToggler
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from '../firebase';

class Hamburger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            user: '',
            dogData: [],
            postValue: '',
            imgValue: '',
            allDogData: [],
            feedImgURL: '',
            hidden: true,
            playDates: false,
            photos: [],
            collapse1: false,
            collapseID: ''
        };
    }
    // state = {
    //     collapse1: false,
    //     collapseID: ''
    // }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
    }

    toggleSingleCollapse = collapseId => {
        this.setState({
            ...this.state,
            [collapseId]: !this.state[collapseId]
        });
    }

    deletePost = (id) => () => {
        const db = firebase.firestore();
        db.collection('Feed').doc(id)
            .delete()
            .then(function () {
                alert('Post Successfully Deleted')
            })
    }

    render() {
        return (
            <>
                <MDBHamburgerToggler color="#e0e0e0" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
                <MDBCollapse isOpen={this.state.collapse1} navbar>
                    {/* <MDBNavbarNav right>
                        <MDBNavItem active>
                            Edit
                        </MDBNavItem>
                        <MDBNavItem>
                            Delete
                        </MDBNavItem>

                    </MDBNavbarNav> */}
                    <MDBBtn size='sm' className='purple-gradient btn-rounded'>Edit</MDBBtn>
                    <MDBBtn size='sm' className='blue-gradient btn-rounded' onClick={this.deletePost}>Delete</MDBBtn>
                </MDBCollapse>
            </>

        );
    }
}

export default Hamburger;