import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';

export class GMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [{ lat: 33.752010, lng: -84.370758 },
            { latitude: 33.812820, longitude: -84.388280 },
            { latitude: 33.812800, longitude: -84.388960 },
            { latitude: 33.871490, longitude: -84.441658 },
            { latitude: 33.870626, longitude: -84.456492 },
            { latitude: 33.938862, longitude: -84.414082 }]
        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }


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
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                    />
                    {this.displayMarkers()}
                </main>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: '' //re insert google api key
})(GMap);