<template>
    <section>
        <div class="sizeLoad" v-if="load">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
        <div class="container" v-else>
            <v-btn variant="tonal" @click="voltar" class="mb-2">Voltar</v-btn>
            <div class="my-5">
                <titleLaw />
                <timeLineBar :listLaw="lawTimeLine" />
                <div class="my-10">
                    <h2>Filtros</h2>
                    <div class="border pa-5">
                    <v-form>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            label="Busca"
                            v-model.trim="search"
                            clearable
                        ></v-text-field>
                        <div class="text-right">
                            <v-btn variant="flat" color="primary">Buscar</v-btn>
                        </div>
                    </v-form>
                    </div>
                </div>
                {{ search }}
                <div v-for="art, i in searchLaw" :key="i">
                    <p v-html="search ? markSearch(art.text) : art.text"></p>
                </div> 
            </div>
        </div>
    </section>
</template>

<script>
     import api from "@/services/api"

     import titleLaw from "../components/legislacao/timeLine/titleLaw"
     import timeLineBar from "../components/legislacao/timeLine/timeLineBar"
     import listLawsChanges from "../components/legislacao/timeLine/listLawsChanges"

    export default {
        components:{
            titleLaw,
            timeLineBar,
            listLawsChanges
        },
        data(){
            return{
                id: this.$route.params.id,
                textLaws: [],
                load: false,
                lawTimeLine:{
                    iDlawMain: '3e138',
                    idsLawsChanges: [
                        '622f4', 'd77b2', '167cf', 
                        '8474b', '88343', 'f60f4', 'dc9a3', 'b73f8', '8acb5', '36a80', 'f2e02', '54d1d', '9defb', 'ead22', '0614b',
                        'd49a1', '20f70', '91dcc', '42cb3', 'b797f', '88f23', 'cf9de', 'f392a', '25551', '8982f', '6f991', 'a5faa', 
                        '3f10c', 'd572b', '704b9', '1ae54', '6f888', '6990c', '00374', '7feee', '4c2fd', '042bc', '5163a', '8cacf', 
                        '668fd', '5c778', '6ba49',
                        '0a1af', 'dd1ee', 'fd1a1', 'e407d', '5481f', '5374e', '444ff', 'c1169', '53368', 'a727d'
                    ],
                    dateCreate: '07/02/2024',
                    dateUpdate: '07/02/2024'
                },
                search: ''
            }
        },
        computed:{
            listPage(){
                let list = this.textLaws.map(x => x._source)
                let list1 = []

                list.forEach(x => {
                    x.text_page = x.text_page.replace(/\n+/g, '<br>');
                    list1.push(x)
                })
                    
                return list1
            },
            joinPages(){
                let list = this.listPage.map(x => x.text_page).join('')
                
                let listArtigos = list.replace(/\bArt\.\s+/g, '#$# Art. ').split('#$#').filter(x => x.startsWith(" Art."));

                return listArtigos
            },
            orgLawArt(){
                let list = this.joinPages
                let listAll = []

                list.forEach(x => {
                    let artigos = {
                        art: parseInt(x.substring(0, 10).replace(/\D/g, '')),
                        text: x
                    }

                    listAll.push(artigos)
                })

                return listAll
            },
            searchLaw(){
                let list = this.orgLawArt

                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    list =  list.filter(item => exp.test(item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))

                } 

                return list
            }
        },
        methods:{
            async getAll(){
                this.load = true
                try {
                    const response = await api.post("pages_v2/_search", {
                        from: 0,
                        size: 5000,
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                    "match": {
                                        "page_to_norma.parent": this.id
                                    }
                                    }
                                ]
                            }
                        }
                    })
                    this.textLaws = response.data.hits.hits
                } catch (error) {
                    console.log("error");
                }finally{
                    this.load = false
                }
            },
            markSearch(item){
                let termoPesquisado = this.search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
                let pattern = new RegExp(termoPesquisado,"gi");

                return item.replace(pattern, match => `<mark>${match}</mark>`);
            },
            voltar(){
                this.$router.push("/leges");
            }
        },
        created(){
            this.getAll()
        }
    }
</script>

<style lang="scss" scoped>
.sizeLoad{
    height: 55vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>