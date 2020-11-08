import React,{Component} from 'react'
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

class Maps extends Component{

    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


    render(){
        //const currentPosition=JSON.parse(localStorage.currentPosition)
        const currentPosition={lat: 42.9611427097942,lng: -78.81628445531712}
        console.log(currentPosition)
        const mapStyles = {
            width: '64%',
            height: '34%'
          };

        const dangerImage="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        
        
    let latLong=JSON.parse(localStorage.latlong)
    let i=0
    latLong=latLong.map(lat=>{
        return {id:i++,name:lat.name,coords:{lat:lat.lat,lng:lat.long}}
    })
    console.log(latLong)
    
        return (
            <Map    
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    currentPosition
                }

            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current Location'}
                />

                {latLong.map(lat=><Marker 
                    onClick={this.onMarkerClick} name={lat.name} key={lat.id} icon={dangerImage} position={lat.coords}/>)}
                
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE'
    //API key is taken from the Google Maps API sandbox. 
    //It is there as a placeholder for our API key and hence the API call would not work 
  })(Maps);