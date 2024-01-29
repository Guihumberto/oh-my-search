<template>
    <section>
        <div class="container">
            <div class="d-flex justify-space-between">
                <div>
                    Home
                </div>
                <div class="d-flex align-center">
                    <router-link to="/leges" class="linkTO">Busca por termo</router-link>
                    <help :idHelp="2" class="ml-2" />
                </div>
               
            </div>
            <div v-if="load" class="load">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
            </div>
            <div class="legislacao" v-else>
                <small>Busca da lei por ano, fonte ou texto</small>
                <h2 class="font-weight-bold">Legislação</h2>
                <div class="my-5">
                    <v-text-field
                        label="Buscar"
                        placeholder="Digite o nome ou número da norma"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-magnify"
                        v-model.trim="search.text"
                        :rules="[rules.required, rules.minname]"
                        clearable
                    ></v-text-field>
                    <div class="autocompletes">
                        <v-autocomplete
                            clearable
                            chips
                            label="Fonte"
                            density="compact"
                            :items="fontes"
                            item-value="nome"
                            item-title="mudar"
                            multiple
                            variant="outlined"
                            v-model="search.fonte"
                            closable-chips
                            prepend-inner-icon="mdi-alpha-f-box"
                        ></v-autocomplete>
                        <v-autocomplete
                            prepend-inner-icon="mdi-calendar"
                            clearable
                            chips
                            label="Período"
                            density="compact"
                            :items="periodo"
                            multiple
                            variant="outlined"
                            v-model="search.years"
                            closable-chips
                        ></v-autocomplete>
                    </div>
                </div>
                Total de normas: {{ qtdLaws }} <br>
                <v-expansion-panels>
                    <v-expansion-panel
                    v-for="tipo, t in orgLaws.sort(orderTipo)" :key="t"
                    >
                    <v-expansion-panel-title 
                        expand-icon="mdi-plus" collapse-icon="mdi-minus">
                        {{ nomeTipo(tipo.tipo) }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-expansion-panels variant="popout">
                            <v-expansion-panel
                                v-for="ano, a in tipo.subcategorias.sort(order)" :key="a" >
                                <v-expansion-panel-title>{{ ano.ano }} </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <div class="even-columns">
                                        <div   v-for="law, l in ano.norma.sort(orderName)" :key="l">
                                            <a class="openLaw" :href="`text/${law.id}`" target="_blank">{{ law.title }}</a>
                                        </div>
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
        
                    </v-expansion-panel-text>
        
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
    </section>
</template>

<script>
    import api from "@/services/api"
    import { useGeneralStore } from '@/store/GeneralStore'
    const generalStore = useGeneralStore()  

    import help from "./dialogs/help.vue"
    
    export default {
        components:{
            help
        },
        data(){
            return{ 
                allLaw: [],
                qtdLaws: 0,
                search:{
                    text: '',
                    years: [],
                    fonte: []
                },
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
                },
                load: false,
                reverse: false
            }
        },
        props:{
            laws: Array
        },
        computed:{
            orgLaws(){
                let list = this.allLaw.map(x => x._source)

                if(this.search.text){
                    let search = this.search.text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    list =  list.filter(item => exp.test(item.title.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) )

                }

                if(this.search.years.length){
                    list = list.filter(x => this.search.years.includes(x.ano))
                }

                if(this.search.fonte.length){
                    list = list.filter(x => this.search.fonte.includes(x.tipo))
                }

                const classificacao = list.reduce((acumulador, item) => {
                // Verifica se a categoria já existe no acumulador
                const categoriaExistente = acumulador.find(c => c.tipo === item.tipo);

                if (categoriaExistente) {
                    // Se a categoria já existe, verifica se a subcategoria já existe
                    const subcategoriaExistente = categoriaExistente.subcategorias.find(s => s.ano === item.ano);

                    if (subcategoriaExistente) {
                        // Se a subcategoria já existe, adicione o valor
                        subcategoriaExistente.norma.push({id: item.id, page: item.total_pages, title: item.title, path: item.path, revogado: item.revogado});
                    } else {
                        // Se a subcategoria não existe, crie uma nova subcategoria
                        categoriaExistente.subcategorias.push({
                            ano: item.ano,
                            norma: [{id: item.id, page: item.total_pages, title: item.title, path: item.path, revogado: item.revogado}],
                        });
                    }
                } else {
                    // Se a categoria não existe, crie uma nova categoria com a subcategoria
                    acumulador.push({
                        tipo: item.tipo,
                        subcategorias: [{
                            ano: item.ano,
                            norma: [{id: item.id, page: item.total_pages, title: item.title, path: item.path, revogado: item.revogado}],
                        }],
                    });
                }

                return acumulador;
                }, []);

                return classificacao
            },
            periodo(){
                return generalStore.readPeriodo
            },
            fontes(){
                const list = generalStore.readTipos
                return list
            }
        },
        methods:{
            async getAll(){
                try {
                    this.load = true
                    const response = await api.post("laws_v2/_search", {
                    from: 0,
                    size: 5000
                })
                this.allLaw = response.data.hits.hits
                this.qtdLaws = response.data.hits.total.value
                } catch (error) {
                    console.log("error");
                }finally{
                    this.load = false
                }
            },
            nomeTipo(item){
                let nome = generalStore.fonteNome(item)
                return nome.mudar
            },
            order(a, b){
                return this.reverse
                    ? a.ano -  b.ano
                    : b.ano -  a.ano
            },
            orderName(a, b){
                return this.reverse
                    ? a.title -  b.title
                    : b.title -  a.title
            },
            orderTipo(a, b){
                return this.reverse
                    ? a.tipo -  b.tipo
                    : b.tipo -  a.tipo
            },
        },
        created(){
            this.getAll()
        }
    }
</script>

<style lang="scss" scoped>
.load{
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.oneresult{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.even-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.openLaw{
    color: grey;
    text-decoration: none;
    transition: .5s;
}
.openLaw:hover{
    color: black;
    font-weight: 600;
}
.openLaw::before{
    content: "- ";
}
.radios, .autocompletes{
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
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
    .even-columns {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>