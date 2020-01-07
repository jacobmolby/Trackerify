<template>
  <!-- <div style="height: calc(100% - 4em);" class="bg-white flex min-w-screen"> -->

  <div>
    <div v-if="!board || board._id !== boardId" class="mt-10 flex items-center justify-center">
      <h1 class="font-bold text-4xl">Loading</h1>
    </div>
    <main v-if="board && board._id === boardId" class="px-10">
      <!-- OVER THE lists -->
      <div class="ml-2 pt-6 flex justify-between items-center">
        <div class="inline-flex items-baseline">
          <h1
            v-if="!editingTitle"
            @click="editingTitle = !editingTitle"
            class="font-semibold text-2xl text-gray-700"
          >{{board.title}}</h1>
          <input
            v-else
            v-model="title"
            type="text"
            class="font-semibold text-2xl bg-gray-300 text-gray-700 focus:outline-none"
          />
          <delete-board :board="board" class="ml-2"></delete-board>

          <add-list></add-list>
          <label-overview>Edit Labels</label-overview>
        </div>
        <div class="flex">
          <div
            class="py-2 text-xs align-text-middle text-red-500 font-semibold"
            v-if="removeUserError"
          >{{removeUserError}}</div>
          <addUserToBoard class="mr-4" />
          <div class="flex flex-row-reverse">
            <div v-for="user in board.users" :key="user._id" class="relative -ml-2 h-8 w-8 z-0">
              <img
                class="rounded-full block border-white border-2"
                :src="user.profileImage"
                alt="Profile Image"
              />
              <div
                v-if="user._id !== $store.state.user._id"
                class="absolute inset-0 flex opacity-0 bg-red-400 rounded-full hover:opacity-75"
              >
                <button
                  class="flex justify-center w-full items-center focus:outline-none"
                  @click="removeUser(user._id)"
                >
                  <svg class="h-3 w-3 fill-current text-gray-800 opacity-100" viewBox="0 0 20 20">
                    <path
                      d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- BOARD AREA -->
      <div class="overflow-x-auto">
        <div v-if="lists">
          <draggable
            class="py-6 h-full inline-flex flex-shrink-0 items-start"
            group="list"
            tag="div"
            v-model="lists"
            @start="drag=true"
            @end="drag=false"
          >
            <div v-for="list in lists" :key="list._id">
              <div v-if="list.cards">
                <List :listId="list._id" :title="list.title" :listColor="list.color"></List>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </main>
    <connection-lost></connection-lost>
  </div>
</template>

<script>
//Plugins
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
//Components
import List from '@/components/List';
import AddList from '@/components/AddList';
import AddUserToBoard from '@/components/AddUserToBoard';
import DeleteBoard from '@/components/DeleteBoard';
import LabelOverview from '@/components/labels/LabelOverview';
import ConnectionLost from '@/components/reusables/ConnectionLost';
//Server API
import BoardService from '@/services/BoardService';
import UserBoardService from '@/services/UserBoardService';
import ListOrderService from '@/services/ListOrderService';
export default {
  name: 'Board',
  data() {
    return {
      boardId: this.$route.params.boardId,
      removeUserError: null,
      editingTitle: false,
      title: ''
    };
  },
  components: {
    List,
    AddList,
    AddUserToBoard,
    DeleteBoard,
    LabelOverview,
    draggable,
    ConnectionLost
  },
  computed: {
    ...mapState(['board']),
    lists: {
      get() {
        return this.$store.state.board.lists;
      },
      set(lists) {
        try {
          const payload = {
            lists,
            boardId: this.boardId
          };

          this.updateListOrder(payload);
          this.$store.dispatch('updateListOrder', lists);
          this.$socket.emit('updateListOrder', lists);
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  async mounted() {
    try {
      const board = (await BoardService.show(this.boardId)).data;

      this.$store.dispatch('setBoard', board);
      this.title = this.board.title;
      this.$socket.emit('setBoard', board);
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
  methods: {
    async updateListOrder(payload) {
      payload.lists = payload.lists.map(list => list._id);
      try {
        const response = (await ListOrderService.put(payload)).data;
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async removeUser(userId) {
      this.removeUserError = null;
      if (userId === this.$store.state.user._id) {
        return (this.removeUserError = 'You cannot remove yourself');
      }
      try {
        await UserBoardService.delete(userId, this.boardId);
        const storePayload = {
          userId,
          boardId: this.boardId
        };
        this.$store.dispatch('removeUserFromBoard', storePayload);
        this.$socket.emit('removeUserFromBoard', storePayload);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async updateTitle() {
      if (this.title === this.board.title) {
        this.editingTitle = false;

        return;
      }
      if (this.title.trim() === '') {
        //TODO implement an error
        this.title = 'Enter a title';
        return;
      }
      const payload = {
        title: this.title,
        boardId: this.boardId
      };
      try {
        const board = (await BoardService.update(payload)).data;
        //Dipatch action
        this.$socket.emit('updateBoard', board);
        this.$store.dispatch('updateBoard', board);

        this.editingTitle = false;
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  created() {
    const handleTitleKeyPresses = e => {
      if (this.editingTitle === false) {
        return;
      }
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.editingTitle = false;
      }
      if (e.key === 'Enter') {
        this.updateTitle();
      }
    };
    document.addEventListener('keydown', handleTitleKeyPresses);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleTitleKeyPresses);
    });
  }
};
</script>

<style>
</style>