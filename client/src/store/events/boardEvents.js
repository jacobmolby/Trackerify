import BoardService from '../../services/BoardService';
import UserBoardService from '../../services/UserBoardService';

import Router from '../../router';

export default {
  mutations: {
    setBoardOverview(state, boards) {
      state.user.boards = boards;
    },
    setBoard(state, board) {
      state.board = board;
    },
    createBoard(state, board) {
      state.user.boards.push(board);
    },
    updateBoard(state, board) {
      state.board.title = board.title;
    },
    deleteBoard(state, { boardId }) {
      state.board = { _id: null, lists: [{ cards: [{}] }] };
    },
    addUserToBoard(state, payload) {
      state.board.users.push(payload.user);
    },
    removeUserFromBoard(state, payload) {
      //For the setBoard
      state.board.users = state.board.users.filter(user => {
        return user._id !== payload.userId;
      });
      //For the cards in setBoard
      state.board.lists.forEach(list => {
        list.cards.forEach(card => {
          card.assignedUsers = card.assignedUsers.filter(user => {
            return user._id !== payload.userId;
          });
        });
      });
    }
  },
  actions: {
    addUserToBoard({ commit }, payload) {
      commit('addUserToBoard', payload);
    },
    async removeUserFromBoard({ commit }, { userId, boardId }) {
      await UserBoardService.delete(userId, boardId);

      commit('removeUserFromBoard', { userId, boardId });
      //Redirect the removed user
      if (this.state.user._id === userId) {
        Router.push('/board');
      }
    },
    async setBoardOverview({ commit }) {
      commit('isLoading', true);
      const boards = (await BoardService.index()).data;
      commit('setBoardOverview', boards);
      commit('isLoading', false);
    },
    async setBoard({ commit }, { boardId }) {
      const board = (await BoardService.show(boardId)).data;
      // socket.emit('setBoard', { _id: board._id });
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
