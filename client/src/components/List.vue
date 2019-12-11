<template>
  <div
    class="overflow-hidden mx-2 my-2 px-3 py-2 w-72 flex-shrink-0 flex flex-col bg-gray-100 rounded shadow-md border-t-4"
    :style="borderColor"
  >
    <!-- List Title -->
    <div class="flex justify-between items-center">
      <h2 class="py-4 font-semibold text-gray-700 text-xl">{{title}}</h2>
      <button
        @click="deleteList"
        class="text-xs px-2 py-1 bg-red-300 hover:bg-red-400 rounded shadow"
      >Delete</button>
    </div>
    <!-- Scrollable area -->
    <!-- List CONTENT -->

    <!-- <ul> -->
    <draggable group="card" tag="ul" v-model="cards" @start="drag=true" @end="drag=false">
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
import Card from '@/components/Card';
import AddCard from '@/components/AddCard';
export default {
  components: {
    draggable,
    Card,
    AddCard
  },
  props: ['title', 'listId', 'listColor'],
  methods: {
    async deleteList() {
      try {
        const response = (await ListService.delete(this.listId)).data;

        this.$store.dispatch('removeList', response);
      } catch (error) {
        console.log(error);
      }
    },
    async updateListOrder(payload) {
      try {
        const response = (await ListService.put(payload)).data;
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

          this.updateListOrder(payload);
          this.$store.dispatch('updateListOrder', payload);
          this.$socket.emit('updateListOrder', payload);
          this.$socket.emit('CUSTOM', payload);
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  sockets: {
    ListOrderUpdated(list) {
      if (list.listId === this.listId) {
        this.$store.dispatch('updateListOrder', list);
      }
    }
  }
};
</script>

<style>
</style>