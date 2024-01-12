import { defineStore } from "pinia";

export const useGeneralStore = defineStore("General", {
    state: () => ({
        listSearch: [],
        req: false
    }),
    getters: {
        readListStore(){
            return this.listSearch
        },
        readReq(){
            return this.req
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
        reqChange(item){
            this.req = item
        },
        removeListSearch(item){
            this.listSearch.splice(item, 1)
        }
    }
})