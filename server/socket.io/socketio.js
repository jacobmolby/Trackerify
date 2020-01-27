const jwt = require('jsonwebtoken');

module.exports = io => {
  io.use((socket, next) => {
    //TODO verify token
    let token = socket.handshake.query.token;

    const verified = token
      ? !!jwt.verify(token, process.env.TOKEN_SECRET)
      : false;
    socket.tokenIsVerified = verified;
    // if (verified) {
    //   socket.tokenIsVerified = false;
    // }
    next();
    // return next(new Error('authentication error'));
  });

  io.on('connection', socket => {
    console.log(`A user connected with socketID: ${socket.id}`);
    socket.emit('CONNECT');
    if (!socket.tokenIsVerified) {
      return;
    }
    socket.on('vuexEvent', payload => {
      //The payload is an object with
      //{boardId: "5as4d65a4sd4asdasd",
      // actionName: "deleteBoard",
      // actionPayload:{...ActionPayload}}
      const { boardId, actionName, actionPayload } = payload;

      if (actionName === 'setBoard') {
        // Makes sure that everyone in the same board is in the same room, so only they will get the messages
        console.log('Switched room');

        //Resets the lastBoardId which is determining the socket room
        if (socket.lastBoard) {
          socket.leave(socket.lastBoard);
          socket.lastBoard = null;
        }
        socket.join(actionPayload._id);
        socket.lastBoard = actionPayload._id;
        return;
      }
      if (actionPayload) {
        actionPayload.socket = true;
      }

      console.log('Vuex Event:', actionName, 'to', boardId);

      socket.broadcast.to(boardId).emit(actionName, actionPayload);
    });

    socket.on('disconnect', () => {
      socket.emit('DISCONNECT');

      console.log(`A user disconnected with socket id ${socket.id}`);
    });
  });
};
