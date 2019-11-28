import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/card/user', payload);
  }
  // delete(listId) {
  //   return Api().delete(`/list/${listId}`);
  // }
};
