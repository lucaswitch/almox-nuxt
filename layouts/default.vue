<template>
  <v-layout style="background-color: #f5f5f7;">
    <v-app-bar
        color="primary"
        density="compact"
    >
      <template v-slot:prepend>
      </template>
      <v-app-bar-title>Almox&reg;</v-app-bar-title>
      <template v-slot:append>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
</script>
