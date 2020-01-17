<template>
  <div class="flex overflow-hidden h-screen">
    <!-- Sidebar -->
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen">
      <h2 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Issues</h2>
      <div class="mt-2 -mx-3">
        <a
          href="#"
          class="px-3 py-1 flex justify-between text-gray-700 text-sm font-medium bg-gray-200 rounded-lg"
        >
          <span>All</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfAllCards}}</span>
        </a>
        <a
          href="#"
          class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
        >
          <span>Created by me</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfCardsCreatedByMe}}</span>
        </a>
        <a
          href="#"
          class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
        >
          <span>Archived</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfArchivedCards}}</span>
        </a>
        <a
          href="#"
          class="mt-1 px-3 py-1 flex justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg"
        >
          <span>Assigned to me</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfCardsAssignedToMe}}</span>
        </a>
      </div>
      <h2 class="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide">Labels</h2>
      <div class="mt-2 -mx-3">
        <button
          v-for="label in board.labels"
          :key="label._id"
          class="mt-1 px-3 py-1 flex w-full justify-between text-gray-700 text-sm font-medium hover:bg-gray-200 rounded-lg items-center"
        >
          <span>{{label.title}}</span>
          <svg
            class="h-2 w-2"
            :style="{'color':label.color}"
            viewBox="0 0 8 8"
            fill="currentColor"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
        </button>
      </div>
    </Sidebar>

    <!-- Main content -->
    <div v-if="!isLoading" class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <Topbar @openSidebar="isOpen = true" />
            <div class="py-2 sm:flex items-center justify-between">
              <div class="flex justify-between sm:justify-start">
                <div class="flex items-baseline">
                  <h1
                    v-if="!editingTitle"
                    @click="editingTitle = !editingTitle"
                    class="font-semibold text-2xl text-gray-800"
                  >{{board.title}}</h1>
                  <input
                    v-else
                    v-model="title"
                    type="text"
                    class="font-semibold text-2xl bg-gray-300 text-gray-800"
                  />
                  <DeleteBoard :board="board" class="ml-2"></DeleteBoard>
                </div>
                <div class="flex items-center ml-4">
                  <div
                    v-for="user in board.users"
                    :key="user._id"
                    class="relative -ml-2 h-8 w-8 z-0"
                  >
                    <img
                      class="rounded-full block border-white border-2"
                      :src="user.profileImage"
                      alt="Profile Image"
                    />
                    <div
                      v-if="user._id !== $store.state.user._id"
                      class="absolute inset-0 flex opacity-0 bg-red-600 rounded-full hover:opacity-100"
                    >
                      <button
                        class="flex justify-center w-full items-center"
                        @click="removeUser(user._id)"
                      >
                        <svg
                          class="h-3 w-3 fill-current text-gray-200 opacity-100"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <AddUserToBoard class="ml-2 hidden xl:block" />
                </div>
              </div>

              <div class="py-1 flex items-center">
                <span class="p-1 hidden bg-gray-200 border rounded sm:inline-flex">
                  <button
                    @click="changeViewStyle('listView')"
                    class="leading-tight px-2 py-1 mr-1 rounded"
                    :class="listView ? 'bg-white  shadow': 'transition-bg ease-out transition-500'"
                  >List View</button>
                  <button
                    @click="changeViewStyle('boardView')"
                    class="leading-tight px-2 py-1 ml-1 rounded"
                    :class="!listView ? 'bg-white  shadow': 'transition-bg ease-out transition-500'"
                  >Board View</button>
                </span>
                <LabelOverview class="w-1/2 sm:w-auto mr-1 sm:mr-0 sm:ml-2">Edit Labels</LabelOverview>
                <AddList class="w-1/2 sm:w-auto ml-1" />
              </div>
            </div>
          </div>
          <div class="flex p-1 bg-gray-200 border-t sm:hidden">
            <button
              @click="changeViewStyle('listView')"
              class="w-1/2 leading-tight px-2 py-1 mr-1"
              :class="listView ? 'bg-white rounded shadow transition-bg ease-in transition-500': 'transition-bg ease-out transition-500'"
            >List</button>
            <button
              @click="changeViewStyle('boardView')"
              class="w-1/2 leading-tight px-2 py-1 ml-1"
              :class="!listView ? 'bg-white rounded shadow transition-bg ease-in transition-500': 'transition-bg ease-out transition-500'"
            >Board</button>
          </div>
        </header>
      </div>
      <!-- START MAIN BOARD AREA -->
      <div v-if="!listView" class="flex-1 overflow-auto">
        <draggable
          class="inline-flex h-full p-3 overflow-hidden"
          animation="50"
          ghost-class="bg-blue-200"
          group="list"
          tag="main"
          v-model="lists"
          @start="drag=true"
          @end="drag=false"
        >
          <List
            v-for="list in lists"
            :key="list._id"
            :listId="list._id"
            :listTitle="list.title"
            :listColor="list.color"
          />
        </draggable>
      </div>
      <!-- END MAIN BOARD AREA -->
      <!-- START LIST VIEW -->
      <div v-if="listView" class="overflow-hidden">
        <main class="flex flex-col items-center h-full p-3 overflow-auto">
          <div v-for="list in lists" :key="list._id" class="mt-2 w-full bg-gray-200 rounded">
            <div class="px-3 py-3 flex-shrink-0 justify-between items-center">
              <h2 class="pb-2 w-full text-gray-700 text-sm font-medium">{{list.title}}</h2>
              <ol>
                <li
                  v-for="card in $store.getters.getCardsByListId(list._id)"
                  :key="card._id"
                  class="mb-2 p-3 rounded shadow bg-white"
                >
                  <Card :cardId="card._id"></Card>
                </li>
              </ol>
            </div>
          </div>
        </main>
      </div>
      <!-- END LIST VIEW -->
    </div>
    <button
      @click="isOpen = false"
      :class="isOpen ? 'block' : 'hidden'"
      class="absolute w-full h-full inset-0 bg-black opacity-50 lg:hidden cursor-default"
    ></button>
    <LoadingSpinner v-if="isLoading" class="mt-10 flex items-center justify-center" />
    <ConnectionLost />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import UserBoardService from '../services/UserBoardService';
