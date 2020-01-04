const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const listRoutes = require('./routes/list');
const cardRoutes = require('./routes/card');
const commentRoutes = require('./routes/comment');
const labelRoutes = require('./routes/label');
const labelCardRoutes = require('./routes/labelCard');
const attachmentRoutes = require('./routes/attachment');
const userBoardRoutes = require('./routes/userBoard');
const userCardRoutes = require('./routes/userCard');
const listOrderRoutes = require('./routes/listOrder');

module.exports = app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/board', boardRoutes);
  app.use('/api/list', listRoutes);
  app.use('/api/card', cardRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/label', labelRoutes);
  app.use('/api/label/card', labelCardRoutes);
  app.use('/api/attachment', attachmentRoutes);
  app.use('/api/board/user', userBoardRoutes);
  app.use('/api/card/user', userCardRoutes);
  app.use('/api/list/order', listOrderRoutes);
};
