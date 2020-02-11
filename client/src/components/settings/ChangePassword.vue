<template>
  <form class="flex flex-col justify-between items-start" @submit.prevent="changePassword">
    <label class="py-2" for="oldEmail">Old Password</label>
    <input v-model.trim="oldPassword" class="form-input w-full bg-gray-200" type="password" />
    <label class="py-2" for="oldEmail">New Password</label>
    <input v-model.trim="newPassword" class="form-input w-full bg-gray-200" type="password" />
    <label class="py-2" for="oldEmail">New Password Again</label>
    <input v-model.trim="newPasswordAgain" class="form-input w-full bg-gray-200" type="password" />
    <span class="text-red-500 mt-3 text-sm italic">{{error}}</span>
    <div class="mt-4 flex w-full justify-end">
      <button type="submit" class="btn btn-purple">Change</button>
    </div>
  </form>
</template>

<script>
import validPassword from '../../utilities/validPassword';
export default {
  data: () => ({
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
    error: ''
  }),
  methods: {
    async changePassword() {
      const oldPassword = this.oldPassword;
      const newPassword = this.newPassword;
      const newPasswordAgain = this.newPasswordAgain;
      this.error = '';
      if (newPassword !== newPasswordAgain) {
        return (this.error = "New password isn't the same.");
      }
      if (newPassword === '' || newPasswordAgain === '' || oldPassword === '') {
        return (this.error = 'No fields can be empty.');
      }

      if (!validPassword(newPassword)) {
        return (this.error =
          'A password must contain at least a letter, a capital letter, a number and must be between 8 and 32 characters long.');
      }
      if (newPassword === oldPassword) {
        return (this.error =
          "New password can't be the same as the old password.");
      }
      try {
        await this.$store.dispatch('changePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        });
        this.$emit('passwordChanged');
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