module.exports = io => {
  io.use((socket, next) => {
    //TODO verify token
    let token = socket.handshake.query.token;

    if (token) {
      return next();
    }
    return next(new Error('authentication error'));
  });

  io.on('connection', socket => {
    console.log(`A user connected with socket id ${socket.id}`);
    socket.emit('CONNECT');

    // Makes sure that everyone in the same board is in the same room, so only they will get the messages
    socket.on('setBoard', board => {
      //Resets the lastBoardId which is determining the socket room
      if (socket.lastBoard) {
        socket.leave(socket.lastBoard);
        socket.lastBoard = null;
      }
      socket.join(board._id);
      socket.lastBoard = board._id;
    });
    //Update, Delete, Add user, remove user
    require('./boardEvents')(socket);
    //Add, Delete, update list order
    require('./listEvents')(socket);
    //Add, Delete, update, add user, remove user
    require('./cardEvents')(socket);
    //Add
    require('./commentEvents')(socket);
    //Add
    require('./labelEvents')(socket);

    socket.on('vuexEvent', payload => {
      //The payload is an object with
      //{boardId: "5as4d65a4sd4asdasd",
      // actionName: "deleteBoard",
      // actionPayload:{Action payload}}
      const { boardId, actionName, actionPayload } = payload;
      actionPayload.socket = true;
      console.log('Vuex Event');

      socket.broadcast.to(boardId).emit(actionName, actionPayload);
    });

    socket.on('disconnect', () => {
      socket.emit('DISCONNECT');

      console.log(`A user disconnected with socket id ${socket.id}`);
    });
  });
};
