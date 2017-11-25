import axios from 'axios';

export default {

  auth(username, password) {
    console.log('AUTH');
    console.log(username);
    console.log(password);
    let authOptions = {
      method: 'GET',
      url: 'http://localhost:8080/hello/',
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

