import ChangeEmailService from '../../services/settingsServices/ChangeEmailService';
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
    }
  }
};
