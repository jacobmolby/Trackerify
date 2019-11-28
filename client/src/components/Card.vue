<template v-slot:default="card">
  <div class="flex flex-col flex-shrink-0 justify-between">
    <div>
      <div class="text-xs text-gray-700 px-2 inline-block bg-teal-400 rounded-lg">Low Priority</div>
    </div>
    <span class="text-sm leading-snug text-gray-600">
      <button @click="isOpen = !isOpen" class="text-left">{{card.title}}</button>
    </span>
    <div class="pt-4 flex justify-between items-end">
      <div class="w-1/2 flex justify-start items-center">
        <div class="flex items-center">
          <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
            <path
              d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"
            />
          </svg>
          <span class="text-xs pl-1">{{card.comments.length}}</span>
        </div>
        <div class="pl-2 flex items-center">
          <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
            <path
              d="M15 3H7a7 7 0 1 0 0 14h8v-2H7A5 5 0 0 1 7 5h8a3 3 0 0 1 0 6H7a1 1 0 0 1 0-2h8V7H7a3 3 0 1 0 0 6h8a5 5 0 0 0 0-10z"
            />
          </svg>
          <span class="text-xs pl-1">{{card.attachments.length}}</span>
        </div>
      </div>
      <div class="w-1/2 flex justify-end">
        <AddUserToCard :cardId="card._id" class="mr-3"></AddUserToCard>
        <div class="flex flex-row-reverse">
          <img
            v-for="user in card.assignedUsers"
            :key="user._id"
            class="-ml-2 h-8 w-8 rounded-full border-white border-2"
            :src="user.profileImage"
            alt="Profile Image"
          />
        </div>
      </div>
    </div>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
    ></button>
    <div v-if="isOpen" class="popup bg-white shadow-xl rounded p-6 text-gray-700">
      <div class="flex items-center">
        <h2 v-if="!isEditing" class="text-lg font-bold">{{title}}</h2>
        <input
          v-else-if="isEditing"
          class="px-1 text-lg font-bold bg-gray-200 border rounded focus:outline-none"
          type="text"
          v-model="title"
        />
      </div>
      <div class="py-2 flex items-center justify-between text-sm border-b-2 border-gray-200">
        <textarea
          v-model="description"
          :disabled="!this.isEditing"
          :class="[(isEditing ? 'bg-gray-200 border' : ''),(description == 'No description' ? 'italic' : '')]"
          class="w-10/12 h-16 py-1 bg-transparent resize-none outline-none rounded"
        ></textarea>
        <button
          v-if="!this.isEditing"
          class="ml-2 px-1 py-2 w-2/12 bg-green-400 rounded text-white focus:outline-none shadow opacity-75"
          @click="isEditing = !isEditing"
        >Edit</button>
        <button
          v-else
          class="ml-2 px-1 py-2 w-2/12 bg-green-800 rounded text-white focus:outline-none shadow"
          @click="updateCard"
        >Save</button>
      </div>

      <div class="py-2 flex items-center justify-between border-b-2 border-gray-200">
        <h3 class="text-md font-medium">Assigned to:</h3>
        <div class="flex justify-end">
          <AddUserToCard :cardId="card._id" class="mr-3"></AddUserToCard>
          <div class="flex flex-row-reverse">
            <img
              v-for="user in card.assignedUsers"
              :key="user._id"
              class="-ml-2 h-8 w-8 rounded-full border-white border-2"
              :src="user.profileImage"
              alt="Profile Image"
            />
          </div>
        </div>
      </div>
      <div class="my-1 max-h-72 overflow-y-auto">
        <comment v-for="comment in card.comments" :key="comment._id" :comment="comment"></comment>
      </div>
      <add-comment :cardId="card._id" :listId="card.list"></add-comment>
      <div class="py-2 border-t-2 border-gray-200">Attachments:</div>
      <div class="flex items-center justify-between">
        <button
          @click="deleteCard"
          class="px-2 py-1 font-semibold text-white bg-red-500 rounded shadow hover:bg-red-800"
        >Delete Card</button>
        <button
          @click="isOpen = false"
          class="px-2 py-1 font-semibold text-white bg-indigo-400 rounded shadow hover:bg-indigo-800"
        >Close Card</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CardService from '@/services/CardService';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';
import AddUserToCard from '@/components/AddUserToCard';
export default {
  name: 'Card',
  components: {
    Comment,
    AddComment,
    AddUserToCard
  },
  props: { card: Object },
  data() {
    return {
      isOpen: false,
      description: null,
      title: null,
      isEditing: false
    };
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
  },
  methods: {
    async deleteCard() {
      const cardId = this.card._id;

      try {
        const deletedCard = (await CardService.delete(cardId)).data;

        this.$store.dispatch('removeCard', deletedCard);
        this.isOpen = false;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCard() {
      if (
        this.description == this.card.description &&
        this.title == this.card.title
      ) {
        this.isEditing = false;

        return;
      }
      const payload = {
        cardId: this.card._id,
        title: this.title,
        description: this.description
      };

      try {
        const card = (await CardService.updateCard(payload)).data;
        this.$store.dispatch('updateCard', card);
        this.isEditing = false;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.description = this.card.description
      ? this.card.description
      : 'No description';
    this.title = this.card.title;
  }
};
</script>

<style>
</style>