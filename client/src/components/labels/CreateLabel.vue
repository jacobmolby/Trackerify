<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="px-2 bg-green-400 font-semibold text-sm text-white rounded hover:bg-green-600"
    >Create New Label</button>
    <portal to="popup-container-more-important" v-if="isOpen">
      <div class="popup">
        <div class="flex items-center justify-between">
          <h2 class="text-left text-lg font-semibold">Create New Label</h2>
          <button @click="isOpen = !isOpen">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <form class="pt-3 flex flex-col" @submit.prevent="addLabel">
          <input
            v-model="label.title"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="Name of Label"
          />
          <button
            :style="{'background-color':label.color.hex}"
            class="mt-2 p-2 rounded border border-gray-400 font-extrabold text-white text-shadow"
            @click="pickingColor = !pickingColor"
          >{{this.label.color.hex}}</button>
          <chrome v-if="!pickingColor" class="mx-auto my-2 shadow-none" v-model="label.color"></chrome>
          <div class="text-red-500 font-semibold">{{this.error}}</div>
          <button type="submit" class="mt-2 btn btn-gray">Create New Label</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
  components: {
    Chrome
  },
  data() {
    return {
      isOpen: false,
      pickingColor: false,
      label: {
        title: null,
        color: {
          hex: '#4caf50'
        }
      },
      error: null
    };
  },
  methods: {
    onChange(val) {
      this.label.color = val;
    },
    async addLabel() {
      this.error = null;
      if (!this.label.title) {
        this.error = 'Please choose a name.';
      }
      if (this.label.title && this.label.color) {
        try {
          await this.$store.dispatch('addLabelToBoard', {
            title: this.label.title,
            color: this.label.color.hex,
            boardId: this.$store.state.board._id
          });
          this.label.title = null;
          this.pickingColor = false;
          this.isOpen = false;
        } catch (error) {
          this.error = error.response.data.error;
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