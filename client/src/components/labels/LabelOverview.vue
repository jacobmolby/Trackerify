<template>
  <div>
    <button
      class="ml-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      @click="isOpen = !isOpen"
    >
      <svg class="h-3 w-3 mr-2 fill-current" viewBox="0 0 20 20">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
      </svg>
      {{buttonTitle}}
    </button>
    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between">
          <h2 class="text-left text-lg font-semibold">{{buttonTitle}}</h2>
          <button @click="isOpen = !isOpen">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>

        <ul class="flex-col">
          <li
            class="mr-1 mt-2 pb-2 flex items-center justify-between border-b"
            v-for="label in labels"
            :key="label._id"
          >
            <Label :color="label.color">{{label.title}}</Label>

            <button class="hover:text-gray-900">Edit</button>
          </li>
        </ul>
        <div class="mt-6 w-full flex justify-end">
          <create-label></create-label>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Label from '@/components/labels/Label';
import createLabel from '@/components/labels/CreateLabel';
export default {
  components: {
    Label,
    createLabel
  },
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    buttonTitle: String
  },
  computed: {
    labels() {
      return this.$store.state.board.labels;
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