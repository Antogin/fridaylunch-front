import axios from 'axios';

export default {
  apiKey: '17f04c380be2bbe032778ba7c767ca50',

  search(query) {

    let authOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search',
      params: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.apiKey
      },
      json: true
    };
    return axios(authOptions)
  },

  getCollections() {
    const query = {
      city_id: '64',
    };

    let authOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/collections',
      params: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.apiKey
      },
      json: true
    };

    return axios(authOptions)
  },

  getCollection(id) {
    const query = {
      entity_id: '64',
      entity_type: 'city',
      collection_id: id
    };

    let authOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search',
      params: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.apiKey
      },
      json: true
    };

    return axios(authOptions)
  },

  getEstablishment() {
    let establishmentQuery = {
      city_id: '64',
    };
    let establishmentOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/establishments',
      params: establishmentQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.apiKey
      },
      json: true
    };
    return axios(establishmentOptions)
  },


  getCuisines() {
    let cuisinesQuery = {
      city_id: '64',
    };
    let cuisinesOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/cuisines',
      params: cuisinesQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': this.apiKey
      },
      json: true
    };
    return axios(cuisinesOptions)
  }

}

