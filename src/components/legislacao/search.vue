<template>
    <section>
        <div class="container">
            <div class="d-flex justify-space-between">
                <div>{{ reqRead }}</div> 
                <router-link class="linkTO" to="/legesporlei">Busca por lei</router-link>
            </div>
            <small>Busca por termos, frases, fonte, periodo e mais</small>
            <h2 class="spaceh2">Busca na legislação</h2>
            <div class="content">
                <v-form @submit.prevent="searchEnv(1)" ref="form">
                    <v-text-field
                        clearable
                        label="Busca"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        v-model.trim="search.text"
                        :rules="[rules.required, rules.minname]"
                    ></v-text-field>
                    <div class="radios">
                        <v-radio-group inline color="indigo" v-model="search.termo">
                            <v-radio 
                                v-for="item, i in termos" :key="i" 
                                :label="item.name" :value="item.id">
                            </v-radio>
                        </v-radio-group>
                        <v-checkbox 
                            class="checkboxx"
                            label="Aumentar a precisão" color="red-darken-3" 
                            v-model="search.precision"
                        ></v-checkbox>
                    </div>
                    <div class="autocompletes">
                        <v-autocomplete
                            clearable
                            chips
                            label="Fonte"
                            :items="tipos"
                            multiple
                            variant="outlined"
                            v-model="search.fonte"
                            closable-chips
                        ></v-autocomplete>
                        <v-autocomplete
                            clearable
                            chips
                            label="Período"
                            :items="periodo"
                            multiple
                            variant="outlined"
                            v-model="search.years"
                            closable-chips
                        ></v-autocomplete>
                    </div>
                    <v-btn block type="submit" color="indigo">Buscar</v-btn>
                </v-form>
            </div>
            <div v-if="document.length" class="py-5 text-center">
                <docs :docs="document" />
                <v-btn color="error" variant="text" @click="document=[]">
                    <v-icon>mdi-delete</v-icon> Excluir</v-btn>
            </div>
            <div class="resultsSearch" id="results" v-if="searchOn">
                <h2 class="my-3">Resultados</h2>
                <div class="text-center" v-if="load">
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </div>
                <div v-else>
                    <div class="border my-5 px-2 d-flex justify-space-between align-center"  v-if="resultsSearch.length"> 
                        <div class="d-flex justify-center align-center">
                            <p class="py-5">Total de registros: {{ this.totalDocs }}</p>
                            <v-btn 
                                    v-if="resultsSearch.length" 
                                    @click="resultsSearch = [], searchOn = false" 
                                    variant="text" size="small" color="primary"
                                >Limpar</v-btn>
                        </div>
                        <div class="btns2 pa-2">
                            <v-btn
                                variant="outlined"
                                size="small"
                                class="mr-2"
                                @click="viewsAggs = !viewsAggs"
                                title="Mudar visualização"
                            ><v-icon>{{viewsAggs ?'mdi-file-document-multiple-outline':'mdi-file'}}</v-icon> </v-btn>
                          
                        </div>
                    </div>
                    <div v-if="resultsSearch.length">
                        <aggs :searchResults="resultsSearch" v-if="viewsAggs"/>
                        <div class="pa-3" v-else>
                            <div 
                                v-for="res, r in resultsSearch" :key="r"
                                class="py-3 oneresult"    
                            >
                                <div class="titles d-flex">
                                    <div>
                                        <v-btn 
                                            color="grey" variant="plain" 
                                            :icon=" docExiste(res._id)?'mdi-delete':'mdi-content-copy'" title="copiar"
                                            @click="inserirDoc(res)"
                                        ></v-btn>
                                    </div>
                                    <div>
                                        <p>{{res._source.page_to_norma.title}}</p>
                                        <small>Pág: {{ res._source.num_page }} | {{ res._source.tipo }} | {{ res._source.ano }}</small>
                                    </div>
                                </div>   
                                <div class="btns">
                                    <page :page="res._source" :searchP="search.text" />
                                    <v-btn size="small" color="red" @click="openLaw(res)">PDF</v-btn>
                                </div>
                            </div>
                            <v-pagination 
                                density="compact"
                                class="my-5" 
                                :total-visible="3"
                                :length="Math.ceil(totalDocs/pagination.qtd)"
                                v-model="pagination.page"
                                @click="pagination.inicio=pagination.page*10-10, searchEnv(3)"
                            ></v-pagination>
                        </div>
                    </div>
                    <v-alert variant="tonal" type="warning" v-else>
                        <p>Não foram encontrados resultados para sua busca</p>
                    </v-alert>
                </div>
            </div>
            <div class="spaceFooter my-16 py-16"></div>
        </div>
    </section>
</template>

