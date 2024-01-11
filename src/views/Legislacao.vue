<template>
    <div class="legesWrapper">
        <sideLeft />
        <section-search />
        <side-right />
    </div>
</template>

<script setup>
    import SectionSearch from '@/components/legislacao/search.vue';
    import sideLeft from '@/components/legislacao/sidebar/sideLeft'
    import sideRight from '@/components/legislacao/sidebar/sideRight'
</script>

<style scoped>
.legesWrapper{
    position: relative;
    display: flex;
    justify-content: space-between;
}
</style>