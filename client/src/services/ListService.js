import Api from '@/services/Api';

export default {
  //Payload contains title,color and boardId
  post(payload) {
    return Api().post('/list', payload);
  },
  delete(listId) {
    return Api().delete(`/list/${listId}`);
  },
  put(payload) {
    return Api().put('/list', payload);
  }
};
