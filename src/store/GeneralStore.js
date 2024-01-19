import { defineStore } from "pinia";

export const useGeneralStore = defineStore("General", {
    state: () => ({
        listSearch: [],
        req: false,
        search: {},
        periodo:[
            2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 
            2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 
            2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 
            1988, 1987, 1986, 1985, 1984
        ]
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
        },
        readPeriodo(){
            return this.periodo
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