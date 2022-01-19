import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from '@material-ui/core'

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import { getPlacesData } from './api'

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({}) // bl/tr latitute/langtitute

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => { //your current location
      setCoordinates({ lat : latitude, lng : longitude })
    })
  },[])
  
  useEffect(() => {
    setIsLoading(true)
    getPlacesData(type)  // bounds.sw, bounds.ne as parameter to api index
    .then((data) => {
      setPlaces(data)
      setFilteredPlaces([])
      setIsLoading(false)
    })
  },[type, coordinates, bounds])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  },[rating])

  return (
    <>
      <CssBaseline />
      <Header />
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
           />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
