import { defineStore } from "pinia";

export const useGeneralStore = defineStore("General", {
    state: () => ({
        listSearch: [],
        req: false,
        search: {}
    }),
    getters: {
        readListStore(){
            return this.listSearch
        },
        readReq(){
            return this.req
        },
        readSearch(){
            return this.search
        }
    },
    actions:{
        addListSearch(item){
            let search = {
                text: item.text,
                years: item.years,
                fonte: item.fonte,
                termo: item.termo,
                precision: item.precision
            }
            this.listSearch.unshift(search)
        },
        reqChange(item, i){
            this.req = item
            this.search = this.listSearch[i]
        },
        removeListSearch(item){
            this.listSearch.splice(item, 1)
        },
        removeAll(){
            this.listSearch = []
        }
    }
})