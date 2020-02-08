/* eslint-disable no-console */
import { get } from 'lodash';
import socket from '../../socketInstance';

export default store => {
  if (!store.state.token) return;
  store.subscribe(({ type, payload }) => {
    const development = process.env.VUE_APP_DEBUG !== 'FALSE';
    if (development) console.log('Mutation:', type);

    // The mutation comes in the format of `{ type, payload }`.
    const blackListedMutations = [
      'setToken',
      'setUser',
      'setBoardOverview',
      'createBoard',
      'isLoading',
      'addListIsOpen',
      'labelOverviewIsOpen',
      'addUserIsOpen',
      'changeViewStyle',
      'setTeams',
      'SOCKET_DISCONNECT',
      'SOCKET_CONNECT',
      'notify',
      'closeWelcomeMessage'
    ];

    const isBlacklisted = blackListedMutations.includes(type);

    const boardIdFromPayload = get(payload, 'boardId', false);
    //virker ikke? boardId bliver null hvis state.board._id er undefined

    let boardId = get(store, 'state.board._id', boardIdFromPayload);
    if (type === 'deleteBoard') {
      boardId = payload.boardId;
    }

    const fromSocket = get(payload, 'socket', false);

    if (!isBlacklisted && boardId && !fromSocket) {
      if (development) console.log('Emitting:', type);

      socket.emit('vuexEvent', {
        boardId,
        actionName: type,
        actionPayload: payload
      });
    }
  });
};
