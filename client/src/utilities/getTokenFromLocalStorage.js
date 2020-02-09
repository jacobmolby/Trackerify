import { get } from 'lodash';

export const token = () => {
  let token = get(JSON.parse(localStorage.getItem('vuex')), 'token', false);

  return token ? token : '';
};
