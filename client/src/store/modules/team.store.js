import TeamService from '../../services/TeamService';
export default {
  state: [],
  mutations: {
    setTeams(state, teams) {
      //Used to override the state in its entirety
      Object.assign(state, teams);
    },
    createTeam(state, team) {
      state.push(team);
    }
  },
  actions: {
    async setTeams({ commit }) {
      commit('isLoading', true, { root: true });
      const teams = (await TeamService.get()).data;
      commit('setTeams', teams);
      commit('isLoading', false, { root: true });
    },
    async createTeam({ commit }, payload) {
      //VISER IKKE MEDLEMMER
      const team = (await TeamService.post(payload)).data;
      commit('createTeam', team);
    }
  }
};
