<template>
  <h6 class="text-h6">
    Devolver materiais
  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <template v-slot:title>
      <b>Laboratório:</b> <span class="text-subtitle1">{{ appointment.name }}</span>
    </template>
    <v-card-text v-if="appointment">
      <p class="text-body1">
        {{ appointment.scheduledFrom }} / {{ appointment.scheduledTo }}
      </p>
      <p class="body2 text-medium-emphasis">
        Criado por {{ appointment.full_name }} em {{ appointment.createdDate }}
      </p>
      <div v-if="canGiveBack">
        <div
            v-for="message in notifications"
        >
          <v-alert
              type="success"
              title="Tudo certo!"
              :text="message"
              variant="tonal"
          >
          </v-alert>
        </div>

        <v-list
            lines="one">
          <div v-for="material in materials">
            <v-list-item
                v-if="material.quantity < 0"
                :key="material.id"
                :title="material.name"
                :subtitle="'quantidade para devolver: '+ material.quantity+' '+material.metric.toLowerCase()">

              <template
                  v-slot:default>
                <div
                    v-if="material_id === material.id"
                    class="d-flex align-start mt-4 mb-6"
                >
                  <v-text-field
                      variant="outlined"
                      v-model="quantity"
                      density="compact"
                      label="Quantidade retornada"
                      type="number"
                      min="0"
                      :max="material.quantity"
                      :error-messages="errors?.quantity ? [errors.quantity] : ''"
                  />
                  <v-btn
                      color="primary"
                      variant="tonal"
                      class="ml-2"
                      @click="giveBack(material)"
                  >
                    Confirmar
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                      color="primary"
                      variant="tonal"
                      @click="handleOnGiveBack(material.name, material.id)"

                  >Devolver material
                  </v-btn>
                </div>
              </template>
            </v-list-item>
          </div>
        </v-list>
      </div>
      <div v-else>
        <v-alert
            type="info"
            title="Tudo certo!"
            text="Não há materiais para devolver restantes"
            variant="tonal"
        >
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth";
import {getLocalDateString} from "~/utils/formatter";
import {EntrySchema} from "~/server/utils/validation";
import {ca} from "vuetify/locale";

const route = useRoute()
const auth = useAuth()
const id = route.params.id

const errors = ref<any>({})
const appointment = ref<any>(null)
const materials = ref<any>([])
const material_name = ref<string | null>(null)
const material_id = ref<any>(null)
const quantity = ref<any>(0)
const notifications = ref<string[]>([])
const canGiveBack = ref<boolean>(false)

definePageMeta({
  layout: "dashboard",
});


async function handleOnGiveBack(name: string, id: number | string | null) {
  material_id.value = id
  material_name.value = name
  quantity.value = 0
}

async function giveBack(material: any) {
  if (await validateQuantity()) {

    const body = {
      appointment_id: Number(appointment.value.id),
      material_id: Number(material.id),
      quantity: Number(quantity.value)
    }

    try {
      await $fetch(`/api/labs/schedule-give-back`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        body
      })
      notifications.value.push(`${material.name}(${quantity.value} ${material.metric.toLowerCase()}) retornados`)
      material_id.value = null
      quantity.value = 0
      await refresh()
    } catch (err) {

    }
  }
}

async function validateQuantity() {
  errors.value = {}

  try {
    await EntrySchema.validate({
      amount: Number(quantity.value)
    })
    if (Number(quantity.value) < 0) {
      errors.value['quantity'] = 'Você não pode devolver uma quantidade negativa.'
      return false
    }
    return true
  } catch (err) {
    // @ts-ignore
    errors.value[err.path] = err.message
    return false
  }
}

async function getAppointment(id: number | string) {
  const appointment = await $fetch(`/api/labs/schedule-view`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    params: {
      id
    }
  })
  const scheduledFrom = getLocalDateString(appointment.scheduled_from, 'DD/MM/YYYY HH:mm')
  const scheduledTo = getLocalDateString(appointment.scheduled_to, 'DD/MM/YYYY HH:mm')
  const createdDate = getLocalDateString(appointment.created_at, 'DD/MM/YYYY HH:mm')
  return {...appointment, scheduledFrom, scheduledTo, createdDate}
}

async function getMaterials(id: number | string) {
  return await $fetch(`/api/labs/schedule-materials`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    params: {
      appointment_id: id
    }
  })
}

async function refresh() {

  materials.value = (await getMaterials(id)).map((material) => {
    material.quantity = Number(material.quantity)
    return material
  })

  canGiveBack.value = false
  for (const {quantity} of materials.value) {
    if (quantity < 0) {
      canGiveBack.value = true
      break;
    }
  }

}

appointment.value = await getAppointment(id)
await refresh()
</script>
