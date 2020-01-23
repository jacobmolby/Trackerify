/* eslint-disable no-debugger */
import { get } from 'lodash';
import socket from '../../socketInstance';

export default store => {
  if (!store.state.token) return;
  store.subscribe(({ type, payload }) => {
    console.log('Mutation:', type);

    // The mutation comes in the format of `{ type, payload }`.
    const blackListedMutations = [
      'setToken',
      'setUser',
      // 'setBoard',
      'setBoardOverview',
      'createBoard',
      'isLoading',
      'addListIsOpen',
      'labelOverviewIsOpen',
      'addUserIsOpen',
      'changeViewStyle',
      'SOCKET_DISCONNECT',
      'SOCKET_CONNECT'
    ];

    const isBlacklisted = blackListedMutations.includes(type);
    const boardIdFromPayload = get(payload, 'boardId', false);
    //virker ikke? boardId bliver null hvis state.board._id er undefined
    const boardId = get(store, 'state.board._id', boardIdFromPayload);

    const fromSocket = get(payload, 'socket', false);

    if (!isBlacklisted && boardId && !fromSocket) {
      console.log('Emitting:', type);

      socket.emit('vuexEvent', {
        boardId,
        actionName: type,
        actionPayload: payload
      });
    }
  });
};
