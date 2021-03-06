<template>
  <div>
    <button class="btn btn-gray w-full" @click="isOpen = !isOpen">
      <svg class="h-3 w-3 hidden sm:block fill-current" viewBox="0 0 20 20">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
      </svg>
      <span class="ml-0 sm:ml-1 whitespace-no-wrap">
        <slot></slot>
      </span>
    </button>
    <portal to="popup-container-important" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between">
          <h2 class="text-left text-lg font-semibold">
            <slot></slot>
          </h2>
          <button @click="isOpen = !isOpen">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>

        <ul class="flex-col">
          <li class="mt-2 pb-2 border-b flex" v-for="label in labels" :key="label._id">
            <DeletePopup
              class="mr-3"
              v-if="!usedOnCard "
              :deleteText="'delete'"
              :id="label._id"
              @deleteFunction="deleteLabel"
            >{{label.title}}</DeletePopup>
            <div class="w-full flex items-center justify-between">
              <button
                v-if="usedOnCard && !labelAlreadOnCard(label._id)"
                @click="addLabelToCard(label)"
              >
                <Label :color="label.color">{{label.title}}</Label>
              </button>
              <div v-else class="flex items-center">
                <button
                  v-if="usedOnCard && labelAlreadOnCard(label._id)"
                  @click="removeLabel(label._id)"
                  class="p-2 mr-1 hover:text-red-600 hover:bg-red-500 rounded-full"
                >
                  <svg class="w-2 h-2 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </button>

                <Label :color="label.color">{{label.title}}</Label>
              </div>

              <!-- <button class="hover:text-gray-900">Edit</button> -->
              <edit-label :label="label"></edit-label>
            </div>
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
import EditLabel from '@/components/labels/EditLabel';
import CreateLabel from '@/components/labels/CreateLabel';
import DeletePopup from '@/components/reusables/DeletePopup';
import LabelService from '@/services/LabelService';
import LabelCardService from '@/services/LabelCardService';

export default {
  components: {
    Label,
    CreateLabel,
    EditLabel,
    DeletePopup
  },
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    usedOnCard: { type: Boolean, default: false },
    cardId: String
  },
  computed: {
    ...mapState({
      boardId: state => state.board._id,
      labels: state => state.board.labels
    }),

    card() {
      if (this.usedOnCard) {
        return this.$store.getters.getCardById(this.cardId);
      } else {
        return null;
      }
    }
  },
  methods: {
    labelAlreadOnCard(labelId) {
      return !!this.card.labels.some(label => label._id === labelId);
    },
    async deleteLabel(labelId) {
      try {
        await this.$store.dispatch('removeLabelFromBoard', {
          boardId: this.boardId,
          labelId
        });
      } catch (error) {
this.$store.dispatch('notify', { message: error.response.data.error,type: 'error' });      }
    },
    async removeLabel(labelId) {
      try {
        await this.$store.dispatch('removeLabelFromCard', {
          cardId: this.cardId,
          labelId
        });
      } catch (error) {
       this.$store.dispatch('notify', { message: error.response.data.error,type: 'error' });
      }
    },
    async addLabelToCard(label) {
      try {
        await this.$store.dispatch('addLabelToCard', {
          cardId: this.cardId,
          newLabel: label
        });
      } catch (error) {
this.$store.dispatch('notify', { message: error.response.data.error,type: 'error' });      }
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