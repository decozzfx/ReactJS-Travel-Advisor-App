import axios from 'axios'

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (type) => { // sw , ne as parameter
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, { 
        params: {
          bl_latitude: '11.847676',  //sw.lat
          tr_latitude: '12.838442',  //ne. lat
          bl_longitude: '109.095887', //sw.lng
          tr_longitude: '109.149359', //ne.lng 
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': 'b5d80ff106mshf1dc155df3def96p1cb279jsn311f4291fb0f'
        }
      })

        return data

    } catch (error) {
        console.log(error)
    }
}