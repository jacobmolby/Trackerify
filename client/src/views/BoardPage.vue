<template>
  <div class="flex overflow-hidden h-screen">
    <!-- Sidebar -->
    <Sidebar @closeSidebar="isOpen=false" :isOpen="isOpen">
      <h2 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Issues</h2>
      <div class="mt-2 -mx-3">
        <button
          @click="changeViewStyle('board')"
          class="w-full px-3 py-1 flex justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
          :class="viewStyle === 'list' || viewStyle === 'board'?'bg-gray-200':''"
        >
          <span>All</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfAllCards}}</span>
        </button>
        <button
          @click="changeViewStyle('createdByMe')"
          class="w-full px-3 py-1 mt-1 flex justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
          :class="viewStyle === 'createdByMe'?'bg-gray-200':''"
        >
          <span>Created by me</span>
          <span class="text-sm font-semibold text-gray-700">{{cardsCreatedByMe.length}}</span>
        </button>
        <button
          @click="changeViewStyle('archived')"
          class="w-full px-3 py-1 mt-1 flex justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
          :class="viewStyle === 'archived'?'bg-gray-200':''"
        >
          <span>Archived</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfArchivedCards}}</span>
        </button>
        <button
          @click="changeViewStyle('assignedToMe')"
          class="w-full px-3 py-1 mt-1 flex justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
          :class="viewStyle === 'assignedToMe'?'bg-gray-200':''"
        >
          <span>Assigned to me</span>
          <span class="text-sm font-semibold text-gray-700">{{numberOfCardsAssignedToMe}}</span>
        </button>
      </div>
      <h2 class="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide">Labels</h2>
      <div class="mt-2 -mx-3 pb-2 border-b border-gray-400">
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

    <!-- START TOPBAR AREA -->
    <div v-if="!isLoading" class="flex-1 flex flex-col min-w-0 bg-white">
      <div class="flex-shrink-0 border-b border-gray-200">
        <header class>
          <div class="px-6">
            <Topbar @openSidebar="isOpen = true" />
            <div class="py-2 sm:flex items-center justify-between">
              <div class="flex justify-between sm:justify-start">
                <div class="flex items-center">
                  <h1
                    v-if="!editingTitle"
                    class="font-semibold text-2xl text-gray-800"
                    :class="`_${boardId}`"
                  >{{board.title}}</h1>
                  <input
                    v-if="editingTitle"
                    v-model.trim="title"
                    type="text"
                    class="font-semibold text-2xl bg-gray-300 text-gray-800"
                    :class="`_${boardId}`"
                    @change="updateTitle"
                  />
                  <DeleteBoard
                    v-if="this.user._id === this.board.owner"
                    :board="board"
                    class="ml-2"
                  ></DeleteBoard>
                </div>
                <!-- Users in topbar -->
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
                      v-if="canRemoveUser(user._id)"
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
                </div>
                <!-- End Users in topbar -->
              </div>

              <div class="py-1 flex items-center">
                <span class="p-1 hidden bg-gray-200 border rounded sm:inline-flex">
                  <button
                    @click="changeViewStyle('list')"
                    class="leading-tight px-2 py-1 mr-1 rounded hover:bg-white"
                    :class="viewStyle === 'list' ? 'bg-white  shadow': 'transition-bg ease-out transition-500'"
                  >
                    <svg class="h-4 w-4 fill-current text-gray-700" viewBox="0 0 20 20">
                      <path d="M0 3h20v2H0V3zm0 4h20v2H0V7zm0 4h20v2H0v-2zm0 4h20v2H0v-2z" />
                    </svg>
                  </button>
                  <button
                    @click="changeViewStyle('board')"
                    class="leading-tight px-2 py-1 ml-1 rounded hover:bg-white"
                    :class="viewStyle === 'board' ? 'bg-white  shadow': 'transition-bg ease-out transition-500'"
                  >
                    <svg class="h-4 w-4 fill-current text-gray-700" viewBox="0 0 20 20">
                      <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
                    </svg>
                  </button>
                </span>
                <LabelOverview class="w-1/3 sm:w-auto sm:ml-2">Edit Labels</LabelOverview>
                <AddList :addListIsOpen="addListIsOpen" class="w-1/3 sm:w-full ml-1" />
                <AddUserToBoard class="w-1/3 sm:w-auto ml-1" />
              </div>
            </div>
          </div>
          <div class="flex p-1 bg-gray-200 border-t sm:hidden">
            <button
              @click="changeViewStyle('list')"
              class="w-1/2 leading-tight px-2 py-1 mr-1 flex items-center justify-center"
              :class="viewStyle === 'list' ? 'bg-white rounded shadow transition-bg ease-in transition-500': 'transition-bg ease-out transition-500'"
            >
              <svg class="h-4 w-4 fill-current text-gray-700" viewBox="0 0 20 20">
                <path d="M0 3h20v2H0V3zm0 4h20v2H0V7zm0 4h20v2H0v-2zm0 4h20v2H0v-2z" />
              </svg>
              <span class="ml-2">List</span>
            </button>
            <button
              @click="changeViewStyle('board')"
              class="w-1/2 leading-tight px-2 py-1 ml-1 flex items-center justify-center"
              :class="viewStyle === 'board' ? 'bg-white rounded shadow transition-bg ease-in transition-500': 'transition-bg ease-out transition-500'"
            >
              <svg class="h-4 w-4 fill-current text-gray-700" viewBox="0 0 20 20">
                <path d="M12 4H8v12h4V4zm2 0v12h4V4h-4zM6 4H2v12h4V4zM0 2h20v16H0V2z" />
              </svg>
              <span class="ml-2">Board</span>
            </button>
          </div>
        </header>
      </div>
      <!-- START MAIN BOARD AREA -->
      <div v-if="viewStyle === 'board'" class="flex-1 overflow-auto">
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
      <div v-if="viewStyle === 'list'" class="overflow-hidden">
        <ListView :lists="lists" />
      </div>
      <!-- END LIST VIEW -->
      <!-- START createdByMe VIEW -->
      <div v-if="viewStyle === 'createdByMe'" class="overflow-hidden">
        <CreatedByMe :lists="lists" />
      </div>
      <!-- END createdByMe VIEW -->
      <!-- START Archived VIEW -->
      <div v-if="viewStyle === 'archived'" class="overflow-hidden">
        <Archived :lists="lists" />
      </div>
      <!-- END Archived VIEW -->
      <!-- START Archived VIEW -->
      <div v-if="viewStyle === 'assignedToMe'" class="overflow-hidden">
        <AssignedToMe :lists="lists" />
      </div>
      <!-- END Archived VIEW -->
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

