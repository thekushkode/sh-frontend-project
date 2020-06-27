import React from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import NavbarPage from "./Nav";

const SocialPage2 = () => {
    return (
        <div>
            <header style={{ marginBottom: '100px' }}>
                <NavbarPage />
            </header>

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
                                        <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>5 likes</span>
                                        </a>
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
                    </a> added <a href="#!">2 new illustrations</a>
                                        <div className="date">4 hours ago</div>
                                    </div>
                                    <div className="added-images">
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                        />
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                        />
                                    </div>
                                    <div className="feed-footer">
                                        <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>18 likes</span>
                                        </a>
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
                    <div href="#!" className="date">
                                            7 hours ago
                    </div>
                                    </div>
                                    <div className="feed-footer">
                                        <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>11 likes</span>
                                        </a>
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
                                        <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>7 likes</span>
                                        </a>
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
                                            src="https://mdbootstrap.com/img/Photos/Others/images/29.jpg"
                                            alt=""
                                            className="z-depth-1 rounded mb-md-0 mb-2"
                                        />
                                        <img
                                            src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg"
                                            alt=""
                                            className="z-depth-1 rounded"
                                        />
                                    </div>
                                    <div className="feed-footer">
                                        <a href="#!" className="like">
                                            <MDBIcon icon="heart" />
                                            <span>53 likes</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default SocialPage2;