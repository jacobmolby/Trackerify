<template>
  <main class="p-10">
    <form
      @submit.prevent="checkForm"
      class="bg-white shadow-md mx-auto rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-xs"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-md focus:outline-none"
          :class="{'border-red-500': this.emailError}"
          id="email"
          type="text"
          placeholder="example@example.com"
          v-model.trim="email"
        />
        <p class="mt-3 text-red-500 text-xs italic">{{this.emailError}}</p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:shadow-md focus:outline-none"
          :class="{'border-red-500': this.passwordError}"
          id="password"
          type="password"
          placeholder="***********"
          v-model="password"
        />
        <p class="text-red-500 mt-3 text-xs italic">{{this.passwordError}}</p>
        <p class="text-red-500 mt-3 text-xs italic">{{this.error}}</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >Sign In</button>
        <a
          class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-700"
          href="#"
        >Forgot Password?</a>
      </div>
    </form>
  </main>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'login',
  data() {
    return {
      email: null,
      emailError: null,
      password: null,
      passwordError: null,
      error: null,
      response: null
    };
  },
  methods: {
    checkForm() {
      // Reset errors
      this.emailError = null;
      this.passwordError = null;
      this.error = null;

      let emailIsValid = this.validEmail(this.email);
      if (emailIsValid && this.password) {
        this.login();
      }

      if (!this.email) {
        this.emailError = 'Please choose an email.';
      } else if (this.email && !emailIsValid) {
        this.emailError = 'Email is not valid';
      }

      if (!this.password) {
        this.passwordError = 'Please choose a password.';
      }
    },
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email.toLowerCase(),
          password: this.password
        });

        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'boardOverview'
        });
      } catch (error) {
        this.error = 'Server is down';
        console.log(error);

        if (error.response.data.error) {
          this.error = error.response.data.error;
        }
      }
    },
    validEmail(email) {
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,7})+$/;
      return re.test(email);
    }
  }
};
</script>

<style>
</style>