// View Styles
import CreatedByMe from '../components/viewStyles/CreatedByMe';
import ListView from '../components/viewStyles/ListView';
import Archived from '../components/viewStyles/Archived';
import AssignedToMe from '../components/viewStyles/AssignedToMe';

import AddList from '../components/list/AddList';
import DeleteBoard from '../components/board/DeleteBoard';
import AddUserToBoard from '../components/board/AddUserToBoard';
import Card from '../components/card/Card';
import AddCard from '../components/card/AddCard';
import LabelOverview from '../components/labels/LabelOverview';
import LoadingSpinner from '../components/reusables/LoadingSpinner';
import ConnectionLost from '../components/reusables/ConnectionLost';

export default {
  name: 'board',
  data() {
    return {
      addListIsOpen: false,
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
    CreatedByMe,
    ListView,
    Archived,
    AssignedToMe
  },
  computed: {
    ...mapState(['board', 'isLoading', 'viewStyle', 'user']),
    ...mapGetters([
      'numberOfAllCards',
      'cardsCreatedByMe',
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
          this.$store.dispatch('notify', {
            message: error.response.data.error,
            type: 'error'
          });
        }
      }
    }
  },
  async mounted() {
    try {
      this.$store.dispatch('isLoading', true);
      await this.$store.dispatch('setBoard', { boardId: this.boardId });
      this.title = this.board.title;
      if (window.innerWidth < 640) {
        this.$store.dispatch('changeViewStyle', 'list');
      } else {
        this.$store.dispatch('changeViewStyle', 'board');
      }
      this.$store.dispatch('isLoading', false);
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (
        errorMessage === "Board doesn't exist" ||
        errorMessage === 'User is not member of the board'
      ) {
        this.$store.dispatch('notify', { message: errorMessage });
        this.$router.push({ name: 'boardOverview' });
      }
    }
  },
  methods: {
    canRemoveUser(userId) {
      if (userId === this.user._id && userId !== this.board.owner) return true;
      if (userId !== this.user._id && this.user._id === this.board.owner)
        return true;
      return false;
    },
    changeViewStyle(style) {
      this.$store.dispatch('changeViewStyle', style);
      this.isOpen = false;
    },
    async removeUser(userId) {
      try {
        this.$store.dispatch('removeUserFromBoard', {
          userId,
          boardId: this.boardId
        });
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
    },
    async updateTitle() {
      if (this.title === this.board.title) {
        this.editingTitle = false;

        return;
      }
      if (this.title === '') {
        this.$store.dispatch('notify', {
          message: "Title can't be empty",
          type: 'error'
        });
        return;
      }
      try {
        await this.$store.dispatch('updateBoard', {
          title: this.title,
          boardId: this.boardId
        });
        this.editingTitle = false;
      } catch (error) {
        this.$store.dispatch('notify', { message: error.response.data.error });
      }
    }
  },
  updated() {
    if (!this.editingTitle) {
      this.title = this.board.title;
    }

    this.$nextTick(() => {
      const input = document.querySelector(`input._${this.boardId}`);
      if (input) input.focus();
    });
  },
  created() {
    const handleTitleKeyPresses = e => {
      if (this.editingTitle === false) {
        return;
      }
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.title = this.board.title;

        this.editingTitle = false;
      }
    };

    const handleClickOnTitle = e => {
      const clickedTitle = e.target.closest(`h1._${this.boardId}`);
      const clickedInput = e.target.closest(`input._${this.boardId}`);
      //If clicked on the title, initiate editingmode

      if (!!clickedTitle && !this.editingTitle) {
        this.editingTitle = true;
        //If editingmode is on, turn it off
      } else if (!clickedInput && this.editingTitle) {
        this.editingTitle = false;
      }
    };

    const handleKeydownEvents = e => {
      const store = this.$store;

      if (e.altKey && e.key === 'l') {
        e.preventDefault();
        if (store.state.addListIsOpen) {
          store.dispatch('addListIsOpen', false);
        } else {
          store.dispatch('addListIsOpen', true);
        }
      } else if (e.altKey && e.key === 'u') {
        e.preventDefault();
        if (store.state.addUserIsOpen) {
          store.dispatch('addUserIsOpen', false);
        } else {
          store.dispatch('addUserIsOpen', true);
        }
      }
    };

    document.addEventListener('keydown', handleKeydownEvents);
    document.addEventListener('keydown', handleTitleKeyPresses);
    document.addEventListener('click', handleClickOnTitle);

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleKeydownEvents);
      document.removeEventListener('keydown', handleTitleKeyPresses);
      document.removeEventListener('click', handleClickOnTitle);
    });
  }
};
</script>

<style>
</style>