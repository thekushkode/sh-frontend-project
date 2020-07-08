import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { MDBCol, MDBFormInline, MDBIcon, Button } from 'mdbreact';
import NavbarPage from './Nav';
import Geocode from 'react-geocode';
import Dog from './dog.png';
import SearchBar from './SearchBar'

export class GMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            infoWindow: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            zipCode: '90014',
            map: null
        }
    }

    mapReady = (mapProps, map) => {
        this.setState({
            map
        }, this.fetchPlaces)
    }

    fetchPlaces = () => {
        if (this.state.map) {
            Geocode.setLanguage('en');
            Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`);
            Geocode.fromAddress(this.state.zipCode).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    const { google } = this.props;
                    const service = new google.maps.places.PlacesService(this.state.map);
                    // const startPoint = new google.maps.LatLng(33.753746, -84.386330);
                    const startPoint = new google.maps.LatLng(lat, lng);
                    var request = {
                        location: startPoint,
                        radius: '50000',
                        query: ['dog park'],
                        fields: ['name', 'geometry', 'formatted_address', 'formatted_phone_number', 'website'],
                    };
                    service.textSearch(request, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            this.setState({
                                stores: results
                            })

                            const bounds = new google.maps.LatLngBounds();

                            results.forEach(result => {
                                bounds.extend(result.geometry.location);
                            });
                            this.state.map.fitBounds(bounds);
                        }
                    });
                },
                error => {
                    console.error(error);
                }
            );
        }
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

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            zipCode: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.fetchPlaces()
        this.setState({
            zipCode: ''
        })
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '90%',
            marginTop: '85px',
        };

        return (
            <div>
                <header className='pb-0 mb-0'>
                    <NavbarPage />
                </header>
                <main>
                    <Map
                        google={this.props.google}
                        onClick={this.onMapClicked}
                        onReady={this.mapReady}
                        zoom={10}
                        style={mapStyles}
                        initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                    >
                        {this.state.stores.map((store, index) => {
                            return (

                                <Marker key={index} id={index} position={
                                    store.geometry.location
                                } name={store.name} options={{ icon: Dog }}
                                    onClick={this.onMarkerClick} />
                            )
                        })}
                        {this.state.stores.map((store, index) => {
                            //let placesId = store.pl
                            return (
                                < InfoWindow marker={this.state.activeMarker}
                                    visible={this.state.activeMarker && this.state.activeMarker.id  === index} id={index} name={store.name} address={store.formatted_address}>
                                    <div>
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
                <footer style={{position: 'bottom', padding: '0px', margin: '0px'}} className='fixed-bottom'>
                    {/* <SearchBar /> */}
                    <div style={{marginTop: '100px', marginBottom: '0px', paddingBottom: '0px'}}>
                        <MDBCol md="6">
                        <MDBFormInline className="md-form ml-5 mb-5" onSubmit={this.handleSubmit} >
                            <MDBIcon icon="search"/>
                            <input className="form-control form-control-lg ml-3 w-75" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange} value={this.state.zipCode} />
                            <Button type='submit' className='btn-rounded aqua-gradient' >Search</Button>
                        </MDBFormInline>
                        </MDBCol>
                    </div>
                </footer>
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_KEY}`
})(GMap);