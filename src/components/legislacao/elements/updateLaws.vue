<template>
     <section>
        <div class="container">
            <div v-if="load" class="load">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
            </div>
            <v-card
                class="mx-auto"
                variant="outlined"
                color="grey"
                v-else
            >
                <v-toolbar color="#050451">

                    <v-toolbar-title>Adicionados recentemente</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn variant="text" icon="mdi-magnify"></v-btn>
                </v-toolbar>

                <v-list
                    lines="two"
                    class="pa-0"
                >
                  <v-list-item 
                    link 
                    v-for="item, i in allLaw" :key="i"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="grey-lighten-1">
                        <v-icon color="white">mdi-file</v-icon>
                      </v-avatar>
                    </template>
                    <v-list-item-title>
                      {{ item._source.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item._source.data_include }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                      <a class="openLaw" :href="`text/${item._source.id}`" target="_blank"><v-icon color="primary" class="border">mdi-arrow-right</v-icon></a>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <v-btn disabled block variant="text" color="primary">Ver mais</v-btn>
                  </v-list-item>
                </v-list>
            </v-card>
        </div>
    </section>
</template>

<script>
  import api from "@/services/api"
  export default {
    data: () => ({
      load: false,
      allLaw: [],
      qtdLaws: 0,
    }),
    methods:{
      async getAll(){
                try {
                    this.load = true
                    const response = await api.post("laws_v2/_search", {
                    query:{
                      exists: {
                        field: "data_include"
                      }
                    }
                })
                this.allLaw = response.data.hits.hits
                this.qtdLaws = response.data.hits.total.value
                } catch (error) {
                    console.log("error");
                }finally{
                    this.load = false
                }
            },
    },
    created(){
            this.getAll()
    }
  }
</script>

<style scoped>
.load{
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>