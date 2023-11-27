<template>
  <h6 class="text-h6">
    Laboratórios
  </h6>
  <NuxtLink to="/dashboard/labs/add">
    <v-btn color="primary">
      Adicionar laboratório
    </v-btn>
  </NuxtLink>

  <v-table class="mt-2">
    <thead>
    <tr>
      <th class="text-left">
        Id
      </th>
      <th class="text-left">
        Nome
      </th>
      <th class="text-right">
        Capacidade de alunos
      </th>
      <th class="text-right">Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items"
        :key="item.id"
    >
      <td>
        #{{ item.id }}
      </td>
      <td>{{ item.name }}</td>
      <td class="text-right">{{ (item.student_capacity) ? item.student_capacity : 0 }}</td>
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
            <v-list-item @click="handleOnDelete(item.id)">
              <v-list-item-title>Remover</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleOnUpdate(item.id)">
              <v-list-item-title>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleOnSchedule(item.id)">
              <v-list-item-title>Agendar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth.js";

definePageMeta({
  layout: "dashboard",
});


const auth = useAuth();

const items = ref<any>([])

async function getLabs() {
  return await
      $fetch('/api/labs', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
}

async function handleOnDelete(id: number | string) {
  await $fetch('/api/labs/delete', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    params: {
      lab_id: id
    }
  })
  items.value = await getLabs()
}

async function handleOnUpdate(id: number | string) {
  navigateTo(`/dashboard/labs/${id}/update`)
}

async function handleOnSchedule(id: number | string) {
  navigateTo(`/dashboard/labs/${id}/schedule`)
}

items.value = await getLabs()
console.log(items.value)
</script>
