import Vue from 'vue';
import Vuex from 'vuex';
import Router from '../router';
import createPersistedState from 'vuex-persistedstate';
import webSocketPlugin from './plugins/websocketPlugin';
import socketInstance from '../socketInstance';

import socketio from './modules/socketio';
import label from './events/labelEvents';
import comment from './events/commentEvents';
import board from './events/boardEvents';
import list from './events/listEvents';
import card from './events/cardEvents';
import teams from './modules/team.store';

import getters from './getters';

import AuthenticationService from '../services/AuthenticationService';

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: ({ token, user, isUserLoggedIn }) => ({
        token,
        user,
        isUserLoggedIn
      })
    }),
    webSocketPlugin
  ],
  modules: {
    socketio
  },
  state: {
    labelOverviewIsOpen: false,
    addUserIsOpen: false,
    addListIsOpen: false,
    token: null,
    user: { boards: null },
    isUserLoggedIn: false,
    board: { _id: null, lists: [{ cards: [{}] }] },
    isLoading: false,
    viewStyle: 'board',
    teams: []
  },
  getters,

  mutations: {
    ...teams.mutations,
    ...label.mutations,
    ...card.mutations,
    ...comment.mutations,
    ...board.mutations,
    ...list.mutations,
    isLoading(state, bool) {
      state.isLoading = bool;
    },
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
    },
    deleteBoard(state, { boardId }) {
      state.board = { _id: null, lists: [{ cards: [{}] }] };
    },
    addList(state, list) {
      state.board.lists.push(list);
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
    },
    addComment(state, comment) {
      state.board.lists.forEach(list => {
        let cardToAddCommment = list.cards.find(
          card => card._id === comment.cardId
        );
        if (cardToAddCommment) {
          cardToAddCommment.comments.push(comment);
        }
      });
    },
    updateCard(state, card) {
      const cardIndex = state.board.lists
        .find(list => list._id === card.list)
        .cards.findIndex(cardIterator => cardIterator._id === card._id);
      //Using Vue.set to change a value on an array, Vue.set(array, indexOfItem, newValue)
      Vue.set(
        state.board.lists.find(list => list._id === card.list).cards,
        cardIndex,
        card
      );
    },
    addUserToBoard(state, payload) {
      state.board.users.push(payload.user);
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
    },
    removeUserFromCard(state, { userId, cardId, listId }) {
      //Payload has userId, cardId and listId on it.

      const cardWithUser = state.board.lists
        .find(list => list._id === listId)
        .cards.find(card => card._id === cardId);

      cardWithUser.assignedUsers = cardWithUser.assignedUsers.filter(
        user => user._id !== userId
      );
    },
    updateCardOrder(state, payload) {
      const { cards, listId } = payload;
      state.board.lists.find(list => list._id === listId).cards = cards;
    },
    updateListOrder(state, { lists }) {
      state.board.lists = lists;
    },
    changeViewStyle(state, viewStyle) {
      state.viewStyle = viewStyle;
    },
    addListIsOpen(state, bool) {
      state.addListIsOpen = bool;
    },

    addUserIsOpen(state, bool) {
      state.addUserIsOpen = bool;
    }
  },
  actions: {
    ...teams.actions,

    ...label.actions,
    ...comment.actions,
    ...board.actions,
    ...list.actions,
    ...card.actions,
    async login({ commit }, loginPayload) {
      const { token, user } = (
        await AuthenticationService.login(loginPayload)
      ).data;
      socketInstance.query.token = token;
      socketInstance.disconnect();
      socketInstance.connect();
      commit('setToken', token);
      commit('setUser', user);
    },
    isLoading({ commit }, bool) {
      commit('isLoading', bool);
    },
    async logout({ commit }, shouldNavigate = false) {
      if (shouldNavigate) {
        await Router.push('/');
      }
      commit('setToken', null);
      commit('setUser', null);
      commit('setBoard', { _id: null, lists: [{ cards: [{}] }] });
      socketInstance.query.token = '';
      socketInstance.disconnect();
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    addUserToBoard({ commit }, payload) {
      commit('addUserToBoard', payload);
    },
    removeUserFromBoard({ commit }, { userId, boardId }) {
      commit('removeUserFromBoard', { userId, boardId });
      //Redirect the removed user
      if (this.state.user._id === userId) {
        Router.push('/board');
      }
    },
    changeViewStyle({ commit }, viewStyle) {
      commit('changeViewStyle', viewStyle);
    },
    addListIsOpen({ commit }, bool) {
      commit('addListIsOpen', bool);
    },

    addUserIsOpen({ commit }, bool) {
      commit('addUserIsOpen', bool);
    }
  }
});
