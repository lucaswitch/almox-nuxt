<template>
  <h6 class="text-h6">
    Usuários
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Atualizar usuário
    </v-card-title>
    <div class="mt-4">
      <user-form :id="route.params.id"/>
    </div>
  </v-card>
</template>

<script lang="ts">
definePageMeta({
  layout: "dashboard",
});

import UserForm from "~/components/forms/user-form.vue";

export default defineComponent({
  components: {UserForm},
  setup() {
    return {
      route: useRoute()
    }
  },
  mounted() {

  }
})
</script>
