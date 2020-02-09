import { store } from './store/';
import { API_URL } from './config';
import * as io from 'socket.io-client';
import { token } from './utilities/getTokenFromLocalStorage';

export default io(API_URL, {
  transports: ['websocket'],
  query: {
    token: token()
  }
});
