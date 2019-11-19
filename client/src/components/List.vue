<template>
  <div>
    <!-- List Title -->
    <div class="flex justify-between items-center">
      <h2 class="py-4 font-semibold text-gray-700 text-xl">{{title}}</h2>
      <button class="text-xs px-2 py-1 bg-red-400 rounded shadow">Delete List</button>
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
import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';
export default {
  components: {
    Card,
    AddCard
  },
  props: ['cards', 'title', 'listId']
};
</script>

<style>
</style>