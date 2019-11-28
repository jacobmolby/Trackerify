import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { Z_ASCII } from 'zlib';
Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    board: null
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
    addList(state, list) {
      state.board.lists.push(list);
    },
    addCard(state, card) {
      const listIndex = state.board.lists.findIndex(
        list => list._id === card.list
      );

      state.board.lists[listIndex].cards.push(card);
    },
    removeCard(state, deletedCard) {
      const listIndex = state.board.lists.findIndex(
        list => list._id === deletedCard.list
      );
      state.board.lists[listIndex].cards = state.board.lists[
        listIndex
      ].cards.filter(card => {
        return card._id !== deletedCard._id;
      });
    },
    removeList(state, deletedList) {
      state.board.lists = state.board.lists.filter(list => {
        return list._id !== deletedList._id;
      });
    },
    addComment(state, comment) {
      const listIndex = state.board.lists.findIndex(
        list => list._id === comment.listId
      );
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        card => card._id === comment.cardId
      );
      state.board.lists[listIndex].cards[cardIndex].comments.push(comment);
    },
    updateCard(state, card) {
      const listIndex = state.board.lists.findIndex(
        list => list._id === card.list
      );
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        cardIterator => cardIterator._id === card._id
      );
      state.board.lists[listIndex].cards[cardIndex] = {
        card
      };
    },
    addUserToBoard(state, userId) {
      state.board.users.push(userId);
    },
    addUserToCard(state, payload) {
      const { user, listId, cardId } = payload;
      console.log(payload);

      state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId)
        .assignedUsers.push(user);
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setBoard({ commit }, board) {
      commit('setBoard', board);
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
    addUserToBoard({ commit }, userId) {
      commit('addUserToBoard', userId);
    },
    addUserToCard({ commit }, payload) {
      commit('addUserToCard', payload);
    }
  }
});
