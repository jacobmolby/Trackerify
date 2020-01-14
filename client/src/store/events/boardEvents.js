import BoardService from '../../services/BoardService';
import Router from '../../router';
import socket from '../../socketInstance';

export default {
  mutations: {
    setBoardOverview(state, boards) {
      state.user.boards = boards;
    }
  },
  actions: {
    async setBoardOverview({ commit }) {
      const boards = (await BoardService.index()).data;
      commit('setBoardOverview', boards);
    },
    async setBoard({ commit }, { boardId }) {
      const board = (await BoardService.show(boardId)).data;
      socket.emit('setBoard', { _id: board._id });
      commit('setBoard', board);
    },
    async createBoard({ commit }, { title }) {
      const board = (await BoardService.post({ title })).data;
      commit('createBoard', board);
    },
    async updateBoard({ commit }, payload) {
      const board = (await BoardService.update(payload)).data;
      commit('updateBoard', board);
    },
    async deleteBoard({ commit }, { boardId }) {
      // console.log(boardId);

      await BoardService.delete(boardId);
      //Do routing in here
      Router.push({
        name: 'boardOverview'
      });
      commit('deleteBoard', { boardId });
    }
  }
};
