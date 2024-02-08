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
                <timeLineBar class="mt-10" />
                <listLawsChanges />
                <div v-html="joinPages"></div> 
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
                    idsLawsChanges: ['622f4', 'd77b2', '167cf', '8474b'],
                    dateCreate: '07/02/2024',
                    dateUpdate: '07/02/2024'
                }
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