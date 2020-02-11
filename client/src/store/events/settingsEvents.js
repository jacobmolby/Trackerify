import ChangeEmailService from '../../services/settingsServices/ChangeEmailService';
import ChangePasswordService from '../../services/settingsServices/ChangePasswordService';
import ChangeImageService from '../../services/settingsServices/ChangeImageService';
export default {
  mutations: {
    changeEmail(state, { email }) {
      state.user.email = email;
    },
    changeProfileImage(state, { profileImage }) {
      state.user.profileImage = profileImage;
    }
  },
  actions: {
    async changeEmail({ commit }, { email, password }) {
      await ChangeEmailService.put({ email, password });
      commit('changeEmail', { email });
      commit('notify', { message: 'Email Changed Succesfully' });
    },
    async changePassword({ commit }, { newPassword, oldPassword }) {
      await ChangePasswordService.put({ newPassword, oldPassword });
      commit('notify', { message: 'Password Changed Succesfully' });
    },
    async deleteProfileImage({ commit }) {
      await ChangeImageService.delete();
      commit('changeProfileImage', {
        profileImage: '/img/no-profile-picture.png'
      });
      commit('notify', { message: 'Profile Image Deleted Succesfully' });
    },
    async changeProfileImage({ commit }, { imageUrl }) {
      await ChangeImageService.put({ imageUrl });
      commit('changeProfileImage', { profileImage: imageUrl });
      commit('notify', { message: 'Profile Image Changed Succesfully' });
    }
  }
};
