export const nomeFonte = {
    data(){
        return{
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
            periodo:[
                1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                2020, 2021, 2022, 2023
            ],
        }
    },
    methods: {
        fonteNome(item){
            const tipo = this.tipos.find(x => x.nome == item)
            return tipo
        }
    },
}