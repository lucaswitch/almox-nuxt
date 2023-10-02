<template>
  <h6 class="text-h6">
    Indice de materiais
  </h6>
  <NuxtLink to="/dashboard/materials/add">
    <v-btn color="primary">
      Adicionar entrada
    </v-btn>
  </NuxtLink>
  <v-table class="mt-2">
    <thead>
    <tr>
      <th class="text-left">
        Nome
      </th>
      <th class="text-left">
        Quantidade
      </th>
      <th class="text-left">
        Concentração
      </th>
      <th class="text-left">
        Peso
      </th>
      <th class="text-left">
        Marca
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items"
        :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ '--' }}</td>
      <td>{{ item.weight }}</td>
      <td>{{ item.concentration }}</td>
      <td>{{ item.brand }}</td>
      <td>
        <v-btn-toggle
            color="primary"
            mandatory
        >
          <v-btn variant="text" compact>
            Remover
          </v-btn>
        </v-btn-toggle>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {useAuth} from "~/stores/auth";

definePageMeta({
  layout: "dashboard",
});


export default {
  setup() {
    return {
      auth: useAuth()
    }
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
              Authorization: `Bearer ${this.auth.token}`
            }
          });
    }
  },
  async mounted() {
    await this.refresh();
  }
}
</script>
