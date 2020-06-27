import React, { Component } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBTooltip, MDBCollapse, MDBInput, MDBBtn } from "mdbreact";

class SocialPage extends Component {
    state = {
        collapseID: ""
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        return (
            <MDBCard
                className="my-5 px-5 pt-4"
                style={{ fontWeight: 300, maxWidth: 600 }}
            >
                <MDBCardBody className="py-0">
                    <MDBRow>
                        <div className="mdb-feed">
                            <div className="news">
                                <div className="label">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                    />
                                </div>
                                <div className="excerpt">
                                    <div className="brief">
                                        <a href="#!" className="name">
                                            John Doe
                                        </a> added you as a friend
                                    <div className="date">1 hour ago</div>
                                    </div>
                                    <div className="feed-footer">
                                        <div className="d-flex">
                                            <a
                                                href="#!"
                                                className="comment"
                                                aria-expanded="false"
                                                aria-controls="collapseExample-1"
                                                onClick={this.toggleCollapse("collapseExample-1")}
                                            >
                                                Comment
                                            </a>
                                            &middot;
                                            <span>
                                                <a href="#!"> 7 </a>
                                            </span>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    tag="span"
                                                    placement="top"
                                                    tooltipContent="I like it"
                                                >
                                                    <MDBIcon icon="thumbs-up" />
                                                </MDBTooltip>
                                            </a>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    placement="top"
                                                    tooltipContent="I don't like it"
                                                >
                                                    <MDBIcon icon="thumbs-down" />
                                                </MDBTooltip>
                                            </a>
                                        </div>
                                        <MDBCollapse
                                            id="collapseExample-1"
                                            isOpen={this.state.collapseID}
                                        >
                                            <MDBCard className="card-body mt-1">
                                                <MDBInput type="textarea" label="Add comment" />
                                                <div className="d-flex justify-content-end">
                                                    <MDBBtn flat onClick={this.click1}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" onClick={this.click1}>
                                                        Reply
                                                    </MDBBtn>
                                                </div>
                                            </MDBCard>
                                        </MDBCollapse>
                                    </div>
                                </div>
                            </div>

                            <div className="news">
                                <div className="label">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg"
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                    />
                                </div>
                                <div className="excerpt">
                                    <div className="brief">
                                        <a href="#!" className="name">
                                            Anna Smith
                                        </a> added <a href="#!"> 2 new illustrations</a>
                                        <div className="date">4 hours ago</div>
                                    </div>
                                    <div className="added-images">
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/50.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                        />
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/52.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                        />
                                    </div>
                                    <div className="feed-footer">
                                        <div className="d-flex">
                                            <a
                                                href="#!"
                                                className="comment"
                                                aria-expanded="false"
                                                aria-controls="collapseExample-2"
                                                onClick={this.toggleCollapse("collapseExample-2")}
                                            >
                                                Comment
                                            </a>
                                            &middot;
                                            <span>
                                                <a href="#!"> 31 </a>
                                            </span>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    tag="span"
                                                    placement="top"
                                                    tooltipContent="I like it"
                                                >
                                                    <MDBIcon icon="thumbs-up" />
                                                </MDBTooltip>
                                            </a>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    placement="top"
                                                    tooltipContent="I don't like it"
                                                >
                                                    <MDBIcon icon="thumbs-down" />
                                                </MDBTooltip>
                                            </a>
                                        </div>
                                        <MDBCollapse
                                            id="collapseExample-2"
                                            isOpen={this.state.collapseID}
                                        >
                                            <MDBCard className="card-body mt-1">
                                                <MDBInput type="textarea" label="Add comment" />
                                                <div className="d-flex justify-content-end">
                                                    <MDBBtn flat onClick={this.click2}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" onClick={this.click2}>
                                                        Reply
                                                    </MDBBtn>
                                                </div>
                                            </MDBCard>
                                        </MDBCollapse>
                                    </div>
                                </div>
                            </div>

                            <div className="news">
                                <div className="label">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg"
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                    />
                                </div>
                                <div className="excerpt">
                                    <div className="brief">
                                        <a href="#!" className="name">
                                            Danny Moore
                                        </a> added you as a friend
                                    <div className="date">7 hours ago</div>
                                    </div>
                                    <div className="feed-footer">
                                        <div className="d-flex">
                                            <a
                                                href="#!"
                                                className="comment"
                                                aria-expanded="false"
                                                aria-controls="collapseExample-3"
                                                onClick={this.toggleCollapse("collapseExample-3")}
                                            >
                                                Comment
                                            </a>
                                            &middot;
                                            <span>
                                                <a href="#!"> 12 </a>
                                            </span>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    tag="span"
                                                    placement="top"
                                                    tooltipContent="I like it"
                                                >
                                                    <MDBIcon icon="thumbs-up" />
                                                </MDBTooltip>
                                            </a>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    placement="top"
                                                    tooltipContent="I don't like it"
                                                >
                                                    <MDBIcon icon="thumbs-down" />
                                                </MDBTooltip>
                                            </a>
                                        </div>
                                        <MDBCollapse
                                            id="collapseExample-3"
                                            isOpen={this.state.collapseID}
                                        >
                                            <MDBCard className="card-body mt-1">
                                                <MDBInput type="textarea" label="Add comment" />
                                                <div className="d-flex justify-content-end">
                                                    <MDBBtn flat onClick={this.click3}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" onClick={this.click3}>
                                                        Reply
                                                    </MDBBtn>
                                                </div>
                                            </MDBCard>
                                        </MDBCollapse>
                                    </div>
                                </div>
                            </div>

                            <div className="news">
                                <div className="label">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                    />
                                </div>
                                <div className="excerpt">
                                    <div className="brief">
                                        <a href="#!" className="name">
                                            Lili Rose
                                        </a> posted on her page
                                    <div className="date">2 days ago</div>
                                    </div>
                                    <div className="added-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Vero inventore, iste quas libero eius? Vitae sint neque
                                        animi alias sunt dolor, accusantium ducimus, non placeat
                                        voluptate.
                                    </div>
                                    <div className="feed-footer">
                                        <div className="d-flex">
                                            <a
                                                href="#!"
                                                className="comment"
                                                aria-expanded="false"
                                                aria-controls="collapseExample-4"
                                                onClick={this.toggleCollapse("collapseExample-4")}
                                            >
                                                Comment
                                            </a>
                                            &middot;
                                            <span>
                                                <a href="#!"> 25 </a>
                                            </span>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    tag="span"
                                                    placement="top"
                                                    tooltipContent="I like it"
                                                >
                                                    <MDBIcon icon="thumbs-up" />
                                                </MDBTooltip>
                                            </a>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    placement="top"
                                                    tooltipContent="I don't like it"
                                                >
                                                    <MDBIcon icon="thumbs-down" />
                                                </MDBTooltip>
                                            </a>
                                        </div>
                                        <MDBCollapse
                                            id="collapseExample-4"
                                            isOpen={this.state.collapseID}
                                        >
                                            <MDBCard className="card-body mt-1">
                                                <MDBInput type="textarea" label="Add comment" />
                                                <div className="d-flex justify-content-end">
                                                    <MDBBtn flat onClick={this.click4}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" onClick={this.click4}>
                                                        Reply
                                                    </MDBBtn>
                                                </div>
                                            </MDBCard>
                                        </MDBCollapse>
                                    </div>
                                </div>
                            </div>

                            <div className="news">
                                <div className="label">
                                    <img
                                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg"
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                    />
                                </div>
                                <div className="excerpt">
                                    <div className="brief">
                                        <a href="#!" className="name">
                                            Kate Harrison
                                        </a> added <a href="#!"> 2 new photos</a> of you
                                    <div className="date">3 days ago</div>
                                    </div>
                                    <div className="added-images">
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                        />
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                        />
                                    </div>
                                    <div className="feed-footer">
                                        <div className="d-flex">
                                            <a
                                                href="#!"
                                                className="comment"
                                                aria-expanded="false"
                                                aria-controls="collapseExample-5"
                                                onClick={this.toggleCollapse("collapseExample-5")}
                                            >
                                                Comment
                                            </a>
                                            &middot;
                                            <span>
                                                <a href="#!"> 47 </a>
                                            </span>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    tag="span"
                                                    placement="top"
                                                    tooltipContent="I like it"
                                                >
                                                    <MDBIcon icon="thumbs-up" />
                                                </MDBTooltip>
                                            </a>
                                            <a href="#!" className="thumbs">
                                                <MDBTooltip
                                                    placement="top"
                                                    tooltipContent="I don't like it"
                                                >
                                                    <MDBIcon icon="thumbs-down" />
                                                </MDBTooltip>
                                            </a>
                                        </div>
                                        <MDBCollapse
                                            id="collapseExample-5"
                                            isOpen={this.state.collapseID}
                                        >
                                            <MDBCard className="card-body mt-1">
                                                <MDBInput type="textarea" label="Add comment" />
                                                <div className="d-flex justify-content-end">
                                                    <MDBBtn flat onClick={this.click5}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" onClick={this.click5}>
                                                        Reply
                                                    </MDBBtn>
                                                </div>
                                            </MDBCard>
                                        </MDBCollapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        );
    }
}

export default SocialPage;