<template>
  <div>
    <button @click="isOpen = !isOpen" class="primary-btn">
      <svg class="h-4 w-4  hidden sm:block  fill-current" viewBox="0 0 20 20">
        <path
          d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <span class="ml-0 sm:ml-1  whitespace-no-wrap">Add List</span>
    </button>

    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <h2 class="text-left text-lg font-semibold">Add List</h2>

        <form class="pt-3 flex flex-col" @submit.prevent="addList">
          <input
            v-model="list.title"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="List Title"
          />
          <button
            :style="{'background-color':list.color.hex}"
            class="mt-2 p-2 rounded border border-gray-400 font-extrabold"
            @click="pickingColor = !pickingColor"
          >{{this.list.color.hex}}</button>
          <chrome v-if="!pickingColor" class="mx-auto my-2 shadow-none" v-model="list.color"></chrome>
          <div class="text-red-500 font-semibold">{{this.error}}</div>
          <button
            type="submit"
            class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
          >Add New List</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import ListService from '@/services/ListService';
import { Chrome } from 'vue-color';
export default {
  name: 'AddList',
  components: {
    Chrome
  },
  data() {
    return {
      isOpen: false,
      pickingColor: false,
      list: {
        title: null,
        color: {
          hex: '#00FFFF'
        }
      },
      error: null
    };
  },
  methods: {
    onChange(val) {
      this.list.color = val;
    },
    async addList() {
      this.error = null;
      if (!this.list.title) {
        this.error = 'Please choose a title.';
      }
      if (this.list.title && this.list.color) {
        const payload = {
          title: this.list.title,
          color: this.list.color.hex,
          boardId: this.$store.state.board._id
        };
        try {
          const response = (await ListService.post(payload)).data;

          this.$store.dispatch('addList', response);

          this.$socket.emit('addList', response);
          this.list.title = null;
          this.pickingColor = false;
          this.isOpen = false;
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  },
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  }
};
</script>

<style>
</style>