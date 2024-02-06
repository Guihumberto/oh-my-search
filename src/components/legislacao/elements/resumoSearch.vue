<template>
    <div class="pl-10 py-5 border-b">
        <p class="font-weight-light" v-html="extrairLinha">
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            text: true
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
                linhasFiltradas.push('(...)')
                return linhasFiltradas.join('<br>');
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