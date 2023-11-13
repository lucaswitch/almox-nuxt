<template>
  <div class="d-flex flex-row mb-6 ga-1 pa-4">
    <v-btn color="primary"
           :href="'/dashboard/materials/'+material_id+'/entry/new'">
      Adicionar registro
    </v-btn>
    <v-btn color="primary"
           class="ml-2"
           variant="outlined"
           href="/dashboard/materials">
      Voltar
    </v-btn>
  </div>
  <div class="pa-4">
    <p class="text-subtitle-1">
      Histórico de registros
    </p>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Data
        </th>
        <th class="text-right">
          Quantidade
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in entries" :key="entry.id">
        <td>{{ entry.created_at }}</td>
        <td class="text-right">
          <div v-if="entry.amount > 0">
            +{{ entry.amount }}
          </div>
          <div v-else>
            {{ entry.amount }}
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import {getLocalDateString} from "~/server/utils/formatter";
import {useAuth} from "~/stores/auth.js";
import type {StockEntry} from "~/server/utils/types";

const auth = useAuth();
const {material_id} = defineProps({
  material_id: String
})
const entries = ref<StockEntry[]>([])

async function getEntries(): Promise<StockEntry[]> {
  let data = await $fetch(`/api/materials-entries`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    params: {
      id: material_id
    }
  })

  data = data.map(function ({created_at, updated_at, ...others}: StockEntry) {
    created_at = getLocalDateString(created_at, 'LLLL')
    updated_at = getLocalDateString(updated_at, 'LLLL')
    return {
      ...others, created_at, updated_at
    }
  })
  return data
}

entries.value = await getEntries()
</script>
