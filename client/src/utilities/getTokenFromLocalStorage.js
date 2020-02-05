import { get } from 'lodash';

export const token = () => {
  let token = get(JSON.parse(localStorage.getItem('vuex')), 'token', false);
  console.log('New IO instance');

  if (token) {
    return token;
  } else {
    return '';
  }
};
