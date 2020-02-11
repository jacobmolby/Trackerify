import Api from '@/services/Api';

export default {
  get({ encodedName, encodedFileType }) {
    return Api().get(
      `user/image?file-name=${encodedName}&file-type=${encodedFileType}`
    );
  },
  put(payload) {
    return Api().put('user/image', payload);
  },
  delete() {
    return Api().delete('user/image');
  }
};
