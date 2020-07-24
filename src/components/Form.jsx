import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import { Component } from "react";
import ThankYou from './ThankYou';
import { Redirect } from 'react-router-dom'

class FormPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ""
        };
    }

    submitForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }


    render() {
        const { status } = this.state;
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <form name='socialhound contact' onSubmit={this.submitForm} method='POST' action='https://formspree.io/mnqglbvq'>
                            <p className="h5 text-center mb-4">Write to Us:</p>
                            <div className="grey-text">
                                <MDBInput label="Your name" name='name' icon="user" group type="text" validate error="wrong" containerClass="text-left"
                                    success="right" />
                                <MDBInput label="Your email" name='email' icon="envelope" group type="email" validate error="wrong" containerClass="text-left"
                                    success="right" />
                                <MDBInput label="Subject" name='subject' icon="tag" group type="text" validate error="wrong" containerClass="text-left" success="right" />
                                <MDBInput type="textarea" name='message' rows="2" label="Your message" icon="pencil-alt" containerClass="text-left" />
                            </div>
                            <div className="text-center">
                                <MDBBtn outline color="primary" type='submit'>
                                    Send
                                <MDBIcon far icon="paper-plane" className="ml-1" />
                                </MDBBtn>
                            </div>
                            {status === "SUCCESS" && <Redirect to='/thankyou' /> }
                            {status === "ERROR" && <p>Ooops! There was an error.</p>}
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
};

export default FormPage;