import axios from 'axios';
import { store } from '@/store/';
import { API_URL } from '../config';
import { token } from '../utilities/getTokenFromLocalStorage';

export default () => {
  return axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 30000,
    //Assign the token, to use protected routes (every right now).
    headers: {
      Authorization: 'Bearer ' + token()
    }
  });
};