<script>
    import api from "@/services/api"

    import page from "@/components/legislacao/dialogs/page"
    import allPages from "@/components/legislacao/dialogs/allPages"
    import docs from "@/components/legislacao/dialogs/document"
    import aggs from "@/components/legislacao/buscas/searchAggs"

    import { useGeneralStore } from '@/store/GeneralStore'
    const generalStore = useGeneralStore()  

    export default {
        components:{
            page,
            allPages,
            docs,
            aggs
        },
        data(){
            return{
                search:{
                    text: '',
                    years: [],
                    fonte: [],
                    termo: 2,
                    precision: false
                },
                searchOn: false,
                periodo:[
                    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                    2020, 2021, 2022, 2023
                ],
                tipos:[
                    "resolucoes", "portarias", "consultas", "leis-estaduais", "medidas-provisorias", "leis-federais",
                    "editais", "portarias-conjuntas", "orientacao-tributaria", "beneficios", "instrucoes-normativas",
                    "ato-declaratorio-interpretativo", "atos-declaratorios", "convenios", "decretos", "anexos-ricms", 
                    "resolucoes", "ricms", "beneficios-fiscais"
                ],
                termos:[
                    {id:2, name: "Qualquer palavra"},
                    {id:1, name: "Frase Exata"}
                ],
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
                },
                laws: [],
                resultsSearch: [],
                load: false,
                document: [],
                viewsAggs: false,
                pagination:{
                    inicio: 0,
                    qtd: 10,
                    page: 1
                },
                totalDocs: 0
            }
        },
        computed:{
            reqRead(){
                let reqq = generalStore.readReq
                if(reqq){
                    this.recActive()
                }
                return "Home"
            }
        },
        methods:{
            async searchEnv(envSolici=1){
                this.$router.push(`leges?search=${this.search.text}&years=${this.search.years}&fonte=${this.search.fonte}&termo=${this.search.termo}&precision=${this.search.precision}`)
                const { valid } = await this.$refs.form.validate()
                if(valid){
                    if(envSolici==1) generalStore.addListSearch(this.search)
                    this.resultsSearch = []
                    this.searchOn = true
                    this.load = true
                    if(envSolici == 1){
                        this.pagination.page = 1
                        this.pagination.inicio = 0
                    } 
                    try {
                        if(this.search.years.length && this.search.fonte.length && !this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && !this.search.fonte.length && !this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(!this.search.years.length && this.search.fonte.length && !this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && this.search.fonte.length && this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && !this.search.fonte.length && this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(!this.search.years.length && this.search.fonte.length && this.search.precision && this.search.termo == 2){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && this.search.fonte.length && !this.search.precision && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && !this.search.fonte.length && !this.search.precision && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(!this.search.years.length && this.search.fonte.length && !this.search.precision && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    "text_page": this.search.text
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && this.search.fonte.length && this.search.precision  && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.years.length && !this.search.fonte.length && this.search.precision  && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "ano": this.search.years
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(!this.search.years.length && this.search.fonte.length && this.search.precision  && this.search.termo == 1){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    "bool": {
                                        "must": [
                                            {
                                                "match_phrase": {
                                                    text_page: {query: this.search.text, operator: "and"}
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "tipo": this.search.fonte
                                                }
                                            }
                                        ]
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.termo == 2 && !this.search.precision) {
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    match: {
                                        text_page: this.search.text
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.termo == 2 && this.search.precision){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    match: {
                                        text_page: {query: this.search.text, operator: "and"}
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.termo == 1 && this.search.precision){
                            const response = await api.post("pages_v2/_search", {
                                from: this.pagination.inicio,
                                size: this.pagination.qtd,
                                query: {
                                    match_phrase: {
                                        text_page:{
                                            query: this.search.text
                                        }
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else if(this.search.termo == 1 && !this.search.precision){
                            const response = await api.post("pages_v2/_search", {
                                query: {
                                    match_phrase: {
                                        text_page:{
                                            query: this.search.text,
                                            slop: 1
                                        }
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        } else {
                            const response = await api.post("pages_v2/_search", {
                                from: 0,
                                size: 100,
                                query: {
                                    match_phrase: {
                                        text_page:{
                                            query: this.search.text
                                        }
                                    }
                                }
                            })
                            this.resultsSearch = response.data.hits.hits;
                            this.totalDocs = response.data.hits.total.value;
                        }
                    } catch (error) {
                        console.log("erro");
                    }finally{
                        this.load = false
                        const element = document.getElementById('results')
                        element.scrollIntoView({behavior: "smooth"})
                    }
                   
                }
            },
            async getAll(){
                const response = await api.post("laws_v2/_search", {
                    "aggs": {
                        "by_tipys": {
                        "terms": {
                            "field": "tipo",
                            "size": 100
                        }
                        }
                    }
                })
                this.laws = response.data.aggregations.by_tipys.buckets;
            },
            inserirDoc(item){
                const res = this.docExiste(item._id)
                if(res){
                    this.document = this.document.filter(x => x._id != res)
                }else {
                    this.document.push(item)
                }
            },
            docExiste(item){
                let ids = this.document.map(x => x._id)
                let find = ids.find(x => x == item)
                return !!find
                ? find
                : false
            },
            recActive(){     
                this.search = {
                    text: this.$route.query.search,
                    years: [],
                    fonte: [],
                    termo: 2,
                    precision: false
                }
                this.searchEnv(2)
                generalStore.reqChange(false)
            },
            openLaw(item){
                let link = item._source.page_to_norma.parent
                window.open(`text/${link}`, '_blank');
            }
        },
        created(){
            // this.getAll()
        }
    }
</script>

<style  scoped>
.container{
    min-height: 60vh;
}
.radios, .autocompletes{
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
}
.checkboxx{
    display: flex;
    justify-content: end;
    align-items: self-start;
}
.oneresult{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.oneresult .btns{
    display: flex;
    gap: .5rem;
}
.title{
    font-size: 1.3rem;
}
.subtitle{
    font-size: .9rem;
}
.linkTO{
    padding: .5rem;
    font-weight: 500;
    color: rgb(160, 195, 107);
    transition: .5s;
}
.linkTO:hover{
    color: rgb(120, 144, 83);
    background: rgb(227, 235, 216);
}
.spaceFooter{
    display: none;
}

@media (max-width: 500px) {
    .radios{
        flex-direction: column;
        align-items: baseline;
        gap: 0;
    }
    .autocompletes{
        flex-direction: column;
        gap: 0;
    }
    .btns2{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }
    .oneresult{
        flex-direction: column;
        align-items: baseline;
        gap: .8rem;
        border-bottom: 1px solid grey;
    }
    .oneresult .btns{
        align-items: center;
        justify-content: end;
        width: 100%;
        
    }
    .spaceFooter{
        display: block;
    }
}
</style>