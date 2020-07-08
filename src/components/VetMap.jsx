import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
import Vet from './hospital.png';
import DetailedInfo from './DetailedInfo';

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
                    stores: results,
                })

                map.setCenter(results[0].geometry.location);
            } // .then(service = placeDetails search based on place_id and add to state?)
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
                            console.log(store)
                            return (
                                <DetailedInfo marker={this.state.activeMarker} key={index}
                                visible={this.state.selectedPlace.id === index} name={store.name}>
                                    <div>
                                        <h4>{store.name}</h4>
                                        <h6>{store.formatted_address}</h6>
                                        <p>Rating: {store.rating}/5</p>
                                        <p>{store.formatted_phone_number}</p>
                                        <p><a href={store.website}>{store.website}</a></p>
                                    </div>
                                </DetailedInfo >
                                // <InfoWindow marker={this.state.activeMarker}
                                //     visible={this.state.activeMarker && this.state.activeMarker.id  === index} id={index} name={store.name} address={store.formatted_address}>
                                //     <div>
                                //         <h4>{store.name}</h4>
                                //         <h6>{store.formatted_address}</h6>
                                //         <p>Rating: {store.rating}/5</p>
                                //         <p>{store.formatted_phone_number}</p>
                                //         <p><a href={store.website}>{store.website}</a></p>
                                //     </div>
                                // </InfoWindow >
                            )
                        })}
                    </Map>
                </main>
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_KEY}`
})(VetMap);
