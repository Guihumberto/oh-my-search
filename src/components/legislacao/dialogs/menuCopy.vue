<template>
  <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="grey"
          v-bind="props"
          variant="text"
          icon="mdi-content-copy"
          title="compartilhar"
        >
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="copyLink()"
        >
          <v-list-item-title>{{ item.title }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Copiar Link' },
        { title: 'Enviar' }
      ],
    }),
    props:{
      page: String
    },
    methods:{
      copyLink(){
        const text =`https://search-sefaz.netlify.app/textpage/${this.page}`
        navigator.clipboard.writeText(text);
      } 
    }
  }
</script>

<style lang="scss" scoped>

</style>