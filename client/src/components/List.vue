<template>
  <div>
    <!-- List Title -->
    <div class="flex justify-between items-center">
      <h2 class="py-4 font-semibold text-gray-700 text-xl">{{title}}</h2>
      <button @click="deleteList" class="text-xs px-2 py-1 bg-red-400 rounded shadow">Delete List</button>
    </div>
    <!-- Scrollable area -->
    <!-- List CONTENT -->
    <ul>
      <li v-for="card in cards" :key="card._id" class="my-2 px-3 py-3 bg-white shadow rounded">
        <card :card="card"></card>
      </li>
    </ul>

    <!-- ADD LIST BUTTON -->
    <add-card :listId="listId"></add-card>
  </div>
</template>

<script>
import ListService from '@/services/ListService';
import Card from '@/components/Card';
import AddCard from '@/components/AddCard';
export default {
  components: {
    Card,
    AddCard
  },
  props: ['cards', 'title', 'listId'],
  methods: {
    async deleteList() {
      try {
        const response = (await ListService.delete(this.listId)).data;

        this.$store.dispatch('removeList', response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>