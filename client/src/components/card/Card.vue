<template>
  <div>
    <!-- START CARD -->
    <div @click="isOpen = !isOpen">
      <div>
        <Label
          class="mr-1"
          v-for="label in card.labels"
          :key="label._id"
          :color="label.color"
        >{{label.title}}</Label>
      </div>
      <div class="flex justify-between items-baseline">
        <span class="text-sm text-gray-700 leading-snug">
          <button class="text-left">{{card.title}}</button>
        </span>
        <span v-if="card.archived" class="font-bold text-red-600">(ARCHIVED)</span>
      </div>
      <div class="mt-2 flex justify-between items-baseline">
        <div class="flex">
          <div class="flex items-center">
            <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
              <path
                d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"
              />
            </svg>
            <span v-if="card.comments" class="text-xs pl-1">{{card.comments.length}}</span>
          </div>
          <div class="pl-2 flex items-center">
            <svg class="h-4 w-4 fill-current text-gray-500" viewBox="0 0 20 20">
              <path
                d="M15 3H7a7 7 0 1 0 0 14h8v-2H7A5 5 0 0 1 7 5h8a3 3 0 0 1 0 6H7a1 1 0 0 1 0-2h8V7H7a3 3 0 1 0 0 6h8a5 5 0 0 0 0-10z"
              />
            </svg>
            <span v-if="card.attachments" class="text-xs pl-1">{{card.attachments.length}}</span>
          </div>
        </div>
        <div class="flex flex-shrink-0">
          <div v-for="user in card.assignedUsers" :key="user._id" class="-ml-2 h-6 w-6">
            <img
              class="rounded-full border-white border-2 object-cover"
              :src="user.profileImage"
              alt="Profile Image"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- END CARD -->

    <!-- CARD POPUP -->

    <portal to="popup-container" v-if="isOpen">
      <button @click="isOpen = false" tabindex="-1" class="popup-bg"></button>
      <div class="popup">
        <div class="flex items-center justify-between">
          <div class="flex items-baseline w-full">
            <span v-if="card.archived" class="mr-2 font-bold text-red-600">(ARCHIVED)</span>
            <h2 v-if="!isEditing" class="text-lg font-bold">{{title}}</h2>
            <input
              v-else-if="isEditing"
              class="px-1 text-lg w-full font-bold bg-gray-100 border rounded focus:outline-none"
              type="text"
              v-model="title"
            />
            <DeletePopup class="ml-4" @deleteFunction="deleteCard">{{title}}</DeletePopup>
          </div>
          <button class="ml-4" @click="isOpen = false">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div class="py-2 flex items-center justify-between text-sm border-b border-gray-300">
          <textarea
            v-model="description"
            :disabled="!this.isEditing"
            :class="[(isEditing ? 'bg-gray-100 border' : ''),(description == 'No description' ? 'italic' : '')]"
            class="w-10/12 h-16 py-1 bg-transparent resize-none outline-none rounded"
          ></textarea>
          <button
            v-if="!this.isEditing"
            class="ml-2 px-1 py-2 w-2/12 bg-green-400 rounded text-white focus:outline-none shadow opacity-75"
            @click="isEditing = !isEditing;"
          >Edit</button>
          <button
            v-else
            class="ml-2 px-1 py-2 w-2/12 bg-green-800 rounded text-white focus:outline-none shadow"
            @click="updateCard"
          >Save</button>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-300">
          <div>
            <Label
              class="mr-1"
              v-for="label in card.labels"
              :key="label._id"
              :color="label.color"
            >{{label.title}}</Label>
          </div>
          <LabelOverview :cardId="cardId" :usedOnCard="true">Edit Labels</LabelOverview>
        </div>
        <div class="py-2 flex items-center justify-between border-b border-gray-300">
          <h3 class="text-md font-medium">Assigned to:</h3>
          <div class="flex justify-end">
            <AddUserToCard :assignedUsers="card.assignedUsers" :cardId="card._id" class="mr-3 flex"></AddUserToCard>
            <div class="flex flex-row-reverse">
              <div
                v-for="user in card.assignedUsers"
                :key="user._id"
                class="relative -ml-2 h-8 w-8"
              >
                <img
                  class="rounded-full border-white border-2"
                  :src="user.profileImage"
                  alt="Profile Image"
                />
                <div
                  class="absolute inset-0 flex opacity-0 bg-red-400 rounded-full hover:opacity-75"
                >
                  <button
                    class="flex justify-center w-full items-center focus:outline-none"
                    @click="removeUser(user._id)"
                  >
                    <svg
                      class="h-3 w-3 fill-current text-gray-800 opacity-100"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-1 max-h-72 overflow-y-auto">
          <comment
            v-for="comment in card.comments"
            :key="comment._id"
            :listId="card.list"
            :comment="comment"
          ></comment>
        </div>
        <add-comment :cardId="card._id" :listId="card.list"></add-comment>
        <div class="py-2 border-t-2 border-gray-200">
          Attachments:
          <span class="font-bold text-red-500">NOT IMPLEMENTED YET.</span>
        </div>
        <button v-if="!card.archived" @click="archiveCard" class="primary-btn">
          <span>
            <svg class="h-3 w-3 fill-current text-white" viewBox="0 0 20 20">
              <path
                d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"
              />
            </svg>
          </span>
          <span class="ml-2">Archive</span>
        </button>
        <button v-if="card.archived" @click="restoreCard" class="primary-btn">
          <span>
            <svg class="h-3 w-3 fill-current text-white" viewBox="0 0 20 20">
              <path
                d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2H0V2zm1 3h18v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5zm6 2v2h6V7H7z"
              />
            </svg>
          </span>
          <span class="ml-2">Restore</span>
        </button>
      </div>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Comment from '../comment/Comment';
import AddComment from '../comment/AddComment';
import AddUserToCard from '../card/AddUserToCard';
import Label from '../labels/Label';
import LabelOverview from '../labels/LabelOverview';
import DeletePopup from '../reusables/DeletePopup';

import CardService from '@/services/CardService';
import UserCardService from '@/services/UserCardService';

export default {
  name: 'Card',
  components: {
    Comment,
    AddComment,
    AddUserToCard,
    Label,
    LabelOverview,
    DeletePopup
  },
  props: { cardId: String },
  data() {
    return {
      isOpen: false,
      description: '',
      title: '',
      isEditing: false
    };
  },
  computed: {
    card() {
      return this.$store.getters.getCardById(this.cardId);
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
  },
  methods: {
    async archiveCard() {
      const cardId = this.card._id;
      try {
        await this.$store.dispatch('archiveCard', { cardId });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async restoreCard() {
      const cardId = this.card._id;
      try {
        await this.$store.dispatch('restoreCard', { cardId });
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async deleteCard() {
      const cardId = this.card._id;

      try {
        await this.$store.dispatch('removeCard', { cardId });
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
        return (this.isEditing = false);
      }

      try {
        await this.$store.dispatch('updateCard', {
          cardId: this.card._id,
          title: this.title,
          description: this.description
        });
        this.isEditing = false;
      } catch (error) {
        console.log(error);
      }
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch('removeUserFromCard', {
          userId,
          cardId: this.card._id,
          listId: this.card.list,
          boardId: this.$store.state.board._id
        });
      } catch (error) {
        console.log('error occured');

        console.log(error.response.data.error);
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