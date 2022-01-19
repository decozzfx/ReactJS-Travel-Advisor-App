import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ setCoordnates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')

  return (
    <div className={classes.mapContainer} >
      <GoogleMapReact
        bootstrapURLKey={{ key : 'AIzaSyDhUCvN9TNjGpR2GHFBNTV91DmAgFs8J1E' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[ 50, 50, 50, 50 ]}
        yesIWantToUseGoogleMapApiInternals
        options={''}
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
      </GoogleMapReact>
    </div>
  );
};

export default Map;
