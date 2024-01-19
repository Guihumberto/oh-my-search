<template>
    <div class="text-center">
      <v-btn
        color="primary"
        variant="text"
      >
      <v-icon size="30">mdi-help-circle-outline</v-icon>
        <v-dialog
          v-model="dialog"
          activator="parent"
          width="auto"
        >
          <v-card title="Ajuda">
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>