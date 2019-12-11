module.exports = socket => {
  socket.on('addList', list => {
    socket.broadcast.to(list.boardId).emit('addList', list);
  });

  socket.on('removeList', deletedList => {
    socket.broadcast.to(deletedList.boardId).emit('removeList', deletedList);
  });

  //update list order (draggable)
  socket.on('updateListOrder', listOrder => {
    socket.broadcast.to(listOrder.boardId).emit('updateListOrder', listOrder);
  });
};
