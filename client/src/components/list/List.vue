<template>
  <div
    class="overflow-hidden mx-2 my-2 px-3 py-2 w-72 flex-shrink-0 flex flex-col bg-gray-100 rounded shadow-md border-t-4"
    :style="borderColor"
  >
    <!-- List Title -->
    <div class="flex justify-between items-center">
      <!-- <h2 class="py-4 font-semibold text-gray-700 text-xl">{{title}}</h2> -->
      <h2
        v-if="!editingTitle"
        class="w-full font-semibold text-gray-700 text-xl"
        :class="`_${listId}`"
      >{{listTitle}}</h2>
      <input
        v-show="editingTitle"
        @change="updateTitle"
        v-model="title"
        type="text"
        class="font-semibold text-xl bg-gray-300 text-gray-700 focus:outline-none"
        :class="`_${listId}`"
      />
      <delete-popup @deleteFunction="deleteList">{{title}}</delete-popup>
    </div>
    <!-- Scrollable area -->
    <!-- List CONTENT -->

    <!-- <ul> -->
    <draggable
      animation="50"
      ghost-class="bg-blue-200"
      group="card"
      tag="ul"
      v-model="cards"
      @start="drag=true"
      @end="drag=false"
    >
      <li v-for="card in cards" :key="card._id" class="my-2 px-3 py-3 bg-white shadow rounded">
        <!-- {{card.title}} -->
        <card :cardId="card._id"></card>
      </li>
    </draggable>
    <!-- </ul> -->

    <!-- ADD LIST BUTTON -->
    <add-card :listId="listId"></add-card>
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
  mounted() {
    // this.title = this.listTitle;
  },
  methods: {
    async updateTitle() {
      if (this.title === '') return;
      const payload = {
        listId: this.listId,
        listTitle: this.title
      };

      try {
        await ListService.put(payload);
        fireAction('updateListTitle', payload);
        this.editingTitle = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteList() {
      try {
        const response = (await ListService.delete(this.listId)).data;

        this.$store.dispatch('removeList', response);
        this.$socket.emit('removeList', response);
      } catch (error) {
        console.log(error);
      }
    },
    async updateCardOrder(payload) {
      try {
        const response = (await CardOrderService.put(payload)).data;
      } catch (error) {
        console.log(error.response.data.error);
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
      set(cards) {
        try {
          const payload = {
            cards,
            listId: this.listId,
            boardId: this.boardId
          };

          this.updateCardOrder(payload);
          this.$store.dispatch('updateCardOrder', payload);
          // this.$socket.emit('updateCardOrder', payload);
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