import axios from 'axios';

export default {

  search(query) {
    let authOptions = {
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search',
      params: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-key': '17f04c380be2bbe032778ba7c767ca50'
      },
      json: true
    };
   return axios(authOptions)

  }
}

