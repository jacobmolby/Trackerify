import socket from '../../socketInstance';
export default store => {
  if (!store.state.token) return;
  store.subscribe(({ type, payload }) => {
    // The mutation comes in the format of `{ type, payload }`.
    const blackListedMutations = [
      'setToken',
      'setUser',
      'setBoard',
      'setBoardOverview',
      'createBoard',
      //deleteBoard is Temporary
      'deleteBoard',
      'DISCONNECT',
      'CONNECT'
    ];

    const isBlacklisted = blackListedMutations.includes(type);
    const boardId = store.state.board._id;
    if (!isBlacklisted && boardId && !payload.socket) {
      console.log('emitting', type);

      socket.emit('vuexEvent', {
        boardId,
        actionName: type,
        actionPayload: payload
      });
    }
  });
};
