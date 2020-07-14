import React, { Component } from "react";
import { MDBContainer, MDBNotification } from "mdbreact";

class Notification extends Component {

    render() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return (
            <MDBContainer className="grey darken-3 p-3" style={{ marginTop: '100px' }}>
                <MDBNotification
                    iconClassName="text-info"
                    show
                    fade
                    title="SocialHound"
                    message="You are logged in!"
                    text={time}
                />
            </MDBContainer>
        );
    }
}

export default Notification;