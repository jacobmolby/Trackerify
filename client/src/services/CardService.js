import Api from '@/services/Api';

export default {
  //Payload contains title and boardId
  post(payload) {
    return Api().post('/card', payload);
  },
  delete(cardId) {
    return Api().delete(`/card/${cardId}`);
  },
  put(payload) {
    return Api().put('/card', payload);
  }
};
