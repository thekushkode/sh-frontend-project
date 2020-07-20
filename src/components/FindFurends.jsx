import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import AddressMarker from './AddressMarker';
import { MDBRow, MDBCol, MDBFormInline, Button, MDBView, MDBMask } from "mdbreact";
import './DogSearch.css';

const db = firebase.firestore();

let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

export class Furends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            infoWindow: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            users: [],
            location: props.profile.data.zipcode,
            dogData: []
        }
    }

    handleChange = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e && e.preventDefault();
        let friend = this.state.location
        let doggo = this
        db.collection("Dogs")
            .where('zipcode', '==', friend)
            .get()
            .then(function (querySnapshot) {
                let data = [];
                querySnapshot.forEach(function (doc) {
                    const dogData = {
                        ...doc.data(),
                        dogId: doc.id
                    }
                    data.push(dogData);
                })
                doggo.setState({
                    location: '',
                    dogData: data
                })
            })
    }

    componentDidMount() {
        // this.handleFormSubmit()
        let friend = this.props.profile.data.city;
        let doggo = this
        db.collection("Dogs")
            .where('city', '==', friend)
            .get()
            .then(function (querySnapshot) {
                let data = [];
                querySnapshot.forEach(function (doc) {
                    const dogData = {
                        ...doc.data(),
                        dogId: doc.id
                    }
                    data.push(dogData);
                })
                doggo.setState({
                    location: '',
                    dogData: data
                })
            })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }


    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
            marginTop: '10px',
        };
        const { users } = this.state;
        const scrollContainerStyle = { width: "100%", maxHeight: "110px" };
        const containerStyle = {
            width: '100%',
            marginLeft: '0'
        }


        return (
            <div>
                <header style={{ marginBottom: '15px' }}>
                </header>
                <main>
                    <MDBRow>
                        <MDBCol md='12' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <div style={{ marginTop: '65px', marginLeft: '20px' }}>
                                    <MDBCol md="6" className='d-flex'>
                                        <MDBFormInline className="md-form" onSubmit={this.handleFormSubmit}>
                                            <input className="form-control form-control-sm ml-3" type="text" placeholder="Search" aria-label="Search" value={this.state.location} onChange={this.handleChange} />
                                            <Button className='blue-gradient' rounded size='sm' type='submit'>Find Furends</Button>
                                        </MDBFormInline>
                                    </MDBCol>
                                </div>
                            </div>
                            <div className='scrollbar scrollbar-info' style={scrollContainerStyle}>
                                <MDBRow>
                                    {this.state.dogData && this.state.dogData.map(dog => {

                                        if (dog.dogId !== this.props.profile.id) {
                                            return (
                                                <MDBCol sm='3' md='2' className='mt-1'>
                                                    <MDBView hover>
                                                        <Link to={`/user/${dog.dogId}`}>
                                                            <img
                                                                src={dog.avatar ? dog.avatar : defaultDogImg}
                                                                className="img-fluid rounded-circle"
                                                                alt="Dog Avatar"
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0 auto' }}
                                                            />
                                                            <MDBMask className="flex-center flex-column" overlay="blue-strong">
                                                                <p className="white-text"><strong>{dog.dogName}</strong></p>
                                                                <p className="white-text"><strong>{dog.breed}</strong></p>
                                                            </MDBMask>
                                                        </Link>
                                                    </MDBView>
                                                </MDBCol>
                                            )
                                        }

                                    })}
                                </MDBRow>
                            </div>
                        </MDBCol>
                        <MDBCol md='12'>
                            <div style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', padding: '0', marginTop: '10px'}}>
                                <Map
                                    containerStyle={containerStyle}
                                    google={this.props.google}
                                    onClick={this.onMapClicked}
                                    onReady={this.fetchPlaces}
                                    zoom={10}
                                    style={mapStyles}
                                    initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                                >
                                    {this.state.dogData.map((user, index, mapProps) => {
                                        let address = user.street + ' ' + user.city + ', ' + user.userState + ' ' + user.zipcode;
                                        return (
                                            <AddressMarker google={this.props.google} key={index} id={index} address={address} name={user.name}
                                                onClick={this.onMarkerClick} />
                                        )
                                    })}
                                    {this.state.dogData.map((user, index) => {
                                        return (
                                            <InfoWindow marker={this.state.activeMarker} key={index}
                                                visible={this.state.selectedPlace.id === index} name={user.name} >
                                                <div>
                                                    <h4>{user.dogName}</h4>
                                                    <p>{user.breed}</p>
                                                    <p>{user.temperament}</p>
                                                </div>
                                            </InfoWindow >

                                        )
                                    })}
                                </Map>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </main>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile
    }
}

const WrappedContainer = GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts'
})(Furends);

export default connect(
    mapStateToProps,
    null
)(WrappedContainer)