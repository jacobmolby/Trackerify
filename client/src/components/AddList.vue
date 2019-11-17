<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="ml-6 inline-flex items-center text-gray-600 hover:text-gray-900"
    >
      <span>
        <svg class="h-4 w-4 fill-current" viewBox="0 0 30 30">
          <path d="M20.64 15.64H15.64V20.64H14V15.64H9V14H14V9H15.64V14H20.64V15.64Z" />
        </svg>
      </span>
      Add List
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
    ></button>
    <div v-if="isOpen" class="popup bg-white shadow-xl rounded p-6 text-gray-700">
      <h2 class="text-left text-lg font-semibold">Add List</h2>
      <form class="pt-3 flex flex-col" @submit.prevent="addList">
        <input
          v-model="list.title"
          class="p-2 rounded border border-gray-400"
          type="text"
          placeholder="List Title"
        />
        <input
          v-model="list.color"
          class="mt-2 p-2 rounded border border-gray-400"
          type="text"
          placeholder="Accent Color"
        />
        <button
          type="submit"
          class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500"
        >Add New List</button>
      </form>
    </div>
  </div>
</template>

<script>
import ListService from '@/services/ListService';
export default {
  name: 'AddList',
  data() {
    return {
      isOpen: false,
      list: {
        title: null,
        color: null
      },
      error: null
    };
  },
  methods: {
    async addList() {
      //TODO MANGLER SERVERSIDE
      //console.log(this.$store.state.board._id);
      if (!this.list.title || !this.list.color) {
        console.log('error');

        this.error = 'Please fill out the fields.';
      }
      if (this.list.title && this.list.color) {
        console.log('succes');

        const payload = {
          title: this.list.title,
          color: this.list.color,
          boardId: this.$store.state.board._id
        };
        try {
          const response = (await ListService.post(payload)).data;
          console.log(response);

          this.$store.dispatch('addList', response);
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