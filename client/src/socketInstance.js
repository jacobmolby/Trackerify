import { store } from './store/';
import { API_URL } from './config';
import * as io from 'socket.io-client';

const token = () => {
  if (store) {
    return store.state.token;
  } else if (JSON.parse(localStorage.getItem('vuex'))) {
    return JSON.parse(localStorage.getItem('vuex')).token;
  } else {
    return null;
  }
};

export default io(API_URL, {
  query: {
    token: token()
  }
});
