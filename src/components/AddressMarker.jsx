import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import Dog from './images/smalldog.png';

class AddressMarker extends Component {
    state = {
        dogData: null
    }

    updateAddress = () => {
        const { google, map } = this.props;
        const service = new google.maps.places.PlacesService(map);
        const startPoint = new google.maps.LatLng(33.753746, -84.386330);

        var request = {
            location: startPoint,
            radius: '50000',
            query: [this.props.address],
            fields: ['name', 'geometry'],
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    dogData: results
                })

                map.setCenter(results[0].geometry.location);
            }
        });
    }


    componentDidMount() {
        this.updateAddress()
    }

    componentDidUpdate(previousProps) {
        if (previousProps.address !== this.props.address) {
            this.updateAddress()
        }
    }


    render() {
        console.log(this.state.dogData)
        if (this.state.dogData) {
            return (
                <Marker {...this.props} position={this.state.dogData[0].geometry.location} />
            )
        } else {
            return ''
        }
    }
}

export default AddressMarker;
