<template>
  <v-form class="px-3">
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
    <p class="text-subtitle-1 text-medium-emphasis mt-2">
      Selecione os materiais necessários para a reserva do laboratório abaixo:
    </p>
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
  </v-form>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth.js";
import {ScheduleSchema} from "~/server/utils/validation";
import {vMaska} from "maska"
import moment from "moment";

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

async function validate(): Promise<boolean> {
  errors.value = {};
  const data = {
    scheduled_to: scheduled_to.value,
    scheduled_from: scheduled_from.value,
    lab_id: parseInt(lab_id.value, 10),
    note: note.value || ''
  }
  try {
    await ScheduleSchema.validate(data);
    const scheduledFrom = moment(data.scheduled_from, 'DD/MM/YYYY HH:mm')
    const scheduledTo = moment(data.scheduled_to, 'DD/MM/YYYY HH:mm')
    if (scheduledFrom > scheduledTo) {
      errors.scheduled_to = 'A data de fim não pode ser maior.'
      return false
    }
    return true;
  } catch (err) {
    console.error(err)
    errors.value[err.path] = err.message;
    console.log('errors', err.path, err.message)
    return false;
  }
}

async function validateMaterials() {
  errors.value = {};
  const data = {
    material_id: parseInt(material_id.value, 10),
    quantity: parseInt(quantity.value, 10)
  }
  try {
    await ScheduleMaterialSchema.validate(data);
    return true;
  } catch (err) {
    console.error(err)
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

async function getMaterials() {
  return await
      $fetch('/api/materials', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
}

async function schedule() {
  const body = {
    scheduled_to: scheduled_to.value,
    scheduled_from: scheduled_from.value,
    lab_id: parseInt(lab_id.value, 10),
    note: note.value || ''
  }
  await $fetch(`/api/labs/schedule`, {
    method: 'post',
    body,
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  });
}


async function handleOnSchedule() {
  if (await validate()) {
    await schedule()
  }
}

async function handleOnAddMaterial() {
  if (await validateMaterials()) {
    materials.value = [...materials.value, {
      material_id: material_id.value,
      quantity: quantity.value
    }]
  }
}

labs.value = (await getLabs())
availableMaterials.value = (await getMaterials()).filter(({quantity}) => {
  return quantity > 0
})
</script>
