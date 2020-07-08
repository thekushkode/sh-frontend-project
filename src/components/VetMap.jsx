import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import NavbarPage from './Nav';
// import Vet from './images/vet.png';
import Vet from './hospital.png';

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
        // return (
        //     < InfoWindow marker={this.state.activeMarker}
        //         visible={this.state.showingInfoWindow} name={props.name} >
        //         <div>
        //             <h1>{this.state.selectedPlace.name}</h1>
        //         </div>
        //     </InfoWindow >
        // )
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
            </div>
        );
    };
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts' //re insert google api key
})(VetMap);

// whole new world

// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
// // import mapStyles from './mapStyles'
// import Vet from './images/vet.png';

// function Map(props) {
//   const map = useRef(null);
//   const [selectedBrewery, setSelectedBrewery] = useState(null);

//     service.textSearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             this.setState({
//                 stores: results
//             })

//             map.setCenter(results[0].geometry.location);
//         }
//     });
// }

//   useEffect(() => {
//     if (props.breweries.length) {
//       const bounds = new window.google.maps.LatLngBounds();
//       props.breweries.forEach(brewery => {
//         const { latitude, longitude } = brewery;
//         if (latitude && longitude) {
//           const latLng = new window.google.maps.LatLng(latitude, longitude);
//           bounds.extend(latLng);
//         }
//       });
//       map.current && map.current.fitBounds(bounds);
//     }
//   })

//   return (
//     <GoogleMap
//       ref={map}
//       defaultZoom={11}
//       defaultCenter={{ lat: 33.76333225, lng: -84.3870607355802 }}
//     //   defaultOptions={{ styles: mapStyles }}
//     >
//       {props.breweries.map((brewery, index) => {
//         return (
//           <Marker
//             key={index}
//             position={{
//               lat: Number.parseFloat(brewery.latitude),
//               lng: Number.parseFloat(brewery.longitude)
//             }}
//             onClick={() => {
//               setSelectedBrewery(brewery)
//             }}
//             icon={{
//               url: Vet,
//               // scaledSize: new window.google.maps.Size(25, 25)
//               scaledSize: { width: 25, height: 25 }
//             }}
//           />
//         )
//       })}

//       {selectedBrewery && (
//         <InfoWindow
//           position={{
//             lat: Number.parseFloat(selectedBrewery.latitude),
//             lng: Number.parseFloat(selectedBrewery.longitude)
//           }}
//           onCloseClick={() => {
//             setSelectedBrewery(null);
//           }}
//         >
//           <div>
//             {selectedBrewery.website_url ?
//               <h2><a href={selectedBrewery.website_url} target="_blank" rel="noopener noreferrer">{selectedBrewery.name}</a></h2>
//               :
//               <h2>{selectedBrewery.name}</h2>
//             }
//             <div>
//               {selectedBrewery.street && <p><b>Address:</b> {selectedBrewery.street}</p>}
//               {selectedBrewery.phone && <p><b>Phone Number:</b> {selectedBrewery.phone}</p>}
//             </div>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

// export default function MappyMap(props) {
//   return (
//     <div style={{ width: '90%', height: '500px', margin: '0 auto' }}>
//       <WrappedMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDXL-StIbh_r3CWBCFSF0Tlqtwo8QmSIts`}
//         loadingElement={<div style={{ height: '100%' }} />}
//         containerElement={<div style={{ height: '100%' }} />}
//         mapElement={<div style={{ height: '100%' }} />}
//         {...props}
//       >
//       </WrappedMap>
//     </div>
//   )
// }