import TeamService from '../../services/TeamService';
import TeamUserService from '../../services/TeamUserService';
import TeamBoardService from '../../services/TeamBoardService';

export default {
  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
    createTeam(state, team) {
      state.teams.push(team);
    },
    deleteTeam(state, teamId) {
      state.teams = state.teams.filter(team => team._id !== teamId);
    },
    addTeamMember(state, { user, teamId }) {
      state.teams.find(team => team._id === teamId).users.push(user);
    },
    removeTeamMember(state, { userId, teamId }) {
      const theTeam = state.teams.find(team => team._id === teamId);
      theTeam.users = theTeam.users.filter(user => user._id !== userId);
    },
    addBoardToTeam(state, { board, teamId }) {
      state.teams.find(team => team._id === teamId).boards.push(board);
    },
    removeBoardFromTeam(state, { teamId, boardId }) {
      const theTeam = state.teams.find(team => team._id === teamId);
      theTeam.boards = theTeam.boards.filter(board => board._id !== boardId);
    },
    updateTeamName(state, { teamId, teamName }) {
      state.teams.find(team => team._id === teamId).name = teamName;
    }
  },
  actions: {
    async setTeams({ commit }) {
      commit('isLoading', true);
      const teams = (await TeamService.get()).data;
      commit('setTeams', teams);
      commit('isLoading', false);
    },
    async createTeam({ commit }, payload) {
      const team = (await TeamService.post(payload)).data;
      commit('createTeam', team);
    },
    async deleteTeam({ commit }, teamId) {
      await TeamService.delete(teamId);
      commit('deleteTeam', teamId);
    },
    async addTeamMember({ commit }, { user, teamId }) {
      await TeamUserService.post({ teamId, userId: user._id });
      commit('addTeamMember', { user, teamId });
    },
    async removeTeamMember({ commit }, { userId, teamId }) {
      await TeamUserService.delete({ teamId, userId });
      commit('removeTeamMember', { userId, teamId });
    },
    async addBoardToTeam({ commit }, { board, teamId }) {
      await TeamBoardService.post({ boardId: board._id, teamId });
      commit('addBoardToTeam', { board, teamId });
    },
    async removeBoardFromTeam({ commit }, { boardId, teamId }) {
      await TeamBoardService.delete({ boardId, teamId });
      commit('removeBoardFromTeam', { boardId, teamId });
    },
    async leaveTeam({ commit }, { teamId, userId }) {
      await TeamUserService.delete({ teamId, userId });
      commit('removeTeamMember', { userId, teamId });
      commit('deleteTeam', teamId);
    },
    async updateTeamName({ commit }, { teamId, teamName }) {
      await TeamService.put({ teamId, teamName });
      commit('updateTeamName', { teamId, teamName });
    }
  }
};
