<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="ml-6 inline-flex items-baseline text-gray-600 hover:text-gray-900"
    >
      <span>
        <svg class="h-4 w-4 mr-2 fill-current" viewBox="0 0 20 20">
          <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
        </svg>
      </span>
      Add List
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
          console.log('Adding list');

          this.$socket.emit('addList', response);
          this.list.title = null;
          this.pickingColor = false;
          this.isOpen = false;
        } catch (error) {
          console.log(error);
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