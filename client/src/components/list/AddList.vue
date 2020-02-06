<template>
  <div>
    <button @click="$store.dispatch('addListIsOpen', true)" class="btn btn-gray w-full">
      <svg class="h-4 w-4 hidden sm:block fill-current" viewBox="0 0 20 20">
        <path
          d="M15 9h-3v2h3v3h2v-3h3V9h-3V6h-2v3zM0 3h10v2H0V3zm0 8h10v2H0v-2zm0-4h10v2H0V7zm0 8h10v2H0v-2z"
        />
      </svg>
      <span class="ml-0 sm:ml-1 whitespace-no-wrap">Add List</span>
    </button>

    <portal to="popup-container" v-if="addListIsOpen">
      <button @click="$store.dispatch('addListIsOpen', false)" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex justify-between items-center">
          <h2 class="text-left text-lg font-semibold">Add List</h2>
          <button class="ml-4" @click="$store.dispatch('addListIsOpen', false)">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
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
          <!-- class="mt-2 py-2 text-white bg-indigo-400 rounded shadow hover:bg-indigo-500" -->
          <button class="mt-2 btn btn-gray" type="submit">Add New List</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import ListService from '@/services/ListService';
import { Chrome } from 'vue-color';
import { mapState } from 'vuex';
export default {
  name: 'AddList',
  components: {
    Chrome
  },
  data() {
    return {
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
  computed: {
    ...mapState(['addListIsOpen'])
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
        try {
          this.$store.dispatch('addList', {
            title: this.list.title,
            color: this.list.color.hex,
            boardId: this.$store.state.board._id
          });

          this.list.title = null;
          this.pickingColor = false;
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  },
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.$store.dispatch('addListIsOpen', false);
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