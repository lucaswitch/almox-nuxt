<template>
  <h6 class="text-h6">
    Adicionar entradas e saidas
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Entradas
    </v-card-title>
    <v-card-subtitle>
      Adicione uma nova entrada
    </v-card-subtitle>
    <div class="mt-4">
      <stock-form :material_id="material_id"/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import StockForm from '~/components/forms/stock-form.vue'

const route = useRoute()
const material_id = route.params.id

definePageMeta({
  layout: "dashboard",
});


</script>
