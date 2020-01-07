<template>
  <div>
    <button
      class="ml-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      @click="isOpen = !isOpen"
    >
      <svg class="h-3 w-3 mr-2 fill-current" viewBox="0 0 20 20">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
      </svg>
      <slot></slot>
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
            <delete-popup
              v-if="!usedOnCard || labelAlreadOnCard(label._id)"
              :deleteText="usedOnCard ? 'remove':'delete'"
              :id="label._id"
              @deleteFunction="deleteLabel"
            >{{label.title}}</delete-popup>
            <div class="ml-3 w-full flex items-center justify-between">
              <button
                v-if="usedOnCard && !labelAlreadOnCard(label._id)"
                @click="addLabelToCard(label)"
              >
                <Label :color="label.color">{{label.title}}</Label>
              </button>
              <div v-else class="flex items-center">
                <svg v-if="usedOnCard" class="w-2 h-2 mr-2" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>

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
import { fireAction } from '@/services/ActionService';

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
      const inCard = this.card.labels.some(label => label._id === labelId);
      if (inCard) {
        return true;
      } else {
        return false;
      }
    },
    async deleteLabel(labelId) {
      if (!this.usedOnCard) {
        try {
          await LabelService.delete(this.boardId, labelId);
          fireAction('removeLabelFromBoard', { labelId });
        } catch (error) {
          console.log(error.response.data.error);
        }
      } else {
        try {
          await LabelCardService.delete(this.cardId, labelId);
          fireAction('removeLabelFromCard', {
            cardId: this.cardId,
            labelId
          });
        } catch (error) {
          console.log(error);

          // console.log(error.response.data.error);
        }
      }
    },
    async addLabelToCard(label) {
      try {
        await LabelCardService.post(this.cardId, label._id);
        fireAction('addLabelToCard', {
          cardId: this.cardId,
          newLabel: label
        });
      } catch (error) {
        console.log(error);
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