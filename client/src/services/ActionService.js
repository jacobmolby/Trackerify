export function fireAction(actionName, store, socket, actionPayload, boardId) {
  if (typeof actionName !== 'string') {
    return console.error('The action must be of type string.');
  }
  if (typeof actionPayload !== 'object') {
    return console.error('The payload must be of type object.');
  }

  //Checks if the payload has more than 1 value (it's a proper object)
  if (Object.keys(actionPayload).length > 0) {
    store.dispatch(actionName, actionPayload);
  } else {
    //If the object only has one key, it's meant to be sent as string
    return console.error('Error with the payload');

    //TODO Make all store actions depend on objects, to be consistent
    // store.dispatch(actionName, Object.values(actionPayload)[0]);
  }
  //Adds the boardId to the payload and sends it to the websocket server
  // payload.boardId = boardId;
  // socket.emit(action, payload);
  socket.emit('vuexEvent', { boardId, actionName, actionPayload });
}
