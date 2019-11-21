import Api from '@/services/Api';

export default {
  //Payload contains content and cardId
  post(payload) {
    return Api().post('/comment', payload);
  }
  // ,
  // delete(cardId) {
  //   return Api().delete(`/card/${cardId}`);
  // }
};
