import Api from '@/services/Api';

export default {
  //Payload contains title and boardId
  post(payload) {
    return Api().post('/list', payload);
  },
  delete(listId) {
    return Api().delete(`/list/${listId}`);
  },
  put(payload) {
    //Payload contains listId and cards, which is an array of the cards

    return Api().put(`/list/`, payload);
  }
};
