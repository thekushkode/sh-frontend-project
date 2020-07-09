import React, { Component, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Dog from './images/smalldog.png';
// import Geocode from 'react-geocode';
import { connect, useDispatch, useSelector } from 'react-redux'; //could import connect?
import { setUser, unSetUser, setProfile } from '../redux/actions';
import firebase from '../firebase';
import AddressMarker from './AddressMarker';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBContainer, MDBScrollbar } from "mdbreact";
import SearchPage from './SearchBar';
import DogResults from './DogResults';
import './DogResults.css';

const db = firebase.firestore();

//TRYING TO USE COMBO OF REDUX / FIREBASE (ONLY FB IF POSSIBLE) TO DISPLAY USERS ON MAP AND DISPLAY CURRENT USER ON SAME MAP.

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
            users: []
        }
    }

    componentDidMount() {

        db.collection("Dogs")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ users: data });
            });
    }

    fetchPlaces = (mapProps, map) => {

        // const { google } = mapProps;
        // const service = new google.maps.places.PlacesService(map);
        // const startPoint = new google.maps.LatLng(33.753746, -84.386330);

        // var request = {
        //     location: startPoint,
        //     radius: '50000',
        //     query: ['3669 School Street Atlanta, GA 30341'],
        //     fields: ['name', 'geometry'],
        // };

        // service.textSearch(request, (results, status) => {
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //         this.setState({
        //             users: results
        //         })

        //         map.setCenter(results[0].geometry.location);
        //     }
        // });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props);
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
        };

        const containerStyle = {
            marginLeft: '20px',
            width: '60%',
            height: '80%',
        }


        const scrollContainerStyle = { width: "450px", maxHeight: "330px" };

        const { users } = this.state;
        //console.log({ users });


        return (
            <div>
                <header style={{ marginBottom: '100px' }}>
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
                                {this.state.users.map((user, index, mapProps) => {
                                    let address = users[index].street + ' ' + users[index].city + ', ' + users[index].userState + ' ' + users[index].zipcode;
                                    // console.log(address);
                                    return (
                                        <AddressMarker google={this.props.google} key={index} id={index} address={address} name={user.name}
                                            onClick={this.onMarkerClick} />

                                    )
                                })}
                                {this.state.users.map((user, index) => {
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
                        <div style={{ display: 'flex', flexDirection: 'column', width: '40%', paddingLeft: '30px' }}>
                            <div style={{ paddingLeft: '120px' }}>
                                <SearchPage />
                            </div>
                            <div className='scrollbar scrollbar-primary' style={scrollContainerStyle}>
                                <DogResults />
                                <DogResults />
                                <DogResults />
                                <DogResults />
                            </div>
                            {/* <div>
                                <DogResults />
                            </div>
                            <div>
                                <DogResults />
                            </div>
                            <div>
                                <DogResults />
                            </div> */}
                        </div>
                    </div>
                </main>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.setUser,
        profile: state.setProfile
    }
}


export default connect(mapStateToProps, { setUser, setProfile })(GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts' //re insert google api key
})(Furends));