<template>
  <v-form class="px-3">
    <v-row>
      <v-col>
        <v-text-field
            variant="outlined"
            v-model="name"
            clearable

            label="Nome do produto"
            :error-messages="errors?.name ? [errors.name] : ''"
        />
      </v-col>
      <v-col>
        <v-text-field
            v-model="formula"
            variant="outlined"
            clearable
            label="Fórmula química"
            :error-messages="errors?.formula ? [errors.formula] : ''"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
            v-model="concentration"
            variant="outlined"
            label="Concentração"
            clearable
            :error-messages="errors?.concentration ? [errors.concentration] : ''"
        />
      </v-col>
      <v-col>
        <v-text-field
            v-model="weight"
            variant="outlined"
            clearable
            label="Peso molecular"
            :error-messages="errors?.weight ? [errors.weight] : ''"
        />
      </v-col>
      <v-col>
        <v-text-field
            v-model="brand"
            variant="outlined"
            clearable
            label="Marca"
            :error-messages="errors?.brand ? [errors.brand] : ''"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
            v-model="metric"
            variant="outlined"
            clearable
            label="Unidade de medidas"
            :items="default_units"
            :error-messages="errors?.metric ? [errors.metric] : ''"
        ></v-select>
      </v-col>
    </v-row>

    <v-textarea
        v-model="note"
        variant="outlined"
        class="mt-5"
        clearable
        label="Observações"
        :error-messages="errors?.note ? [errors.note] : ''"
    />

    <v-btn
        color="primary"
        @click="add"
    >
      Prosseguir
    </v-btn>
  </v-form>
  <v-snackbar
      v-model="created"
      multi-line
  >
    O material {{ created?.name }} acaba de ser adicionado no estoque
  </v-snackbar>
</template>

<script lang="ts">
import {useAuth} from "~/stores/auth.js";
import {mask} from "vue-the-mask";
import {MaterialSchema} from "~/server/utils/validation";

export default {
  setup() {
    return {
      auth: useAuth()
    }
  },
  data() {
    return {
      default_units: ["Mililitros", "Litros", "Miligramas", "Gramas", "Quilos"],
      name: "",
      formula: "",
      concentration: "",
      weight: "",
      brand: "",
      metric: "",
      note: "",
      errors: {},
      created: null
    };
  },
  directives: {mask},
  methods: {
    async validate(data) {
      this.errors = {};
      try {
        await MaterialSchema.validate(data);
        return true;
      } catch (err) {
        this.errors[err.path] = err.message;
        return false;
      }
    },
    async add() {
      const data = {
        name: this.name,
        formula: this.formula,
        concentration: this.concentration,
        weight: this.weight,
        brand: this.brand,
        metric: this.metric,
        note: this.note,
      };

      const isValid = await this.validate(data);
      if (isValid) {
        try {
          this.created = await $fetch(`/api/materials`, {
            method: 'post',
            body: data,
            headers: {
              Authorization: `Bearer ${this.auth.token}`
            }
          });
          navigateTo('/dashboard/materials');

        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
