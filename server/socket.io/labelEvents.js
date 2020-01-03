module.exports = socket => {
  socket.on('addLabelToBoard', label => {
    socket.broadcast.to(label.boardId).emit('addLabelToBoard', label);
  });
};
