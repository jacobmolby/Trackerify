module.exports = socket => {
  socket.on('addLabelToBoard', label => {
    socket.broadcast.to(label.boardId).emit('addLabelToBoard', label);
  });
  socket.on('removeLabelFromBoard', payload => {
    socket.broadcast
      .to(payload.boardId)
      .emit('removeLabelFromBoard', payload.labelId);
  });
};
