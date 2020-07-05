import React, { Component, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
import Dog from './smalldog.png';
// import Geocode from 'react-geocode';
import { connect, useDispatch, useSelector } from 'react-redux'; //could import connect?
import { setUser, unSetUser, setProfile } from '../redux/actions';
import firebase from '../firebase';

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
        db.collection("Users")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ users: data });
            });
    }

    fetchPlaces = (mapProps, map) => {

        //how to use reduxe state in this?
        const address = setUser.street + ' ' + setUser.city + ', ' + setUser.state + ' ' + setUser.zipcode;
        console.log(address)
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const startPoint = new google.maps.LatLng(33.753746, -84.386330);
        // this.setState({
        //     user: address
        // })
        var request = {
            location: startPoint,
            radius: '50000',
            query: [address],
            fields: ['name', 'geometry'],
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    stores: results
                })

                map.setCenter(results[0].geometry.location);
            }
        });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        return (
            < InfoWindow marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow} name={props.name} >
                <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow >
        )
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
            marginTop: '85px',
        };
        const { users } = this.state;
        console.log({users});

        return (
            <div>
                <header>
                    <NavbarPage />
                </header>
                <main>
                    <Map
                        google={this.props.google}
                        onClick={this.onMapClicked}
                        onReady={this.fetchPlaces}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                    >
                        {this.state.stores.map((store, index, mapProps) => {
                            return (
                                <Marker key={index} id={index} position={
                                    store.geometry.location
                                } name={store.name} options={{ icon: Dog }}
                                    onClick={this.onMarkerClick} />

                            )
                        })}
                        {this.state.stores.map((store, index) => {
                            return (
                                < InfoWindow marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow} name={store.name} >
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                    </div>
                                </InfoWindow >

                            )
                        })}
                    </Map>
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