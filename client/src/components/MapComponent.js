import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MapComponent = (props) => {
    const { coordinates } = props

    return(
        <div>
            <GoogleMap 
                defaultZoom={10} 
                defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }} 
            >
                
            </GoogleMap>
        </div>
    )
}
export default MapComponent