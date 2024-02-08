<template>
    <div class="mt-10">
        <h2>Lista de Leis</h2>
        <div class="py-5 px-10">
            <ul>
                <li v-for="item, i in 10" :key="i">Item {{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>