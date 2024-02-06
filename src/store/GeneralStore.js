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
        ],
        noShowNews: true,
        tipos:[
            {nome:"anexos-ricms", mudar: "Anexos RICMS", sigla:"Anexos"}, 
            {nome:"ato-declaratorio-interpretativo", mudar: "Ato Declaratório Interpretativo", sigla:"ADI"}, 
            {nome:"atos-declaratorios", mudar: "Atos Declaratórios", sigla:"ADT"}, 
            {nome:"beneficios", mudar: "Benefícios", sigla:"BNF"}, 
            {nome:"beneficios-fiscais", mudar: "Benefícios Fiscais", sigla:"Ben"},
            {nome:"consultas", mudar: "Consultas", sigla:"CST"}, 
            {nome:"convenios", mudar: "Convênios", sigla:"CNV"}, 
            {nome:"decretos", mudar: "Decretos", sigla:"DCT"}, 
            {nome:"editais", mudar: "Editais", sigla:"EDT"}, 
            {nome:"instrucoes-normativas", mudar: "Instruções Normativas", sigla:"IN"},
            {nome:"leis-estaduais", mudar: "Leis Estaduais", sigla:"LE"}, 
            {nome:"leis-federais", mudar: "Leis Federais", sigla:"LF"},
            {nome:"medidas-provisorias", mudar: "Medidas Provisórias", sigla:"MP"}, 
            {nome:"orientacao-tributaria", mudar: "Orientação Tributária", sigla:"OT"}, 
            {nome:"portarias-conjuntas", mudar: "Portarias Conjuntas", sigla:"PC"}, 
            {nome:"portarias", mudar: "Portarias", sigla:"PORT"}, 
            {nome:"resolucoes", mudar: "Resoluções", sigla:"RES"},               
            {nome:"ricms", mudar: "RICMS", sigla:"RICMS"}         
        ],
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
        },
        readTipos(){
            return this.tipos
        },
        readShowNews(){
            return this.noShowNews
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
        },
        fonteNome(item){
            const tipo = this.tipos.find(x => x.nome == item)
            return tipo
        },
        changeShowsNews(item){
            this.noShowNews = item
        }
    }
})