import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
import Dog from './images/smalldog.png';
//import Geocode from 'react-geocode';
import FooterPage from './Footer';
//import { connect } from 'react-redux';

export class TestMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            infoWindow: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    fetchPlaces = (mapProps, map) => {
        //get lat & lng from zip using geocode
        // const userAddress = this.props.profile.street + "+" + 
        // console.log(this.props.profile);
        // const userLocation = Geocode.fromAddress(this.state.user.zipcode).then(
        //     response => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         console.log(lat, lng);
        //     },
        //     error => {
        //         console.error(error);
        //     }
        // );

        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const startPoint = new google.maps.LatLng(33.753746, -84.386330);
        var request = {
            location: startPoint,
            radius: '50000',
            query: ['dog park', 'pet store'],
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
        // console.log(props);
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
            height: '100%',
        };
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
                <footer>
                    <FooterPage />
                </footer>
            </div>
        );
    };
};
// const mapStateToProps = (state) => {
//     return {profile: state.profile};
// }
// connect(mapStateToProps, null)(TestMap)

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts' //re insert google api key
})(TestMap);