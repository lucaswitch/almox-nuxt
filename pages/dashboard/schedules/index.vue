<template>
  <h6 class="text-h6">
    Agenda
  </h6>
  <p class="body2 text-medium-emphasis">
    Pressione um dos itens para expandir
  </p>
  <v-row>
    <v-col v-if="appointment">
      <v-card
          variant="flat"
          min-width="400"

          class="mx-auto"
          prepend-icon="mdi-calendar"
      >
        <template v-slot:title>
          <b>Lab:</b> {{ appointment.name }}
        </template>
        <v-card-text>
          <p class="text-body1">
            {{ appointment.scheduledFrom }} / {{ appointment.scheduledTo }}
          </p>
          <p class="body2 text-medium-emphasis">
            Criado por {{ appointment.full_name }} em {{ appointment.createdDate }}
          </p>
          <v-row v-if="appointment.materials.length > 0">
            <v-col>
              <v-list lines="one">
                <v-list-item
                    v-for="({id, name, quantity}, index) in appointment.materials"
                    :key="id"
                    :title="(index+1)+') '+name"
                    :subtitle="'quantidade: '+quantity"
                ></v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p class="body2 text-medium-emphasis">
                Não há materiais para este dia.
              </p>
            </v-col>
          </v-row>
          <v-btn color="primary" class="mt-2" variant="tonal" @click="handleOnClickRow(null)">
            Fechar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-table class="mt-2">
        <thead>
        <tr>
          <th class="text-left">
            Laboratório
          </th>
          <th class="text-right">
            Por
          </th>
          <th class="text-left">
            A partir
          </th>
          <th class="text-left">
            Até
          </th>
          <th class="text-right">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in appointments"
            :key="item.id"
            @click="handleOnClickRow(item)"
            style="cursor: pointer">
          <td>
            {{ item.name }}
          </td>
          <td class="text-right text-body2 text-medium-emphasis">
            {{ item.firstName }}
          </td>
          <td class="text-left text-caption text-medium-emphasis">
            {{ item.scheduledFrom }}
          </td>
          <td class="text-left text-caption text-medium-emphasis">
            {{ item.scheduledTo }}
          </td>
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
                <v-list-item
                    v-if="item.isFuture"
                    @click="handleOnCancel(item.id)">
                  <v-list-item-title>Cancelar</v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-if="item.isFuture === false"
                    @click="handleOnGiveBack(item.id)">
                  <v-list-item-title>Devolver materiais</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {useAuth} from "~/stores/auth";
import {getLocalDateString, getMoment, getFirstName} from "~/utils/formatter";
import moment from "moment";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuth()

const appointments = ref<any>([])
const appointment = ref<any>(null)


async function handleOnClickRow(value: { id: number } | null) {
  if (value === null) {
    appointment.value = null
  } else {
    appointment.value = {
      ...value,
      materials: (await $fetch('/api/labs/schedule-materials', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          appointment_id: value.id
        }
      }))
    };
  }
}

async function handleOnCancel(id: number) {
  await $fetch('/api/labs/schedule-cancel', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    body: {
      id
    }
  })

  await refresh()
}

async function handleOnGiveBack(id: number) {
  await navigateTo(`/dashboard/schedules/${id}/give-back`)
}

async function getAppointments() {
  return await $fetch('/api/labs/schedules', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  })
}

async function refresh() {
  appointments.value = (await getAppointments()).map(({
                                                        created_at,
                                                        full_name,
                                                        scheduled_from,
                                                        scheduled_to,
                                                        ...others
                                                      }) => {
    const format = 'DD/MM/YYYY HH:mm'
    const scheduledFrom = getLocalDateString(scheduled_from, format)
    const scheduledTo = getLocalDateString(scheduled_to, format)
    let isFuture = false
    const scheduledFromDate = getMoment(scheduled_from)
    if (scheduledFromDate && scheduledFromDate.utc().unix() > moment().utc().unix()) {
      isFuture = true
    }
    const firstName = getFirstName(full_name)
    const createdDate = getLocalDateString(created_at, format)

    return {
      ...others,
      full_name,
      firstName,
      isFuture,
      createdDate,
      scheduledTo,
      scheduledFrom,
      scheduled_from,
      scheduled_to
    }
  })
}

await refresh()
</script>
