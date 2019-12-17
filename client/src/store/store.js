import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import socketio from './socketio';
Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    socketio
  },
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    board: null
  },
  getters: {
    getCardsByListId: state => listId => {
      return state.board.lists.find(list => list._id === listId).cards;
    },
    getCardById: state => cardId => {
      let cardById = {};
      state.board.lists.forEach(list =>
        list.cards.forEach(card => {
          if (card._id === cardId) {
            cardById = card;
          }
        })
      );
      return cardById;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setBoard(state, board) {
      state.board = board;
    },
    createBoard(state, board) {
      state.user.boards.push(board);
    },
    updateBoard(state, board) {
      state.board.title = board.title;
      state.user.boards.find(stateBoard => stateBoard._id === board._id).title =
        board.title;
    },
    deleteBoard(state, boardId) {
      state.board = null;
      state.user.boards = state.user.boards.filter(
        board => board._id !== boardId
      );
    },
    addList(state, list) {
      state.board.lists.push(list);
      state.user.boards
        .find(board => board._id === list.boardId)
        .lists.push(list._id);
    },
    addCard(state, card) {
      state.board.lists.find(list => list._id === card.list).cards.push(card);
    },
    removeCard(state, deletedCard) {
      state.board.lists.find(
        list => list._id === deletedCard.list
      ).cards = state.board.lists
        .find(list => list._id === deletedCard.list)
        .cards.filter(card => card._id !== deletedCard._id);
    },
    removeList(state, deletedList) {
      state.board.lists = state.board.lists.filter(list => {
        return list._id !== deletedList._id;
      });

      //For boardOverview
      state.user.boards.find(
        board => board._id === deletedList.boardId
      ).lists = state.user.boards
        .find(board => board._id === deletedList.boardId)
        .lists.filter(list => list !== deletedList._id);
    },
    addComment(state, comment) {
      state.board.lists
        .find(list => list._id === comment.listId)
        .cards.find(card => card._id === comment.cardId)
        .comments.push(comment);
    },
    updateCard(state, card) {
      const listIndex = state.board.lists.findIndex(
        list => list._id === card.list
      );
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        cardIterator => cardIterator._id === card._id
      );
      state.board.lists[listIndex].cards[cardIndex] = card;
    },
    addUserToBoard(state, payload) {
      state.board.users.push(payload.user);
      state.user.boards
        .find(board => board._id === payload.boardId)
        .users.push(payload.userId);
    },
    addUserToCard(state, payload) {
      const { user, listId, cardId } = payload;

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.push(user);
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
      //For boardOverview
      state.user.boards.find(
        board => board._id === payload.boardId
      ).users = state.user.boards
        .find(board => board._id === payload.boardId)
        .users.filter(user => user !== payload.userId);
    },
    removeUserFromCard(state, payload) {
      //Payload has userId, cardId and listId on it.

      const { userId, cardId, listId } = payload;

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(
          card => card._id === cardId
        ).assignedUsers = state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.filter(user => user._id !== userId);
    },
    updateCardOrder(state, payload) {
      const { cards, listId } = payload;
      state.board.lists.find(list => list._id === listId).cards = cards;
    },
    updateListOrder(state, lists) {
      state.board.lists = lists;
    }
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      commit('setBoard', null);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setBoard({ commit }, board) {
      commit('setBoard', board);
    },
    createBoard({ commit }, board) {
      commit('createBoard', board);
    },
    updateBoard({ commit }, board) {
      commit('updateBoard', board);
    },
    deleteBoard({ commit }, boardId) {
      commit('deleteBoard', boardId);
    },
    addList({ commit }, list) {
      commit('addList', list);
    },
    addCard({ commit }, card) {
      commit('addCard', card);
    },
    removeCard({ commit }, deletedCard) {
      commit('removeCard', deletedCard);
    },
    removeList({ commit }, deletedList) {
      commit('removeList', deletedList);
    },
    addComment({ commit }, comment) {
      commit('addComment', comment);
    },
    updateCard({ commit }, card) {
      commit('updateCard', card);
    },
    addUserToBoard({ commit }, payload) {
      commit('addUserToBoard', payload);
    },
    addUserToCard({ commit }, payload) {
      commit('addUserToCard', payload);
    },
    removeUserFromBoard({ commit }, userId) {
      commit('removeUserFromBoard', userId);
    },
    removeUserFromCard({ commit }, payload) {
      commit('removeUserFromCard', payload);
    },
    updateCardOrder({ commit }, value) {
      commit('updateCardOrder', value);
    },
    updateListOrder({ commit }, lists) {
      commit('updateListOrder', lists);
    }
  }
});
