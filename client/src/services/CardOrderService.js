import Api from '@/services/Api';

export default {
  put(payload) {
    //Payload contains listId and cards, which is an array of the cards
    return Api().put(`/card/order`, payload);
  }
};
