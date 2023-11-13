<template>
  <v-navigation-drawer permanent border="0" width="360">
    <v-list nav>

      <p>
        {{ auth.user?.full_name }}
        {{ auth.user?.email }}
      </p>
      <v-list-subheader class="my-2">PRINCIPAL</v-list-subheader>
      <v-list-item
          prepend-icon="mdi-home"
          title="Início"
          value="inicio"
          rounded="pill"
          router
          to="/inicio"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-calendar"
          title="Agenda"
          value="agenda"
          rounded="pill"
          router
          to="/agenda"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-subheader class="my-2">MATERIAIS</v-list-subheader>
      <v-list-item
          prepend-icon="mdi-flask-empty"
          title="Todos"
          value="todos"
          rounded="pill"
          router
          to="/materiais"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-flask-empty-minus"
          title="Devolver"
          value="devolver"
          rounded="pill"
          router
          to="/materiais/devolver"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-subheader class="my-2">FORMULÁRIOS</v-list-subheader>

      <v-list-item
          prepend-icon="mdi-pencil"
          title="Relatório"
          value="relatorio"
          rounded="pill"
          router
          to="/relatorio"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-subheader class="my-2">PESSOAS</v-list-subheader>
      <v-list-item
          prepend-icon="mdi-account"
          title="Professores"
          value="professores"
          rounded="pill"
          router
          to="/professores"
      ></v-list-item>
      <v-list-item
          prepend-icon="mdi-account-cog"
          title="Administradores"
          value="administradores"
          rounded="pill"
          router
          to="/administradores"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list-subheader class="my-2">&nbsp;&nbsp;&nbsp;&nbsp; AÇÕES</v-list-subheader>
    <v-list-item
        prepend-icon="mdi-exit-to-app"
        title="Sair"
        rounded="pill"
        @click="logout"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {useAuth} from "#imports";

export default {
  setup() {
    return {
      auth: useAuth()
    }
  },
  methods: {
    logout() {
      this.auth.logout();
      navigateTo('/');
    }
  }
}

</script>
