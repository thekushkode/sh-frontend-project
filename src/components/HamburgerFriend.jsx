import React, { Component } from 'react';
import {
    MDBNavbarNav, MDBNavItem, MDBCollapse, MDBHamburgerToggler
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class HamburgerFriend extends Component {
    state = {
        collapse1: false,
        collapseID: ''
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
    }

    toggleSingleCollapse = collapseId => {
        this.setState({
            ...this.state,
            [collapseId]: !this.state[collapseId]
        });
    }

    render() {
        return (
            <>
                <MDBHamburgerToggler color="#33b5e5" id="hamburger1" onClick={() => this.toggleSingleCollapse('collapse1')} />
                <MDBCollapse isOpen={this.state.collapse1} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem active>
                            Edit
                        </MDBNavItem>
                        <MDBNavItem>
                            Delete
                        </MDBNavItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </>

        );
    }
}

export default HamburgerFriend;