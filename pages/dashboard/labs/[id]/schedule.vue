<template>
  <h6 class="text-h6">
    Laboratórios

  </h6>
  <v-card class="mt-2 pb-3" max-width="644">
    <v-card-title>
      Agendar laboratório
    </v-card-title>
    <v-card-subtitle>

    </v-card-subtitle>
    <div class="mt-4">
      <schedule-form/>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {useAuth} from "~/stores/auth.js";
import ScheduleForm from "~/components/forms/schedule-form.vue";

definePageMeta({
  layout: "dashboard",
});

const auth = useAuth();
</script>
