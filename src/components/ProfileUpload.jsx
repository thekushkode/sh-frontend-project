import React, { Component } from "react";
import { MDBFileInput } from "mdbreact";
class ProfileUpload extends Component {
  render() {
    return (
      <MDBFileInput multiple btnColor="info" />
    );
  }
}
export default ProfileUpload;