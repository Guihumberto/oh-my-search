<template>
  <section class="search" :class="isSearch ? 'activeSearch' : 'flagmaranhao'">
    <div class="container" :class="searchActive ? 'active' : ''">
      <v-text-field
        label="Busca"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        style="max-width: 500px;"
        color="blue"
        v-model:focused="search"
        base-color="blue"
        bg-color="#96D2FF"
        clearable
        @click.prevent="searchOnChanged()"
      ></v-text-field>
    </div>
  </section>
</template>

<script>
  import { useGeneralStore } from '@/store/GeralStore'
  const generalStore = useGeneralStore()

  export default {
    data(){
      return{
        search: '',
        searchActive: false
      }
    },
    computed:{
      isSearch(){
        return generalStore.readSearch
      }
    },
    methods:{
      searchOnChanged(){
        console.log('ioioduosad')
        this.searchActive = !this.searchActive
      }
    }
  }
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  transition: .5s ease;
}
.container.active{
  min-height: 70vh;
  align-items: baseline;
}
.flagmaranhao{
  background: var(--primary-color);
}
</style>
