<template>
    <div>
        <v-btn variant="text" v-if="!showBar && listSearchs.length" @click="showBar = true" class="btnHidden ma-1" color="black" icon="mdi-chevron-left"></v-btn>
        <div class="sideRight" v-if="showBar && listSearchs.length">
            <h3 class="d-flex justify-space-between align-center"> 
                Buscas
                <v-btn variant="text"  @click="showBar = false" class="btnHidden mb-2" color="black" icon="mdi-chevron-right"></v-btn>
            </h3>
            <div class="content">
                <v-btn class="texr-center pa-0 ma-0" size="small" v-if="listSearchs.length > 1" @click="removeAll()" color="red" variant="text">Apagar tudo</v-btn>
                <v-card 
                    elevation="0" 
                    v-for="item, i in listSearchs" :key="i" 
                    class="mb-1" hover 
                    @click="searchAgain(item, i)">
                    <v-card-text class="pa-2 d-flex align-center justify-space-between">
                        <div>
                            {{ item.text }} 
                            <v-icon size="small" color="success" v-if="item.precision" title="precisão">mdi-check</v-icon>
                        </div>
                        <v-icon @click.stop="removeSearch(i)" class="pa-0 ma-0" color="red">mdi-delete</v-icon>
                    </v-card-text>
                    <v-tooltip
                        activator="parent"
                        location="start"
                    >
                    Texto: {{item.text}} <br>
                    <div v-if="item.termo" v-text="item.termo == 1 ? 'Termo: Frase Exata':'Termo: Qualquer palavra'"></div>
                    <v-chip-group>
                        <v-chip v-if="item.years.length" v-for="ano, a in item.years" :key="a">{{ano}}</v-chip>
                    </v-chip-group>
                    <v-chip-group>
                        <v-chip v-if="item.fonte.length" v-for="fonte, f in item.fonte" :key="f">{{fonte}}</v-chip>
                    </v-chip-group>
                    <div v-if="item.precision">com precisão</div>
                </v-tooltip>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script>
    import { useGeneralStore } from '@/store/GeneralStore'
    const generalStore = useGeneralStore()

    export default{
        data(){
            return{
                showBar: true
            }
        },
        computed:{
            listSearchs(){
                return generalStore.readListStore
            }
        },
        methods:{
            searchAgain(item, i){
                const req = true
                generalStore.reqChange(req, i)
                this.$router.push(`leges?search=${item.text}&years=${item.years}&fonte=${item.fonte}&termo=${item.termo}&precision=${item.precision}`)
            },
            removeSearch(item){
                generalStore.removeListSearch(item)
            },
            removeAll(){
                generalStore.removeAll()
            }
        }
    }
</script>
<style scoped>
.sideRight{
    position: sticky;
    top: 0;
    width: 200px;
    height: 100vh;
    background: rgb(235, 233, 233);
    padding: .5rem;
    animation: slideLeft 1s ease;
}
@keyframes slideLeft {
    0%{
        transform: translateX(300px);
    }
    100%{
        transform: translateX(0);
    }
}
@media (max-width: 700px) {
    .sideRight{
        display: none;
    }
    .btnHidden{
        display: none;
    }
}
</style>