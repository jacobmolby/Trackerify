<template>
  <form class="flex flex-col justify-between items-start" @submit.prevent="changeEmail">
    <label class="py-2" for="oldEmail">Old Email</label>
    <input v-model.trim="oldEmail" class="form-input w-full bg-gray-200" type="text" />
    <label class="py-2" for="oldEmail">New Email</label>
    <input v-model.trim="newEmail" class="form-input w-full bg-gray-200" type="text" />
    <label class="py-2" for="oldEmail">New Email Again</label>
    <input v-model.trim="newEmailAgain" class="form-input w-full bg-gray-200" type="text" />
    <label class="py-2" for="password">Password</label>
    <input v-model.trim="password" class="form-input w-full bg-gray-200" type="password" />
    <div class="mt-4 flex w-full justify-between">
      <span class="text-red-500 mt-3 text-sm italic">{{error}}</span>
      <button type="submit" class="btn btn-purple">Change</button>
    </div>
  </form>
</template>

<script>
import validEmail from '@/utilities/validEmail';

export default {
  data: () => ({
    error: '',
    oldEmail: '',
    newEmail: '',
    newEmailAgain: '',
    password: ''
  }),
  methods: {
    async changeEmail() {
      const oldEmail = this.oldEmail.toLowerCase();
      const newEmail = this.newEmail.toLowerCase();
      const newEmailAgain = this.newEmailAgain.toLowerCase();
      this.error = '';
      if (newEmail.toLowerCase() !== newEmailAgain.toLowerCase()) {
        return (this.error = "Emails can't be different");
      }
      if (
        newEmail === '' ||
        newEmailAgain === '' ||
        oldEmail === '' ||
        this.password === ''
      ) {
        return (this.error = 'No fields can be empty');
      }
      if (oldEmail !== this.$store.state.user.email) {
        return (this.error = 'Wrong email');
      }

      if (!validEmail(newEmail)) {
        return (this.error = "New email isn't valid");
      }
      if (newEmail === oldEmail) {
        return (this.error = "Can't be the same email");
      }
      try {
        await this.$store.dispatch('changeEmail', {
          email: newEmail,
          password: this.password
        });
        this.$emit('emailChanged');
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style>
</style>