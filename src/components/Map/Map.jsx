import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from './mapStyles'

const Map = ({ setCoordnates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')

  return (
    <div className={classes.mapContainer} >
      { <h1> Sorry for google map api is blocked, please check your billing in GCP </h1> || <GoogleMapReact
        bootstrapURLKey={{ key : process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[ 50, 50, 50, 50 ]}
        yesIWantToUseGoogleMapApiInternals
        options={{ disableDefaultUI : true, zoomControl : true, styles : mapStyles }}
        onChange={(e) => {
          setCoordnates({ lat: e.center.lat , lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => {setChildClicked(child)}} //click restaurant on the map
        >
          {/* {places?.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)} // convert to number type
              lng={Number(place.longitude)} 
              key={i}
            >
              {
                !isDesktop ? (
                  <LocationOnOutlinedIcon color='primary' fontSize='large' />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle2' gutterBottom >
                      {place.name}
                    </Typography>
                    <img 
                      className={classes.pointer}
                      src={place.photo ? place.photo.images.medium.url : ''}
                      alt={place.name}
                    />
                    <Rating size='small' value={Number(place.rating)} readOnly />

                  </Paper>
                )
              }
            </div>
          ))} */}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon} >
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}`} alt={i} />
          </div>
        ))}
      </GoogleMapReact>}
    </div>
  );
};

export default Map;
