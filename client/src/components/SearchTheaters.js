import React, { useState } from 'react'
import MapComponent from './MapComponent'
import { withScriptjs, withGoogleMap } from 'react-google-maps'

const SearchTheaters = (props) => {
    const [coordinates, setCoordinates] = useState({ lat: 37.7199247, lng: -122.1689284 })

    const MapWrapper = withScriptjs(withGoogleMap(MapComponent))

    return(
        <div>
            <div style={{width: '80vw', height: '500px'}}>
                <MapWrapper 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCx3qnDt6ImRtWWYfUUoxBoj-8XFNMXSUo`} 
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                    coordinates={coordinates}
                />
            </div>
        </div>
    )
}
export default SearchTheaters