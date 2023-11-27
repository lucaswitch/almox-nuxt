<template>
  <v-app>
    <v-navigation-drawer v-model="preferences.drawer" >
      <v-list nav>
        <v-list-subheader class="my-2">Laboratórios</v-list-subheader>
        <v-list-item
            prepend-icon="mdi-calendar"
            title="Agenda"
            value="agenda"
            rounded="pill"
            router
            to="/dashboard/schedules"
        ></v-list-item>
        <v-list-item
            prepend-icon="mdi-door"
            title="Laboratórios"
            value="todos"
            rounded="pill"
            router
            to="/dashboard/labs"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-subheader class="my-2">MATERIAIS</v-list-subheader>
        <v-list-item
            prepend-icon="mdi-flask-empty"
            title="Estoque de materiais"
            value="todos"
            rounded="pill"
            router
            to="/dashboard/materials"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-subheader class="my-2">PESSOAS</v-list-subheader>
        <v-list-item
            prepend-icon="mdi-account-cog"
            title="Pessoas"
            value="users"
            rounded="pill"
            router
            to="/dashboard/users"
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
    <v-app-bar flat class="border-b" color="primary">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Almox UniCeub&reg;</v-app-bar-title>
      <template v-slot:append>
        <div class="user-details">
          <p class="text-subtitle-1">
            {{ auth.user?.full_name }} ({{ auth.user.role === 0 ? 'Admin' : 'Professor'}})
          </p>
          <v-avatar
              size="36px"
          >
            <v-img alt="Avatar"
                   src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            />
          </v-avatar>
        </div>
      </template>
    </v-app-bar>
    <v-main style="background-color: #f5f5f7;">
      <v-container fluid>
        <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {useAuth} from "~/stores/auth";
import {usePreferences} from "~/stores/preferences";

export default {
  setup() {
    return {
      auth: useAuth(),
      preferences: usePreferences()
    }
  },
  methods: {
    toggleDrawer() {
      this.preferences.toggleDrawer();
    },
    async logout() {
      this.auth.logout();
      await navigateTo('/');
    }
  }
}
</script>

<style scoped>
.user-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}
</style>
