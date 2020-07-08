import React, { Component } from 'react';
import { InfoWindow } from 'google-maps-react';

class DetailedInfo extends Component {
    state = {
        places: null
    }

    getPlaceDetails = () => {
        const { google, map } = this.props;
        const service = new google.maps.places.PlacesService(map);
        const startPoint = new google.maps.LatLng(33.753746, -84.386330);

        var request = {
            location: startPoint,
            placeId: '',
            fields: ['name', 'geometry', 'formatted_address', 'formatted_phone_number', 'website'],
        };

        service.getDetails(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    places: results
                })

                map.setCenter(results[0].geometry.location);
            }
        });
    }


    componentDidMount() {
        this.getPlaceDetails()
    }

    componentDidUpdate(previousProps) {
        if (previousProps.placeId !== this.props.placeId) {
            this.getPlaceDetails()
        }
    }


    render() {
        console.log(this.state.dogData)
        if (this.state.places) {
            return (
                <InfoWindow {...this.props} position={this.state.places[0].geometry.location} />
            )
        } else {
            return ''
        }
    }
}

export default DetailedInfo;