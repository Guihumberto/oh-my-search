<template>
    <section class="bg-black">
        <div class="container">
            <v-btn variant="text" class="mb-10" @click="voltar">Voltar</v-btn>
            <h2>Busca Semântica na Legislação</h2>
            <div class="my-5 w-50">
                <h3 class="mb-2">Insira sua consulta</h3>
                <v-form>
                    <v-text-field
                        label="Busca"
                        variant="outlined"
                        density="compact"
                    ></v-text-field>
                    <v-btn variant="outlined">Buscar</v-btn>
                </v-form>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods:{
            voltar(){
                this.$router.push('/leges')
            }
        }
    }   
</script>

<style lang="scss" scoped>
.container{
    min-height: 60vh;
}

</style>