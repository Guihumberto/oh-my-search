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
                        placeholder="Digite um ou mais termos ou frase exata"
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
                        <v-tooltip text="Limita a quantidade do resultado para os mais relevantes">
                            <template v-slot:activator="{ props }">
                                <v-checkbox 
                                    v-bind="props"
                                    class="checkboxx"
                                    label="Aumentar a precisão" color="red-darken-3" 
                                    v-model="search.precision"
                                ></v-checkbox>
                            </template>
                        </v-tooltip>
                    </div>
                    <div class="autocompletes">
                        <v-autocomplete
                            clearable
                            chips
                            label="Fonte da norma"
                            :items="tipos"
                            item-value="nome"
                            item-title="mudar"
                            multiple
                            variant="outlined"
                            v-model="search.fonte"
                            closable-chips
                            placeholder="Todas as fontes"
                        ></v-autocomplete>
                        <v-autocomplete
                            clearable
                            chips
                            label="Período"
                            :items="periodo.sort().reverse()"
                            multiple
                            variant="outlined"
                            v-model="search.years"
                            closable-chips
                            placeholder="Todo o período"
                        ></v-autocomplete>
                    </div>
                    <v-btn flat block type="submit" color="indigo">Buscar</v-btn>
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
                                    title="limpa os resultados da busca"
                                    class="ml-1"
                                >Limpar</v-btn>
                        </div>
                        <div class="btns2 pa-2">
                            <v-tooltip text="altera a forma de visualização">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        variant="outlined"
                                        color="grey"
                                        size="small"
                                        class="mr-2"
                                        @click="viewsAggs = !viewsAggs"
                                        title="Mudar visualização"
                                    ><v-icon>{{viewsAggs ?'mdi-file-document-multiple-outline':'mdi-file'}}</v-icon> </v-btn>
                                </template>
                            </v-tooltip>                                
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
                                        <v-tooltip text="inserir página">
                                            <template v-slot:activator="{ props }">
                                                <v-btn 
                                                    :color="docExiste(res._id)?'red':'grey'" variant="plain" 
                                                    :icon="docExiste(res._id)?'mdi-delete':'mdi-file-plus'" 
                                                    :title="docExiste(res._id)?'excluir página': 'adicionar página'"
                                                    @click="inserirDoc(res)"
                                                ></v-btn>
                                            </template>
                                        </v-tooltip>
                                    </div>
                                    <div>
                                        <p>{{res._source.page_to_norma.title}}</p>
                                        <small>Pág: {{ res._source.num_page }} | {{ res._source.tipo }} | {{ res._source.ano }}</small>
                                    </div>
                                </div>   
                                <div class="btns">
                                    <page :page="res._source" :searchP="search.text" />
                                    <v-btn title="ver todo o documento" variant="tonal" size="small" color="red" @click="openLaw(res)">PDF</v-btn>
                                </div>
                            </div>
                            <v-pagination 
                                v-if="totalDocs > pagination.qtd"
                                density="compact"
                                class="my-5" 
                                :total-visible="3"
                                :length="Math.ceil(totalDocs/pagination.qtd)"
                                v-model="pagination.page"
                                @click="pagination.inicio=pagination.page*pagination.qtd-pagination.qtd, searchEnv(3)"
                            ></v-pagination>
                        </div>
                    </div>
                    <v-alert variant="tonal" type="warning" v-else>
                        <p>Não foram encontrados resultados para sua busca</p>
                    </v-alert>
                </div>
            </div>
            <div class="spaceFooter my-16 py-16"></div>
            <v-snackbar
                v-model="snack.snackbar"
                :timeout="snack.timeout"
            >
            {{ snack.text }}
                <template v-slot:actions>
                    <v-btn
                    color="blue"
                    variant="text"
                    @click="snack.snackbar = false"
                    >
                    X
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </section>
</template>

<script>
    import api from "@/services/api"

    import page from "@/components/legislacao/dialogs/page"
    import allPages from "@/components/legislacao/dialogs/allPages"
    import docs from "@/components/legislacao/dialogs/document"
    import aggs from "@/components/legislacao/buscas/searchAggs"

    import { nomeFonte } from '@/mixins/mixin'

    import { useGeneralStore } from '@/store/GeneralStore'
    const generalStore = useGeneralStore()  

    export default {
        mixins:[nomeFonte],
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
                    qtd: 20,
                    page: 1
                },
                totalDocs: 0,
                snack: {
                    snackbar: false,
                    text: 'Nova página adicionada ao documento.',
                    timeout: 2000
                }
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
                    this.salvaNoBanco()
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
                    this.snack.text = "Página Removida."
                    this.snack.snackbar = true
                }else {
                    this.document.push(item)
                    this.snack.text = 'Nova página adicionada ao documento.',
                    this.snack.snackbar = true
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
                let reqSearch = generalStore.readSearch
                this.search = { ...reqSearch}
                this.searchEnv(2)
                generalStore.reqChange(false)
                console.log("ta pegando");
            },
            openLaw(item){
                let link = item._source.page_to_norma.parent
                window.open(`text/${link}`, '_blank');
            },
            async salvaNoBanco(){
                try {
                    const response = await api.post("searchs_todo/_doc", {
                        "text_search": this.search.text,
                        "years": this.search.years,
                        "sources": this.search.fonte,
                        "precision": this.search.precision,
                        "termos":  this.search.termo
                    })
                    console.log(response);
                } catch (error) {
                    console.log("error");
                }
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