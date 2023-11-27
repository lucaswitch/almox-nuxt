<template>
  <v-layout style="background-color: #f5f5f7;">
    <v-app-bar
        color="primary"
        density="compact"
    >
      <template v-slot:prepend>
      </template>
      <v-app-bar-title>Almox UniCeub&reg;</v-app-bar-title>
      <template v-slot:append>
        <v-btn router to="/"
               variant="flat">
          Home
        </v-btn>
        <v-btn router to="/sign-in"
               variant="flat"
               class="ml-2"
        >
          Entrar
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot/>
      </v-container>
      <Footer/>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import Footer from "~/components/footer/default.vue";

export default {
  components: {
    Footer
  }
}
</script>
