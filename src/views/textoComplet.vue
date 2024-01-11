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
            <div class="border pa-5 mb-2" v-for="item, i in listPage" :key="i">
                <p class="font-weight-bold">{{ item.page_to_norma.title }} | Página: {{ item.num_page }} | {{ item.ano }}</p>
                <p v-html="item.text_page"></p> 
            </div>
        </div>
    </section>
</template>

<script>
     import api from "@/services/api"

    export default {
        data(){
            return{
                id: this.$route.params.id,
                textLaws: [],
                load: false
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