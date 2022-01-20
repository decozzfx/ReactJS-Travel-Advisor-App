import axios from 'axios'

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (type, coordinates) => { // sw , ne as parameter
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, { 
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          // bl_latitude: '11.847676',  //sw.lat
          // tr_latitude: '12.838442',  //ne. lat
          // bl_longitude: '109.095887', //sw.lng
          // tr_longitude: '109.149359', //ne.lng 
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
        }
      })

        return data

    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: {
        lon: lng,
        lat: lat,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
      }
    }) 
    return data
  } catch (error) {
    console.info(error)
  }
}