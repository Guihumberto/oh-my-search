<template>
    <div class="pl-10 py-5 border-b">
        <p class="font-weight-light" v-html="marcarTexto">
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
                let texto = this.text
                let palavrasArray = this.$route.query.search.split(' ');

                const linhas = texto.split('\n');
                const linhasFiltradas = [];

                for (let i = 0; i < linhas.length; i++) {
                    const linhaAtual = linhas[i];

                    if (palavrasArray.some((palavra) => linhaAtual.includes(palavra))) {
                    // Adiciona a linha anterior (se existir)
                        if (i > 0) {
                            linhasFiltradas.push(linhas[i - 1]);
                        }

                        // Adiciona a linha atual
                        linhasFiltradas.push(linhaAtual);

                        // Adiciona a linha seguinte (se existir)
                        if (i < linhas.length - 1) {
                            linhasFiltradas.push(linhas[i + 1]);
                        }
                    }
                }

                return linhasFiltradas.join('\n');
            },
            marcarTexto(){
                let texto = this.extrairLinha
                let palavrasChave = this.$route.query.search.split(' ');

                palavrasChave = this.excluirStopWords(palavrasChave)

                const escapedKeywords = palavrasChave.map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

                const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
                const textoMarcado = texto.replace(regex, '<b>$1</b>');

                return textoMarcado;
            }
        },
        methods: {
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