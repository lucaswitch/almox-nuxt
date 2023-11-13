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
      <th class="text-right">
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
      <th class="text-right">Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items"
        :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td class="text-right">{{ (item.quantity) ? item.quantity : 0 }}</td>
      <td>{{ item.weight }}</td>
      <td>{{ item.concentration }}</td>
      <td>{{ item.brand }}</td>
      <td class="text-right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                variant="tonal"
                v-bind="props"
            >
              Ações
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Remover</v-list-item-title>
            </v-list-item>
            <v-list-item :href="'/dashboard/materials/'+item.id+'/entry'">
              <v-list-item-title>Estoque</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
