<template>
  <div class="leading-normal tracking-normal text-gray-900">
    <div class="pb-14 bg-right bg-cover" style="background-image:url('img/bg.svg');">
      <!--Nav-->
      <MarketingSiteNavigation />

      <!--Main-->
      <div
        class="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center"
      >
        <form
          @submit.prevent="checkForm"
          class="w-full max-w-lg p-4 rounded shadow slide-in-bottom"
          style="background-color:rgba(63, 81, 181, 0.05)"
        >
          <!-- class="bg-white shadow-md mx-auto rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-xs" -->

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
            <a
              class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-700"
              href="#"
            >Forgot Password?</a>
            <button
              class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >Sign In</button>
          </div>
        </form>
        <!--Footer-->
        <TheFooter />
      </div>
    </div>
  </div>
</template>

<script>
import validEmail from '../utilities/validEmail';
import MarketingSiteNavigation from '../components/MarketingSiteNavigation';
import TheFooter from '../components/reusables/TheFooter';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  name: 'login',
  components: {
    MarketingSiteNavigation,
    TheFooter
  },
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

      let emailIsValid = validEmail(this.email);
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
        await this.$store.dispatch('login', {
          email: this.email.toLowerCase(),
          password: this.password
        });
        this.$router.push({
          name: 'boardOverview'
        });
      } catch (error) {
        this.error = 'Server is down';

        if (error.response.data.error) {
          this.error = error.response.data.error;
        }
      }
    }
  }
};
</script>

<style scoped>
.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>