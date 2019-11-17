import Api from '@/services/Api';

export default {
  getCourse(payload) {
    console.log(payload);

    return Api().get('course/', { params: payload });
  },
  createCourse(payload) {
    return Api().post('course/create', payload);
  },
  addUserToCourse(payload) {
    return Api().post('course/adduser', payload);
  }
};
