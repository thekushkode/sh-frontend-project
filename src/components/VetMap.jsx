import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
// import Vet from './images/vet.png';
import Vet from './hospital.png';

class VetMap extends Component {
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
            query: ['dog vet', 'vets near me'],
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

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }


    onMapClicked = () => {
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
                        zoom={13}
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
                            console.log(this.state.selectedPlace)
                            console.log(store)
                            return (
                                <InfoWindow marker={this.state.activeMarker}
                                    visible={this.state.activeMarker && this.state.activeMarker.id  === index} id={index} name={store.name} address={store.formatted_address}>
                                    <div>
                                        {/* <h4>{this.state.selectedPlace.name}</h4>
                                        <h6>{this.state.selectedPlace.formatted_address}</h6>
                                        <p>{this.state.selectedPlace.formatted_phone_number}</p>
                                        <p>{this.state.selectedPlace.website}</p> */}
                                        <h4>{store.name}</h4>
                                        <h6>{store.formatted_address}</h6>
                                        <p>Rating: {store.rating}/5</p>
                                        <p>{store.formatted_phone_number}</p>
                                        <p>{store.website}</p>
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts' //re insert google api key
})(VetMap);
