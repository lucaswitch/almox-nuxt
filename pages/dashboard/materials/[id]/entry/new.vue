<template>
  <h6 class="text-h6">
    Entradas e saidas / Adicionar entrada
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Entradas
    </v-card-title>
    <v-card-subtitle>
      Adicione uma nova entrada
    </v-card-subtitle>
    <div class="mt-4">
      <stock-entry-form :material_id="material_id"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">

import StockEntryForm from '~/components/forms/stock-entry-form.vue'
const route = useRoute()
const material_id = parseInt(route.params.id, 10)

definePageMeta({
  layout: "dashboard",
});

</script>
