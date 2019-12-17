import Api from '@/services/Api';

export default {
  put(payload) {
    //Payload contains boardId and lists, which is an array of the lists

    return Api().put(`/list/order`, payload);
  }
};
