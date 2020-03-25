import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import styles from '../module.css/Map.module.css'

const SearchComponent = (props) => {
    const { setTheater, setCoordinates, locations, setlocations } = props
    const [search, setSearch] = useState('')

    const selectHandler = async value => {
        setTheater(value)
        const results = await geocodeByAddress(value)   // value: address
        const latLng = await getLatLng(results[0])
        setCoordinates(latLng)
        setSearch(value)
        const selected = {
            address: value,
            lat: latLng.lat,
            lng: latLng.lng
        }
        locations.push(selected)
        setlocations(locations)
    }

    return(
        <div>
            <PlacesAutocomplete value={search} onChange={setSearch} onSelect={selectHandler}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        {/* get input value returned from getInputProps() */}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text rounded-0"><i className="fas fa-search-location" id={styles.searchIcon}></i> Search nearby movie theaters</span>
                            </div>
                            <input {...getInputProps({ placeholder:"Enter keyword 'movie' or any movie theaters company", className:"form-control rounded-0" })} />  
                        </div>
                        {/* LIST SUGGESTIONS */}
                        <div className="text-dark">
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                    padding: "2px"
                                }
                                if(suggestion.terms.length > 4) {
                                    return(
                                        // get suggestion props & attach style => render suggestion
                                        <div {...getSuggestionItemProps(suggestion, {style})}>  
                                            {suggestion.description}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}
export default SearchComponent