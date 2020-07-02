import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
import FooterPage from './Footer';
import Vet from './vet.png';

export class VetMap extends Component {
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
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const startPoint = new google.maps.LatLng(33.753746, -84.386330);
        var request = {
            location: startPoint,
            radius: '50000',
            query: ['veterinarian'],
            fields: ['name', 'geometry', 'formatted_address', 'formatted_phone_number', 'website'],
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
            height: '60%',
            marginTop: '90px',
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
                        {this.state.stores.map((store, index) => {
                            return (

                                <Marker key={index} id={index} position={
                                    store.geometry.location
                                } name={store.name} options={{ icon: Vet }}
                                    onClick={this.onMarkerClick} />

                            )
                        })}
                        {this.state.stores.map((store, index) => {
                            return (
                                < InfoWindow marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow} name={store.name} address={store.formatted_address}>
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                        <h6>{this.state.selectedPlace.address}</h6>
                                        <p>{this.state.selectedPlace.formatted_phone_number}</p>
                                        <p>{this.state.selectedPlace.website}</p>
                                    </div>
                                </InfoWindow >

                            )
                        })}
                    </Map>
                </main>
                <footer className='fixed-bottom'>
                    <FooterPage/>
                </footer>
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts' //re insert google api key
})(VetMap);