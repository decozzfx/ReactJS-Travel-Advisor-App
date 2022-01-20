import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core'

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData, getWeatherData } from './api'

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({}) // bl/tr latitute/langtitute
  const [weatherData, setWeatherData] = useState([])

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => { //your current location
      setCoordinates({ lat : latitude, lng : longitude })
      // console.info(latitude)
      // console.info(longitude)
    })
  },[])
  
  useEffect(() => {  // for renewing data or gilter data
    // if(bounds.sw && bounds.ne ){
      setIsLoading(true)
      
      getPlacesData(type, coordinates)  /// bounds.sw, bounds.ne as parameter to api index
      .then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0 ))
        setFilteredPlaces([])
        setIsLoading(false)
        
        getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data))
      })
      // }
  },[type,coordinates, bounds]) // remove coords if using bounds

  useEffect(() => { 
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  },[rating])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width : '100%' }} >
        <Grid item xs={12} md={4} >
          <List 
          places={filteredPlaces.length ? filteredPlaces : places} 
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} >
          <Map 
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}
           />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
