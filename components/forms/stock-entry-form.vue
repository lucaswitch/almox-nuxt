<template>
  <div v-if="created" class="px-3">
    <div v-if="created.amount > 0">
      <p class="text-body-1">
        {{ created.amount }} itens adicionados com sucesso ao estoque de materiais!
      </p>
    </div>
    <div v-else>
      <p class="text-body-1">
        {{ Math.abs(created.amount, 10) }} itens removido com sucesso do estoque de materiais!
      </p>
    </div>
    <div class="py-2">
      <v-btn color="primary" :href="'/dashboard/materials/'+material_id+'/entry'">
        Continuar
      </v-btn>
    </div>
  </div>
  <div v-else>
    <v-form
        class="px-3">
      <v-row align="center">
        <v-col>
          <v-text-field
              variant="outlined"
              v-model="amount"
              clearable
              label="Quantidade"
              :error-messages="errors?.amount ? [errors.amount] : ''"
          />
        </v-col>
      </v-row>
      <v-row class="py-2 px-2">
        <v-btn color="primary" @click="add" :disabled="disabled">
          Adicionar
        </v-btn>
        <v-btn color="primary" variant="outlined"
               class="ml-2"
               :href="'/dashboard/materials/'+material_id+'/entry'">
          Voltar
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import {EntrySchema} from "~/server/utils/validation";
import {useAuth} from "~/stores/auth.js";
import {ca} from "vuetify/locale";

const auth = useAuth();

const {material_id} = defineProps({
  material_id: String
})

definePageMeta({
  layout: "dashboard",
});

const disabled = ref(false)
const created = ref(null)
const amount = ref(0)
const errors = ref({})


async function validate() {
  errors.value = {}
  try {
    await EntrySchema.validate({amount: Number(amount.value)});
    return true;
  } catch (err) {
    // @ts-ignore
    errors.value[err.path] = err.message;
    return false;
  }
}

async function add() {
  if (await validate() && disabled) {
    disabled.value = true
    try {
      created.value = await $fetch('/api/entry', {
        method: 'post',
        body: {
          amount: parseInt(amount.value, 10),
          material_id: parseInt(material_id, 10)
        },
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
    } catch (err) {
      // @ts-ignore
      errors.value = err.response._data.data
    }
    disabled.value = false
  }
}

</script>
