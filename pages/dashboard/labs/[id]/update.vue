<template>
  <h6 class="text-h6">
    Laboratórios

  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Cria laboratório
    </v-card-title>
    <v-card-subtitle>
      Um laboratório representa um espaço para alugar materiais.
    </v-card-subtitle>
    <div class="mt-4">
      <lab-form :lab_id="lab_id"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import LabForm from "~/components/forms/lab-form.vue";

const route = useRoute()
const lab_id = parseInt(route.params.id, 10)
definePageMeta({
  layout: "dashboard",
});

</script>
