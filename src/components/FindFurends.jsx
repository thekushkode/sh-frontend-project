import React, { Component, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Dog from './images/smalldog.png';
// import Geocode from 'react-geocode';
import { connect, useDispatch, useSelector } from 'react-redux'; //could import connect?
import { setUser, unSetUser, setProfile } from '../redux/actions';
import firebase from '../firebase';
import AddressMarker from './AddressMarker';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBContainer, MDBScrollbar, MDBFormInline, Button, MDBCardTitle, MDBAvatar } from "mdbreact";
import SearchPage from './SearchBar';
import DogSearch from './DogSearch';
import './DogSearch.css';
import Ike from './images/ike.png';


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
            // users: [],
            location: '',
            dogData: []
        }
    }

    handleChange = (e) => {
        console.log('hello world')
        console.log(e.target.value)
        this.setState({
            location: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        // let friend = this.props.location.pathname.slice(8);
        let friend = this.state.location
        // if (user) {
        // console.log(user)
        // User is signed in.
        db.collection("Dogs")
            // .where('dogName', '==', friend)
            .where('zipcode', '==', friend)
            .get()
            .then(function (querySnapshot) {
                console.log(querySnapshot)
                let data = [];
                querySnapshot.forEach(function (doc) {
                    data.push(doc.data());
                })
                console.log(data)
                this.setState({
                    location: '',
                    dogData: data
                })
            })
    }

    // componentDidMount() {

    //     // db.collection("Dogs")
    //     //     .get()
    //     //     .then(querySnapshot => {
    //     //         const data = querySnapshot.docs.map(doc => doc.data());
    //     //         console.log(data);
    //     //         this.setState({ users: data });
    //     //     });
    // }

    // fetchPlaces = (mapProps, map) => {

    //     // const { google } = mapProps;
    //     // const service = new google.maps.places.PlacesService(map);
    //     // const startPoint = new google.maps.LatLng(33.753746, -84.386330);

    //     // var request = {
    //     //     location: startPoint,
    //     //     radius: '50000',
    //     //     query: ['3669 School Street Atlanta, GA 30341'],
    //     //     fields: ['name', 'geometry'],
        // };

    //     // service.textSearch(request, (results, status) => {
    //     //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     //         this.setState({
    //     //             users: results
    //     //         })

    //     //         map.setCenter(results[0].geometry.location);
    //     //     }
    //     // });
    // }

    onMarkerClick = (props, marker, e) => {
        console.log(props);
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
            marginTop: '100px',
        };
        const { users } = this.state;
        //console.log({ users });
        const scrollContainerStyle = { width: "450px", maxHeight: "330px" };

        const containerStyle = {
            marginLeft: '20px',
            width: '60%',
            height: '80%',
        }


        return (
            <div>
                <header>
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
                                {/* <SearchPage /> */}
                                <div style={{ marginTop: '100px', marginBottom: '0px', paddingBottom: '0px' }}>
                                    <MDBCol md="6">
                                        <MDBFormInline className="md-form" onSubmit={this.handleFormSubmit}>
                                            <MDBIcon icon="search" />
                                            <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" value={this.state.location} onChange={this.handleChange} />
                                            <Button type='submit'>Find Furrends</Button>
                                        </MDBFormInline>
                                    </MDBCol>
                                </div>
                            </div>
                            <div className='scrollbar scrollbar-primary' style={scrollContainerStyle}>
                                {/* Have default Dogs show here. Based on zip or city */}
                                {/* <DogSearch />
                                <DogSearch />
                                <DogSearch />
                                <DogSearch /> */}
                                {this.state.dogData && this.state.dogData.map(dog => {
                                    return (
                                        <div>
                                            <MDBRow>
                                                <MDBCol lg='4' md='12'>
                                                    <MDBCard className='profile-card text-center mb-4'>
                                                        <MDBAvatar
                                                            tag='img'
                                                            alt='Rottweiler dog photo'
                                                            width='400'
                                                            src={Ike}
                                                            className='rounded-circle z-depth-1-half mb-4'
                                                        />
                                                        <MDBCardBody>
                                                            <MDBCardTitle>
                                                                <strong>{dog.dogName}</strong>
                                                            </MDBCardTitle>
                                                            <p className='card-text mt-3'>
                                                                <b>Breed: </b>{dog.breed}
                                                            </p>
                                                            
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </MDBCol>
                                            </MDBRow>
                                        </div>
                                    )
                                })
                                }
                            </div>
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