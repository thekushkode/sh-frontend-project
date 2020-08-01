import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { MDBCol, MDBFormInline, MDBIcon, Button } from 'mdbreact';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import Hotel from './images/love_hotel.png';
import DetailedInfo from './DetailedInfo';

export class DayCare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            infoWindow: false,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            zipCode: props.profile.data.zipcode,
            map: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    mapReady = (mapProps, map) => {
        this.setState({
            map
        }, this.fetchPlaces)
    }

    fetchPlaces = () => {
        if (this.state.map) {
            Geocode.setLanguage('en');
            Geocode.setApiKey('AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts');
            Geocode.fromAddress(this.state.zipCode).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    const { google } = this.props;
                    const service = new google.maps.places.PlacesService(this.state.map);
                    const startPoint = new google.maps.LatLng(lat, lng);
                    var request = {
                        location: startPoint,
                        radius: '50000',
                        query: ['dog boarding'],
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
            height: '100%',
        };
        return (
            <div>
                <header>
                </header>
                <main>
                    <Map
                        google={this.props.google}
                        onClick={this.onMapClicked}
                        onReady={this.mapReady}
                        zoom={13}
                        style={mapStyles}
                        initialCenter={{ lat: 33.753746, lng: -84.386330 }}
                    >
                        {this.state.stores.map((store, index) => {
                            return (
                                <Marker key={index} id={index} position={
                                    store.geometry.location
                                } name={store.name} options={{ icon: Hotel }}
                                    onClick={this.onMarkerClick} />
                            )
                        })}
                        {this.state.stores.map((store, index) => {
                            let placeId = store.place_id;
                            return (
                                <DetailedInfo marker={this.state.activeMarker} key={index}
                                    visible={this.state.selectedPlace.id === index} name={store.name} placeId={placeId}>
                                    <div>
                                        <h4>{store.name}</h4>
                                        <h6>{store.formatted_address}</h6>
                                        <p>Rating: {store.rating}/5</p>
                                    </div>
                                </DetailedInfo >
                            )
                        })}
                    </Map>
                </main>
                <footer style={{ position: 'bottom', padding: '0px', margin: '0px' }} className='fixed-bottom'>
                    <div style={{ marginTop: '100px', marginBottom: '0px', paddingBottom: '0px' }}>
                        <MDBCol md="6">
                            <MDBFormInline className="md-form ml-5 mb-5" onSubmit={this.handleSubmit} >
                                <MDBIcon icon="search" />
                                <input className="form-control form-control-lg ml-3 w-35" type="text" placeholder="Search" aria-label="Search" onChange={this.handleChange} value={this.state.zipCode} />
                                <Button type='submit' className='btn-rounded aqua-gradient' >Search</Button>
                            </MDBFormInline>
                        </MDBCol>
                    </div>
                </footer>
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
})(DayCare);

export default connect(
    mapStateToProps,
    null
)(WrappedContainer)