import List from '../components/list/List';
import Topbar from '../components/TheTopbar';
import Sidebar from '../components/Sidebar';

import AddList from '../components/list/AddList';
import DeleteBoard from '../components/board/DeleteBoard';
import AddUserToBoard from '../components/board/AddUserToBoard';
import Card from '../components/card/Card';
import LabelOverview from '../components/labels/LabelOverview';
import LoadingSpinner from '../components/reusables/LoadingSpinner';
import ConnectionLost from '../components/reusables/ConnectionLost';

export default {
  name: 'board',
  data() {
    return {
      boardId: this.$route.params.boardId,
      removeUserError: null,
      editingTitle: false,
      title: '',
      drag: false,
      isOpen: false,
      numberOfCards: 0
    };
  },
  components: {
    List,
    Topbar,
    AddList,
    AddUserToBoard,
    DeleteBoard,
    LabelOverview,
    draggable,
    ConnectionLost,
    LoadingSpinner,
    Sidebar,
    Card
  },
  computed: {
    ...mapState(['board', 'isLoading', 'listView']),
    ...mapGetters([
      'numberOfAllCards',
      'numberOfCardsCreatedByMe',
      'numberOfArchivedCards',
      'numberOfCardsAssignedToMe'
    ]),
    lists: {
      get() {
        return this.$store.state.board.lists;
      },
      async set(lists) {
        try {
          await this.$store.dispatch('updateListOrder', {
            lists,
            boardId: this.boardId
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  async mounted() {
    try {
      this.$store.dispatch('isLoading', true);
      await this.$store.dispatch('setBoard', { boardId: this.boardId });
      this.title = this.board.title;
      this.$store.dispatch('isLoading', false);
    } catch (error) {
      if (error.response.data.error === "Board doesn't exist") {
        this.$router.push({ name: 'boardOverview' });
      }
      console.log(error.response.data.error);
    }
  },
  methods: {
    changeViewStyle(style) {
      this.$store.dispatch('changeViewStyle', style);
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
        await this.$store.dispatch('updateBoard', {
          title: this.title,
          boardId: this.boardId
        });
        this.editingTitle = false;
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  },
  created() {
    // VIRKER MEN ER IKKE EN GOD LØSNING
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'setBoard') {
    //     let numOfCards = 0;
    //     state.board.lists.forEach(list => {
    //       list.cards.forEach(() => {
    //         numOfCards++;
    //       });
    //     });
    //     this.numberOfCards = numOfCards;
    //   }
    // });
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
:focus {
  outline: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
  border-radius: 100px;
}

::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 100px;
  border-radius: 100px;
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.5);
  /*Some darker color when you click it */
  -webkit-border-radius: 100px;
  border-radius: 100px;
}

/* add vertical min-height & horizontal min-width */
::-webkit-scrollbar-thumb:vertical {
  min-height: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  min-width: 10px;
}
</style>