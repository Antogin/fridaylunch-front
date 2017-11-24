import axios from 'axios';

export default {

  auth(username, password) {
    console.log('AUTH');
    let authOptions = {
      method: 'POST',
      url: 'https://localhost:4200',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      auth: {
        username: username,
        password: password
      },
    };
    axios(authOptions)
        .then((response) => {
          console.log('GA => response', response)
        });
  }


}

