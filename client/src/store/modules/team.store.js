import TeamService from '../../services/TeamService';
import TeamUserService from '../../services/TeamUserService';
import Vue from 'vue';
export default {
  state: [],
  mutations: {
    setTeams(state, teams) {
      //Used to override the state in its entirety
      Object.assign(state, teams);
    },
    createTeam(state, team) {
      state.push(team);
    },
    addTeamMember(state, { user, teamId }) {
      const index = state.findIndex(team => team._id === teamId);
      const newUsers = [...state[index].users, user];
      const newTeam = { ...state[index], users: newUsers };
      Vue.set(state, index, newTeam);
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
    },
    async addTeamMember({ commit }, { user, teamId }) {
      await TeamUserService.post({ teamId, userId: user._id });
      commit('addTeamMember', { user, teamId });
    }
  }
};
