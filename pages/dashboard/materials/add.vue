<template>
  <h6 class="text-h6">
    Indice de materiais
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Adicionar entrada
    </v-card-title>
    <v-card-subtitle>
      Para adicionar novos materiais informe as informações da nova remessa.
    </v-card-subtitle>
    <div class="mt-4">
      <material-form/>
    </div>
  </v-card>
</template>

<script>
import MaterialForm from '~/components/forms/material-form.vue'

definePageMeta({
  layout: "dashboard",
});

export default {
  components: {
    MaterialForm
  },
  data() {
    return {
      items: [],
      total_count: 0,
      page: 1
    }
  },
  methods: {
    async refresh() {
      this.items = await
          $fetch('/api/materials', {
            method: 'get',
            headers: {
              // Authorization: `Bearer ${this.auth.token}`
            }
          });
    }
  },
  async mounted() {
    await this.refresh();
  }
}
</script>
