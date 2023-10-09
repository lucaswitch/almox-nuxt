<template>
  <h6 class="text-h6">
    Usuários
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Adicionar novo usuário
    </v-card-title>
    <v-card-subtitle>
      Para adicionar novos usuários preencha o formulário abaixo.
    </v-card-subtitle>
    <div class="mt-4">
      <user-form />
    </div>
  </v-card>
</template>

<script>
import UserForm from '~/components/forms/user-form.vue'

definePageMeta({
  layout: "dashboard",
});

export default {
  components: {
    UserForm
  }
}
</script>
