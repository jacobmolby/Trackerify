<template>
  <main class="flex flex-col items-center h-full p-3 overflow-auto">
    <div v-for="list in lists" :key="list._id" class="mt-2 w-full bg-gray-200 rounded">
      <div
        class="px-3 py-3 flex-shrink-0 justify-between items-center border-t-2 rounded-t"
        :style="{'border-color': list.color}"
      >
        <h2 class="pb-2 w-full text-gray-700 text-sm font-medium">{{list.title}}</h2>
        <ol>
          <li v-for="card in $store.getters.getCardsByListId(list._id)" :key="card._id">
            <Card
              class="mb-2 p-3 rounded shadow bg-white"
              v-if="isAssigned(card) && !card.archived"
              :cardId="card._id"
            ></Card>
          </li>
        </ol>
        <AddCard :listId="list._id" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Card from '../card/Card';
import AddCard from '../card/AddCard';
export default {
  components: {
    Card,
    AddCard
  },
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    isAssigned(card) {
      let assigned = false;
      card.assignedUsers.forEach(assignedUser => {
        if (assignedUser._id === this.user._id) {
          assigned = true;
        }
      });
      return assigned;
    }
  }
};
</script>

<style>
</style>