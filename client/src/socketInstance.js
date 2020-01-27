import { store } from './store/';
import { API_URL } from './config';
import { get } from 'lodash';
import * as io from 'socket.io-client';

const token = () => {
  let token = get(localStorage.getItem('vuex'), token, false);
  if (token) {
    console.log(token);

    return token.split(' ')[1];
  } else {
    return '';
  }
};

export default io(API_URL, {
  query: {
    token: token()
  }
});
