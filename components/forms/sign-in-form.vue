<template>
  <v-form
      @submit.prevent="handleOnLogin">
    <v-text-field
        v-model="form.username"
        :readonly="loading"
        variant="outlined"
        class="mb-2"
        label="Usuário"
        placeholder="lucaswitch"
        :error-messages="errors?.username"
        clearable
    />
    <v-text-field
        v-if="form.username && form.username.length > 0"
        v-model="form.password"
        :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text': 'password'"
        :error-messages="errors?.password"
        name="input-10-1"
        variant="outlined"
        label="Senha"
        clearable=""
        @click:append-inner="handleOnClickPasswordIcon"
    />
    <div
        v-if="(form.username && form.username.length > 0 && form.password && form.password.length > 0)"
    >
      <br>
      <v-btn
          :loading="loading"
          color="primary"
          type="submit"
          @click="handleOnLogin"
          block
      >
        Entrar
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import {useAuth} from "~/stores/auth.js";


import * as Yup from 'yup';
import {pt} from 'yup-locale-pt';

Yup.setLocale(pt);
const {object, string, number} = Yup;

let signInForm = object({
  username: string().min(1).max(250).required().label("Usuário"),
  password: string().required().min(1).max(60).label("Senha"),
});

export default {
  setup() {
    return {
      auth: useAuth(),
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: {},
      loading: false,
      show_password: false
    }
  },
  methods: {
    handleOnClickPasswordIcon() {
      this.show_password = !this.show_password;
    },
    async handleOnLogin() {
      this.loading = true;
      const body = this.form;
      body.username = body.username.trim();
      body.password = body.password.trim();
      let valid = true;
      try {
        await signInForm.validate(body);
      } catch (err) {
        valid = false;
        const errors = {};
        errors[err.path] = err.message;
        this.errors = errors;
      }
      this.loading = false;

      if (valid) {
        try {
          const {user, token} = await $fetch('/api/sign', {
            method: 'post',
            body
          });
          this.auth.setCredentials({user, token});
          navigateTo('/dashboard');
        } catch (err) {
          this.errors['username'] = 'Usuário ou senha inválidos.';
        }
      }
    }
  },
};
</script>
