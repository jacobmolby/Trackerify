export function fireAction(action, store, socket, payload, boardId) {
  if (typeof action !== 'string') {
    return console.error('The action must be of type string.');
  }
  if (typeof payload !== 'object') {
    return console.error('The payload must be of type object.');
  }

  //Checks if the payload has more than 1 value (it's a proper object)
  if (Object.keys(payload).length > 1) {
    store.dispatch(action, payload);
  } else {
    //If the object only has one key, it's meant to be sent as string

    //TODO Make all store actions depend on objects, to be consistent
    store.dispatch(action, Object.values(payload)[0]);
  }
  //Adds the boardId to the payload and sends it to the websocket server
  payload.boardId = boardId;
  socket.emit(action, payload);
}
