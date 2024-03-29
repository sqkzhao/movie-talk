import React, { useState } from 'react'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import MapComponent from './MapComponent'
import MapSearchComponent from './MapSearchComponent'

import styles from '../module.css/Map.module.css'


const MapSearchTheaters = () => {
    const [theater, setTheater] = useState('')
    const [coordinates, setCoordinates] = useState({ lat: 37.8044, lng: -122.2712 })
    const [locations, setlocations] = useState([])

    const MapWrapper = withScriptjs(withGoogleMap(MapComponent))

    return(
        <div className="container">
            <div className={styles.mapContainer}>
                <MapWrapper 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`} 
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                    coordinates={coordinates}
                    theater={theater}
                    locations={locations} setlocations={setlocations}
                />
            </div>

            <div className={styles.search}>
                <MapSearchComponent 
                    setTheater={setTheater} setCoordinates={setCoordinates} 
                    locations={locations} setlocations={setlocations}
                />
            </div>
        </div>
    )
}
export default MapSearchTheaters