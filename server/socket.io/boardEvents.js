module.exports = socket => {
  //update board title
  socket.on('updateBoard', board => {
    socket.broadcast.to(board._id).emit('updateBoard', board);
  });

  socket.on('deleteBoard', boardId => {
    socket.broadcast.emit('deleteBoard', boardId);
  });

  socket.on('addUserToBoard', payload => {
    socket.broadcast.to(payload.boardId).emit('addUserToBoard', payload);
  });

  socket.on('removeUserFromBoard', payload => {
    socket.broadcast.to(payload.boardId).emit('removeUserFromBoard', payload);
  });
};
