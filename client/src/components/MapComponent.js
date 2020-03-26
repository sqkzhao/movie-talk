import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MapComponent = (props) => {
    const { theater, coordinates, locations, setlocations } = props
    const [selected, setSelected] = useState(null)

    return(
        <div>
            <GoogleMap 
                defaultZoom={10} 
                defaultCenter={coordinates} 
            >
                {locations.map((location, i) => (
                    <Marker 
                        key={i} position={{lat: location.lat, lng: location.lng}} 
                        onClick={() => setSelected({lat: location.lat, lng: location.lng})}
                    />
                ))}

                {(selected !== null) &&
                    <InfoWindow position={{lat: selected.lat, lng: selected.lng}}>
                        <div className="text-dark">
                            <p><strong>Selected movie theater:</strong></p>
                            <p>{theater}</p>
                        </div>
                    </InfoWindow>
                }
            </GoogleMap>
        </div>
    )
}
export default MapComponent