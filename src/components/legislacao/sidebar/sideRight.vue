<template>
    <div>
        <v-btn v-if="!showBar && listSearchs.length" @click="showBar = true" class="btnHidden" color="black" icon="mdi-chevron-left"></v-btn>
        <div class="sideRight" v-if="showBar && listSearchs.length">
            <h3 class="d-flex justify-space-between align-center"> 
                Buscas
                <v-btn @click="showBar = false" class="btnHidden" color="black" icon="mdi-chevron-right"></v-btn>
            </h3>
            <div class="content">
                <v-card v-for="item, i in listSearchs" :key="i" class="mb-1" hover @click="searchAgain(item)">
                    <v-card-text class="pa-2">
                        {{ item.text }} 
                        <v-icon size="small" color="success" v-if="item.precision" title="precisão">mdi-check</v-icon>
                    </v-card-text>
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
            searchAgain(item){
                const req = true
                generalStore.reqChange(req)
                this.$router.push(`leges?search=${item.text}&years=${item.years}&fonte=${item.fonte}&termo=${item.termo}&precision=${item.precision}`)
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
}
@media (max-width: 700px) {
    .sideRight{
        display: none;
    }
}
</style>