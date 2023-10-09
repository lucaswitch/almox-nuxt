<template>
  <h6 class="text-h6">
    Usuários
  </h6>
  <NuxtLink to="/dashboard/users/add">
    <v-btn color="primary">
      Adicionar usuário
    </v-btn>
  </NuxtLink>
  <v-table class="mt-2">
    <thead>
    <tr>
      <th class="text-left">
        Nome
      </th>
      <th class="text-left">
        Usuário
      </th>
      <th class="text-left">
        Permissões
      </th>
      <th>
        Ações
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items"
        :key="item.name"
    >
      <td>{{ item.full_name }}</td>
      <td>{{ item.username }}</td>
      <td>
        {{ item.role === 0 ? 'Administrador' : 'Professor' }}
      </td>
      <td>
        <v-btn variant="flat" compact
               :to="'/dashboard/users/'+item.id">
          Editar
        </v-btn>
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
          $fetch('/api/users', {
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
