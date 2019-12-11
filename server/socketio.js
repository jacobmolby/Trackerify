module.exports = io => {
  io.use((socket, next) => {
    //TODO verify token
    let token = socket.handshake.query.token;
    if (token) {
      return next();
    }
    return next(new Error('authentication error'));
  });

  // io.on('connection', socket => {
  //   socket.use((packet, next) => {
  //     console.log(packet);
  //     return next();
  //     next(new Error('Not a doge error'));
  //   });
  // });
  io.on('connection', socket => {
    console.log(`A user connected with socket id ${socket.id}`);
    socket.emit('custom');

    // Makes sure that everyone in the same board is in the same room, so only they will get the messages
    socket.on('setBoard', board => {
      if (socket.lastBoard) {
        socket.leave(socket.lastBoard);
        socket.lastBoard = null;
      }
      socket.join(board._id);
      socket.lastBoard = board._id;
    });
    //update board title
    socket.on('updateBoard', board => {
      socket.broadcast.to(board._id).emit('boardUpdated', board);
    });
    //update list order (draggable)
    socket.on('updateListOrder', listOrder => {
      socket.broadcast
        .to(listOrder.boardId)
        .emit('ListOrderUpdated', listOrder);
    });

    socket.on('disconnect', () => {
      console.log(`A user disconnected with socket id ${socket.id}`);
    });
  });
};
