import React, { Component } from 'react';
import { MDBContainer, MDBDatePickerV5, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class SelectDate extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <MDBContainer>
                <form>
                <MDBBtn className='btn-rounded purple-gradient' onClick={this.toggle}>Request Playdate</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}><strong>Select Date</strong></MDBModalHeader>
                    <MDBModalBody>
                        {/* <MDBDatePickerV5 theme="info" getValue={(e) => console.log(e)} /> */}
                        <input type='date'></input>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn className='btn-rounded' color="danger" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn className='btn-rounded' color="info" type='submit' >Request Date</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                </form>
            </MDBContainer>
        );
    }
}

export default SelectDate;