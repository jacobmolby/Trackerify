import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/board/user', payload);
  }
  // delete(listId) {
  //   return Api().delete(`/list/${listId}`);
  // }
};
