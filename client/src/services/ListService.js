import Api from '@/services/Api';

export default {
  //Payload contains title and boardId
  post(payload) {
    console.log(payload);

    return Api().post('/list', payload);
  }
};
