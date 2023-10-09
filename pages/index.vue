<template>
  <v-sheet
      elevation="1"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 text-center mx-auto"
  >
    <v-icon
        class="mb-5"
        icon="mdi-handshake-outline"
        size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">Bem vindo ao Almox&reg;</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Busca tornar a gestão de laboratórios acadêmicos um pouco mais eficiente, com foco especial no controle rigoroso
      das entradas e saídas de materiais. Essa abordagem visa aprimorar a organização e a eficácia no gerenciamento de
      recursos, assegurando que os insumos necessários estejam sempre disponíveis quando necessário, ao mesmo tempo em
      que se evita o desperdício e o extravio de materiais valiosos.
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
          class="text-none"
          rounded
          variant="flat"
          width="90"
          to="/sign-in"
      >
        Entrar
      </v-btn>
    </div>
  </v-sheet>
  <v-timeline align="start">
    <v-timeline-item dot-color="teal-lighten-3">
      <template v-slot:opposite>
        Roadmap de construção
      </template>
      <div>
        <div class="text-h6">Login</div>
        <p>
          Implementar login de usuários "Admin" e Professor.
        </p>
      </div>
    </v-timeline-item>

    <v-timeline-item
        dot-color="teal-lighten-3"
    >
      <div class="text-h6">Materiais</div>
      <p>
        Ainda não totalmente suportado.
      </p>
    </v-timeline-item>
    <v-timeline-item>
      <div class="text-h6">Cadastro de laboratórios</div>
      <p>
        Ainda não totalmente suportado.
      </p>
    </v-timeline-item>
    <v-timeline-item>
      <div class="text-h6">Reserva de laboratórios</div>
      <p>
        Ainda não totalmente suportado.
      </p>
    </v-timeline-item>
    <v-timeline-item>
      <div class="text-h6">Devolução de materiais de reserva</div>
      <p>
        Ainda não totalmente suportado.
      </p>
    </v-timeline-item>
    <v-timeline-item>
      <div class="text-h6">Relatório mensal</div>
      <p>
        Ainda não totalmente suportado.
      </p>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
definePageMeta({
  layout: "default",
});
</script>
