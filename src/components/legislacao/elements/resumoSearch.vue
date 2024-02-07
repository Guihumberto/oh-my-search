<template>
    <div class="pl-10 py-5 border-b">
        <p class="font-weight-light" v-html="extrairLinha">
        </p>
        <div class="text-right">
            <page :page="page" :searchP="searchP" />
        </div>
        
    </div>
</template>

<script>
    import page from "@/components/legislacao/dialogs/page"

    export default {
        components:{
            page
        },
        props:{
            text: true,
            page: Object,
            searchP: String
        },
        computed: {
            extrairLinha(){
                let texto = this.markSearch()
                let regex = /<b>.*?<\/b>/;

                const linhas = texto.split('\n');
                const linhasFiltradas = ['(...)'];

                linhas.forEach(linha => {
                    if(linha.match(regex)){
                        linhasFiltradas.push(linha)
                    }
                });
                let novo_array = linhasFiltradas.slice(0, 5)
                novo_array.push('(...)')
                linhasFiltradas.push('(...)')
                return novo_array.join('<br>');
            },
        },
        methods: {
            markSearch(){
                let texto = this.text
                let palavrasChave = this.$route.query.search.split(' ');

                palavrasChave = this.excluirStopWords(palavrasChave)

                const escapedKeywords = palavrasChave.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

                const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
                const textoMarcado = texto.replace(regex, '<b>$1</b>');

                return textoMarcado;
                
            },
            excluirStopWords(arrayPrincipal) {
                const stopWords = ["a", "o", "e", "é", "um", "uma", "com", "de", "do", "da", "para", "por", "em", "os", "as", "isso", "essa", "esse", "isso", "está"];
                const resultado = arrayPrincipal.filter(palavra => !stopWords.includes(palavra));

                return resultado;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>