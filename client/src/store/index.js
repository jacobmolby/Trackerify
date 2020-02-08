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
import teams from './events/teamEvents';

import getters from './getters';

import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

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
    teams: [],
    modal: {
      message: '',
      showing: false,
      type: 'normal'
    },
    welcomeMessage: false
  },
  getters,
  mutations: {
    ...teams.mutations,
    ...label.mutations,
    ...card.mutations,
    ...comment.mutations,
    ...board.mutations,
    ...list.mutations,
    notify(state, { message, type }) {
      state.modal = { message, showing: true, type };
      setTimeout(() => {
        state.modal = { message: '', showing: false, type: 'normal' };
      }, 5000);
    },
    isLoading(state, bool) {
      state.isLoading = bool;
    },
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
      //Show welcome message
      if (user && !user.hasReadWelcomeMessage) {
        state.welcomeMessage = true;
      }
    },
    changeViewStyle(state, viewStyle) {
      state.viewStyle = viewStyle;
    },
    addListIsOpen(state, bool) {
      state.addListIsOpen = bool;
    },
    addUserIsOpen(state, bool) {
      state.addUserIsOpen = bool;
    },
    closeWelcomeMessage(state) {
      state.welcomeMessage = false;
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
    changeViewStyle({ commit }, viewStyle) {
      commit('changeViewStyle', viewStyle);
    },
    addListIsOpen({ commit }, bool) {
      commit('addListIsOpen', bool);
    },
    addUserIsOpen({ commit }, bool) {
      commit('addUserIsOpen', bool);
    },
    notify({ commit }, { message, type }) {
      if (type === undefined) type = 'normal';
      commit('notify', { message, type });
    },
    async closeWelcomeMessage({ commit }, dontShowAgain) {
      UserService.put({ hasReadWelcomeMessage: dontShowAgain });
      commit('closeWelcomeMessage');
    }
  }
});
