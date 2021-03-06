import Api from '@/services/Api';

export default {
  post(payload) {
    return Api().post('/team/user', payload);
  },
  delete({ teamId, userId }) {
    return Api().delete(`/team/user/${teamId}&${userId}`);
  }
};
