<template>
  <v-form class="px-6">
    <p class="text-caption">
      Perfil
    </p>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
            variant="outlined"
            v-model="full_name"
            label="Nome completo"
            :error-messages="errors?.full_name ? [errors.full_name] : ''"
            clearable
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
            variant="outlined"
            v-model="username"
            label="Usuário para login"
            :error-messages="errors?.username ? [errors.username] : ''"
            clearable
        />
      </v-col>
    </v-row>
    <p class="text-caption">
      Usuário de acesso
    </p>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
            variant="outlined"
            v-model="password"
            label="Senha"
            :error-messages="errors?.password ? [errors.password] : ''"
            clearable
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-select
            label="Tipo de usuário"
            v-model="type"
            :items="default_types"
            variant="outlined"
            :error-messages="errors?.type ? [errors.type] : ''"
        />
      </v-col>
    </v-row>
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
    O usuário {{ created?.full }} acaba de ser adicionado
  </v-snackbar>
</template>

<script lang="ts">
import {useAuth} from "~/stores/auth.js";
import {UserSchema} from "~/server/utils/validation";

export default {
  props: ['id'],
  setup({id = null}) {
    return {
      auth: useAuth(),
      id
    }
  },
  data() {
    return {
      full_name: '',
      username: '',
      password: '',
      type: '',
      errors: {},
      default_types: ['Admin', 'Professor'],
      created: null
    };
  },
  methods: {
    async validate(data) {
      this.errors = {};
      try {
        await UserSchema.validate(data);
        return true;
      } catch (err) {
        console.log(err);
        this.errors[err.path] = err.message;
        console.log(err.path, err.message);
        return false;
      }
    },
    async add() {
      if (this.created) {
        return;
      }
      const data = {
        full_name: this.full_name,
        username: this.username,
        password: this.password,
        type: this.type,
      };
      if (this.id) {
        data.id = this.id;
      }

      const isValid = await this.validate(data);
      if (isValid) {
        try {
          this.created = await $fetch(`/api/users`, {
            method: 'post',
            body: data,
            headers: {
              Authorization: `Bearer ${this.auth.token}`
            }
          });
          navigateTo('/dashboard/users');
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
  async mounted() {
    if (this.id) {

      const {username, full_name, role} = await $fetch('/api/users?id=' + this.id);
      this.username = username;
      this.full_name = full_name;
      this.type = (role === 0) ? 'Admin' : 'Professor';
    }
  },
};
</script>
