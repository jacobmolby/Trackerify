<template>
  <div
    class="ml-3 lg:first:ml-0 flex-shrink-0 overflow-hidden flex flex-col py-3 w-72 bg-gray-100 rounded border-t-2 border-b-2"
    :style="borderColor"
  >
    <!-- List Title -->
    <div class="px-3 pb-3 flex-shrink-0 flex justify-between items-center">
      <h2
        v-if="!editingTitle"
        class="w-full text-gray-700 text-sm font-medium"
        :class="`_${listId}`"
      >{{listTitle}}</h2>
      <input
        v-show="editingTitle"
        @change="updateTitle"
        v-model="title"
        type="text"
        class="w-full text-gray-700 text-sm font-medium bg-gray-300"
        :class="`_${listId}`"
      />
      <delete-popup class="ml-2" @deleteFunction="deleteList">{{listTitle}}</delete-popup>
    </div>
    <div class="flex-1 min-h-0">
      <draggable
        ghost-class="bg-blue-200"
        group="card"
        tag="ul"
        v-model="cards"
        class="px-3 h-full overflow-y-auto"
        @start="drag=true"
        @end="drag=false"
      >
        <li v-for="card in cards" :key="card._id" class="bg-white rounded">
          <Card v-if="!card.archived" class="mb-2 p-3 rounded shadow" :cardId="card._id" />
        </li>
      </draggable>
    </div>
    <!-- ADD CARD BUTTON -->
    <add-card class="mt-1" :listId="listId"></add-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import ListService from '@/services/ListService';
import CardOrderService from '@/services/CardOrderService';
import { fireAction } from '@/services/ActionService';
import Card from '@/components/card/Card';
import AddCard from '@/components/card/AddCard';
import DeletePopup from '@/components/reusables/DeletePopup';
export default {
  data: () => ({ editingTitle: false, title: null }),
  components: {
    draggable,
    Card,
    AddCard,
    DeletePopup
  },
  props: ['listTitle', 'listId', 'listColor'],
  methods: {
    async updateTitle() {
      console.log('update');

      if (this.title === '') return;
      try {
        await this.$store.dispatch('updateListTitle', {
          listId: this.listId,
          listTitle: this.title
        });
        this.editingTitle = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteList() {
      try {
        await this.$store.dispatch('removeList', { listId: this.listId });
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    boardId() {
      return this.$store.state.board._id;
    },
    borderColor() {
      const validColor = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
      if (validColor.test(this.listColor)) {
        return {
          'border-color': this.listColor
        };
      } else {
        return {
          'border-color': '#000'
        };
      }
    },
    cards: {
      get() {
        return this.$store.getters.getCardsByListId(this.listId);
      },
      async set(cards) {
        try {
          await this.$store.dispatch('updateCardOrder', {
            cards,
            listId: this.listId
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  updated() {
    if (!this.editingTitle) {
      this.title = this.listTitle;
    }
    this.$nextTick(() => {
      const input = document.querySelector(`input._${this.listId}`);
      if (input) input.focus();
    });
  },
  created() {
    this.title = this.listTitle;

    const handleTitleKeyPresses = e => {
      if (this.editingTitle === false) {
        return;
      }
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.editingTitle = false;
      }
    };

    const handleClick = e => {
      const clickedTitle = e.target.closest(`h2._${this.listId}`);
      const clickedInput = e.target.closest(`input._${this.listId}`);
      //If clicked on the title, initiate editingmode

      if (!!clickedTitle && !this.editingTitle) {
        this.editingTitle = true;

        //If editingmode is on, turn it off
      } else if (!clickedInput && this.editingTitle) {
        this.editingTitle = false;
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleTitleKeyPresses);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleTitleKeyPresses);
      document.removeEventListener('click', handleClick);
    });
  }
};
</script>

<style>
</style>