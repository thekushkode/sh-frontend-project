import React, { Component } from 'react';
import { InfoWindow } from 'google-maps-react';

class DetailedInfo extends Component {
    //need constructor?
    state = {
        places: null,

    }

    getPlaceDetails = () => {
        const { google, map, placeId } = this.props;
        const service = new google.maps.places.PlacesService(map);
        //const startPoint = new google.maps.LatLng(33.753746, -84.386330);

        var request = {
            //location: startPoint,
            fields: ['name', 'geometry', 'formatted_address', 'formatted_phone_number', 'website'],
            placeId
        };

        service.getDetails(request, (results, status) => {
            console.log(results)
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    places: results
                })

                map.setCenter(results.geometry.location);
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
        //console.log(this.state.places)
        return (

            <InfoWindow {...this.props} >

                {this.props.children}
                {this.state.places && (
                    <div className='d-flex flex-column'>
                        <a href={'tel:' + this.state.places.formatted_phone_number}>{this.state.places.formatted_phone_number}</a>
                        <a href={this.state.places.website}>{this.state.places.website}</a>
                    </div>
                )}

            </InfoWindow>
        )
    }
}

export default DetailedInfo;