<template>
    <div class="text-center">
      <v-btn
        color="primary"
        variant="outlined"
      >
      Documento Criado ({{ docs.length }})
        <v-dialog
          v-model="dialog"
          activator="parent"
          max-width="1080"
        >
          <v-card>
            <v-card-text>
                <div class="border pa-5 mt-2" v-for="item, i in docs" :key="i">
                <div class="border-b">
                    {{ item._source.ano }} |  {{ item._source.tipo }}  |  {{ item._source.page_to_norma.title }} | pág:  {{ item._source.num_page }}
                </div>
                  <p 
                      class="formatText" 
                      v-html="textPage(item._source.text_page)"
                  ></p>
                </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </template>

<script>
    export default {
        data(){
            return{
                dialog: false,
            }
        },
        props:{
            docs: Array
        },
        methods:{
            textPage(item){
                let text = item
                text = text.replace(/\n+/g, '<br>');
                return text
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>