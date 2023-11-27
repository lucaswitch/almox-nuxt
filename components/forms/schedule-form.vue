<template>
  <v-form class="px-3">
    <v-row v-if="created" class="pl-2 pr-2">
      <v-col>
        <v-row>
          <v-alert
              type="info"
              title="Laboratório agendado"
              text="O laboratório foi agendado com sucesso!"
              variant="tonal"
          >
          </v-alert>
        </v-row>
        <v-row class="mt-4 mb-1">
          <v-btn color="primary" to="/dashboard/schedules">
            Ir para agenda
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-row>
          <v-col>
            <v-select
                v-model="lab_id"
                variant="outlined"
                label="Laboratório"
                clearable
                :items="labs"
                item-title="name"
                item-value="id"
                :error-messages="errors?.lab_id ? [errors.lab_id] : ''"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                variant="outlined"
                v-model="scheduled_from"
                clearable
                v-maska:[options]
                label="Data de início(Reserva)"
                :error-messages="errors?.scheduled_from ? [errors.scheduled_from] : ''"
            />
          </v-col>
          <v-col>
            <v-text-field
                variant="outlined"
                v-model="scheduled_to"
                v-maska:[options]
                clearable
                label="Data de fim(Reserva)"
                :error-messages="errors?.scheduled_to ? [errors.scheduled_to] : ''"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                variant="outlined"
                v-model="note"
                clearable
                label="Motivo da reserva"
                :error-messages="errors?.note ? [errors.note] : ''"
            />
          </v-col>
        </v-row>
        <p class="text-subtitle-1 text-medium-emphasis mt-2 mb-2">
          Selecione os materiais necessários para a reserva do laboratório abaixo:
        </p>
        <v-row v-if="materials.length > 0">
          <v-col>

            <v-list lines="one">
              <v-list-item
                  v-for="({id, name, quantity}, index) in materials"
                  :key="id"
                  :title="(index+1)+') '+name"
                  :subtitle="'quantidade: '+quantity"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
                variant="outlined"
                label="Material"
                clearable
                v-model="material_id"
                :items="availableMaterials"
                item-title="name"
                item-value="id"
                :error-messages="errors?.material_id ? [errors.material_id] : ''"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
                variant="outlined"
                v-model="quantity"
                clearable
                label="Quantidade"
                :error-messages="errors?.quantity ? [errors.quantity] : ''"
            />
          </v-col>
          <v-col>
            <v-btn color="primary" @click="handleOnAddMaterial">
              Adicionar
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="fatalError">
          <v-col>
            <v-snackbar
                v-model="fatalError"
                multi-line
            >
              {{ fatalError }}
            </v-snackbar>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" @click="handleOnSchedule">
              Reservar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth.js";
import {ScheduleMaterialSchema, ScheduleSchema} from "~/server/utils/validation";
import {vMaska} from "maska"
import moment from "moment";
import Material from "~/server/utils/database/models/material";
import {getMoment} from "~/utils/formatter";

const auth = useAuth();
const options = {mask: '##/##/#### ##:##'};

const quantity = ref(0)
const material_id = ref(null)

const availableMaterials = ref<any>([])
const materials = ref<any>([])
const lab_id = ref<number | null>(null)
const note = ref<string | null>(null)
const scheduled_from = ref<string | null>(null)
const scheduled_to = ref<string | null>(null)
const labs = ref<any>([])
const errors = ref<any>({})
const fatalError = ref<string | null>(null)
const created = ref<any>(null)

async function validate(): Promise<boolean> {
  errors.value = {};
  const data = {
    scheduled_to: scheduled_to.value,
    scheduled_from: scheduled_from.value,
    lab_id: Number(lab_id.value),
    note: note.value || ''
  }
  try {
    await ScheduleSchema.validate(data);
    const scheduledFrom = getMoment(data.scheduled_from, 'DD/MM/YYYY HH:mm')
    const scheduledTo = getMoment(data.scheduled_to, 'DD/MM/YYYY HH:mm')
    if (!scheduledFrom || !scheduledTo) {
      if (!scheduledFrom)
        errors.value.scheduled_from = 'A data de início não pode ser inferior a data de início.'
      else if (!scheduledTo) {
        errors.value.scheduled_to = 'A data de fim não pode ser inferior a data de início.'
      }
    } else if (scheduledFrom.unix() > scheduledTo.unix()) {
      errors.value.scheduled_to = 'A data de fim não pode ser inferior a data de início.'
      return false
    } else if (scheduledFrom.unix() === scheduledTo.unix()) {
      errors.value.scheduled_to = 'A data de fim não pode ser igual a data de início.'
    }
    if (materials.value.length > 0)
      for (const {quantity, material_id} of materials.value) {
        await ScheduleMaterialSchema.validate({quantity, material_id});
        const hasAvailableQuantity = await ($fetch('/api/labs/check-material-quantity', {
          method: 'get',
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
          params: {quantity, material_id}
        }))
        if (!hasAvailableQuantity) {
          material_id.value = material_id
          quantity.value = quantity
          errors.value['quantity'] = 'Não há quantidade em estoque para esta reserva.'
          return false
        }
      }
    return true;
  } catch (err) {
    console.error(err)
    // @ts-ignore
    errors.value[err.path] = err.message;
    return false;
  }
}

async function validateMaterials() {
  errors.value = {};

  const data = {
    material_id: Number(material_id.value),
    quantity: Number(quantity.value)
  }
  try {
    await ScheduleMaterialSchema.validate(data);
    const hasAvailableQuantity = await ($fetch('/api/labs/check-material-quantity', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      params: data
    }))
    if (!hasAvailableQuantity) {
      errors.value['quantity'] = 'Não há quantidade em estoque para esta reserva.'
      return false
    }

    return true;
  } catch (err) {
    // @ts-ignore
    errors.value[err.path] = err.message;
    return false;
  }
}


async function getLabs() {
  return await
      $fetch('/api/labs', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
}

async function getMaterials(): Promise<Material[]> {
  return await
      $fetch('/api/materials', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
}

async function schedule() {
  try {
    const scheduledFrom = getMoment(scheduled_from.value, 'DD/MM/YYYY HH:mm')
    const scheduledTo = getMoment(scheduled_to.value, 'DD/MM/YYYY HH:mm')

    const body = {
      scheduled_from: scheduledFrom?.utc().format('DD/MM/YYYY HH:mm'),
      scheduled_to: scheduledTo?.utc().format('DD/MM/YYYY HH:mm'),
      lab_id: Number(lab_id.value),
      note: note.value || '',
      materials: materials.value
    }
    created.value = await $fetch(`/api/labs/schedule`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body,

    });
  } catch (err) {
    // @ts-ignore
    errors.value['lab_id'] = err.response.statusText
  }
}


async function handleOnSchedule() {
  if (await validate()) {
    await schedule()
  }
}

async function handleOnAddMaterial() {
  if (await validateMaterials()) {
    for (const material of availableMaterials.value) {
      if (material.id == material_id.value) {
        const arr = [...materials.value].filter(({material_id}) => {
          return material_id !== material.id
        })

        arr.push({
          material_id: material_id.value,
          quantity: quantity.value,
          name: material.name
        })
        materials.value = arr
        break;
      }
    }
  }
}

labs.value = (await getLabs())
availableMaterials.value = (await getMaterials()).filter(({quantity}) => quantity > 0)

</script>
