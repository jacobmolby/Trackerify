import ChangeEmailService from '../../services/settingsServices/ChangeEmailService';
import ChangePasswordService from '../../services/settingsServices/ChangePasswordService';
export default {
  mutations: {
    changeEmail(state, { email }) {
      state.user.email = email;
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
    }
  }
};
