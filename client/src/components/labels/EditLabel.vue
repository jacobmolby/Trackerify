<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="px-2 bg-blue-400 font-semibold text-sm text-white rounded hover:bg-blue-600"
    >Edit</button>
    <portal to="popup-container-more-important" v-if="isOpen">
      <div class="popup">
        <div class="flex items-center justify-between">
          <h2 class="text-left text-lg font-semibold">Edit Label</h2>
          <button @click="isOpen = !isOpen">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <form class="pt-3 flex flex-col" @submit.prevent="updateLabel">
          <input
            v-model="componentLabel.title"
            class="p-2 rounded border border-gray-400"
            type="text"
            placeholder="Name of Label"
          />
          <button
            :style="{'background-color':componentLabel.color.hex}"
            class="mt-2 p-2 rounded border border-gray-400 font-extrabold text-white text-shadow"
            @click="pickingColor = !pickingColor"
          >{{this.componentLabel.color.hex}}</button>
          <chrome
            v-if="!pickingColor"
            class="mx-auto my-2 shadow-none"
            v-model="componentLabel.color"
          ></chrome>
          <div class="text-red-500 font-semibold">{{this.error}}</div>
          <button type="submit" class="mt-2 btn btn-gray">Save Label</button>
        </form>
      </div>
    </portal>
  </div>
</template>

<script>
import LabelService from '@/services/LabelService';
import { Chrome } from 'vue-color';

export default {
  components: {
    Chrome
  },
  data() {
    return {
      isOpen: false,
      pickingColor: false,
      componentLabel: {
        title: this.label.title,
        color: {
          hex: this.label.color || '#000000'
        }
      },
      error: null
    };
  },
  props: { label: Object },
  methods: {
    onChange(val) {
      this.componentLabel.color = val;
    },
    async updateLabel() {
      this.error = null;
      if (!this.componentLabel.title) {
        this.error = 'Please choose a name.';
      }
      if (
        (this.componentLabel.title !== this.label.title ||
          this.componentLabel.color.hex !== this.label.color) &&
        this.label._id
      ) {
        try {
          await this.$store.dispatch('updateLabel', {
            title: this.componentLabel.title,
            color: this.componentLabel.color.hex,
            labelId: this.label._id
          });
          this.pickingColor = false;
          this.isOpen = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.error = 'No values changed.';
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