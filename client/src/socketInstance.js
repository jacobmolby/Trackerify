import { store } from '@/store/store';
import * as io from 'socket.io-client';

export default io.connect('http://localhost:8000', {
  query: {
    token: store.state.token
  }
});
