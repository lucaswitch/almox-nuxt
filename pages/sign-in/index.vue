<template>
  <h1 class="d-flex justify-center mb-10">Login</h1>
  <v-card
      class="mx-auto px-6 py-8"
      max-width="444"
      title="Realizar login"
  >
    <sign-in-form/>
  </v-card>
</template>

<script>

import SignInForm from "~/components/forms/sign-in-form.vue";
export default {
  components: {SignInForm},
};
</script>
