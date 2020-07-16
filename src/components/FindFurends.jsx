import React, { Component, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Dog from './images/smalldog.png';
// import Geocode from 'react-geocode';
import { connect, useDispatch, useSelector } from 'react-redux'; //could import connect?
import { setUser, unSetUser, setProfile } from '../redux/actions';
import firebase from '../firebase';
import AddressMarker from './AddressMarker';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBContainer, MDBScrollbar, MDBFormInline, Button, MDBCardTitle, MDBAvatar, MDBView, MDBMask } from "mdbreact";
import SearchPage from './SearchBar';
import DogSearch from './DogSearch';
import './DogSearch.css';
import Ike from './images/ike.png';


const db = firebase.firestore();

//TRYING TO USE COMBO OF REDUX / FIREBASE (ONLY FB IF POSSIBLE) TO DISPLAY USERS ON MAP AND DISPLAY CURRENT USER ON SAME MAP.
let defaultDogImg = 'https://firebasestorage.googleapis.com/v0/b/sh-frontend-8f893.appspot.com/o/default-avatar.png?alt=media'

//need help with {connect}
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
            // .where('dogName', '==', friend)
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
        this.handleFormSubmit()
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
            height: '90%',
            marginTop: '100px',
        };
        const { users } = this.state;
        const scrollContainerStyle = { width: "90%", maxHeight: "330px", marginLeft: '40px' };
        const containerStyle = {
            marginLeft: '20px',
            width: '50%',
            height: '90%',
        }


        return (
            <div>
                <header>
                </header>
                <main>
                    <div className='d-flex flex-row justify-content-between'>
                        <div style={{ width: '500px' }}>
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
                                        < InfoWindow marker={this.state.activeMarker} key={index}
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
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <div style={{ marginLeft: '75px' }}>
                                <div style={{ marginTop: '65px', marginLeft: '100px' }}>
                                    <MDBCol md="6" className='d-flex'>
                                        <MDBFormInline className="md-form" onSubmit={this.handleFormSubmit}>
                                            <input className="form-control form-control-sm ml-3" type="text" placeholder="Search" aria-label="Search" value={this.state.location} onChange={this.handleChange} />
                                            <Button className='blue-gradient' rounded size='sm' type='submit'>Find Furends</Button>
                                        </MDBFormInline>
                                    </MDBCol>
                                </div>
                            </div>
                            <div className='scrollbar scrollbar-primary' style={scrollContainerStyle}>
                                <MDBRow>
                                    {this.state.dogData && this.state.dogData.map(dog => {
                                        {
                                            if (dog.dogId !== this.props.profile.id) {
                                                return (
                                                    <MDBCol md='4' className='mt-1'>
                                                        <MDBView hover>
                                                            <a href={`/user/${dog.dogId}`}>
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
                                                            </a>
                                                        </MDBView>
                                                    </MDBCol>
                                                )
                                            }
                                        }
                                    })}
                                </MDBRow>
                            </div>
                        </div>
                    </div>
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