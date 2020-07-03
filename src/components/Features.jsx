import React from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import CoolDog from './sunglasses.jpg';

const FeaturesPage = () => {
    return (
        <section className="my-5">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
                Why is SocialHound so great?!
            </h2>
            <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                Thanks for visiting SocialHound. Finally,, your dog has a social network just for him! See some of our features below or explore through the nav links!
            </p>

            <MDBRow>
                <MDBCol lg="5" className="text-center text-lg-left">
                    <img
                        className="img-fluid"
                        src={CoolDog}
                        alt=""
                    />
                </MDBCol>
                <MDBCol lg="7">
                    <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="share" size="lg" className="indigo-text" />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Social</h5>
                            <p className="grey-text">
                                Set up your pup's personal profile page, search for friends, and set up playdates! Looking to branch out? Use our 'Find Furends' tool to locate other pups in your area! Post your photos, videos, and memory to your feed and share with your furends.
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="share" size="lg" className="indigo-text" />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Messaging</h5>
                            <p className="grey-text">
                                Use our direct messaging tool to get in touch with your friends or set up a date with a dog in your area with the click of a button. 
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol size="1">
                            <MDBIcon icon="share" size="lg" className="indigo-text" />
                        </MDBCol>
                        <MDBCol xl="10" md="11" size="10">
                            <h5 className="font-weight-bold mb-3">Discover</h5>
                            <p className="grey-text">
                                A whole new world is at the tip of your paws. Find anything you and your dog need with our easy to access Discover tool. Search for dogs in your area, find dogparks, boarding locations, and vets in an instant!
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </section>
    );
}

export default FeaturesPage;