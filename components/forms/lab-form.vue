<template>
  <v-form class="px-3">
    <v-row>
      <v-col>
        <v-text-field
            variant="outlined"
            v-model="name"
            clearable
            label="Nome"
            :error-messages="errors?.name ? [errors.name] : ''"
        />
      </v-col>
      <v-col>
        <v-text-field
            variant="outlined"
            v-model="student_capacity"
            clearable
            label="Capacidade"
            :error-messages="errors?.student_capacity ? [errors.student_capacity] : ''"
        />
      </v-col>
    </v-row>
    <v-btn color="primary" @click="handleOnClick">
      Salvar
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth.js";

const auth = useAuth();
import {LabSchema} from "~/server/utils/validation";

const {lab_id} = defineProps({
      lab_id: String
    }
)

const name = ref<string>()
const student_capacity = ref<string>()
const errors = ref<any>({})


async function validate(): Promise<boolean> {
  errors.value = {};
  const data = {

  }
  try {
    await LabSchema.validate(data);
    return true;
  } catch (err) {
    errors.value[err.path] = err.message;
    return false;
  }
}

async function create() {
  const body = {
    name: name.value,
    student_capacity: parseInt(student_capacity.value, 10)
  }
  return await $fetch('/api/labs/create', {
    method: 'post',
    body,
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  })
}

async function update(id: number) {
  let body: { student_capacity: number; name: string | undefined };
  body = {
    name: name.value,
    student_capacity: parseInt(student_capacity.value || '0', 10)
  };
  return await $fetch('/api/labs/update', {
    method: 'post',
    body,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    params: {
      lab_id: id
    }
  })
}

async function handleOnClick() {

  if (await validate()) {
    if (lab_id) {
      await update(lab_id);
    } else {
      await create();
    }
    navigateTo('/dashboard/labs');

  }
}

if (lab_id) {
  const data = await $fetch('/api/labs/view', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    params: {
      lab_id
    }
  })
  name.value = data.name;
  student_capacity.value = data.student_capacity;
}
</script>
