<template>
    <v-timeline direction="horizontal" line-inset="12">
      <v-timeline-item v-for="item, i in years" :key="i">
        <template v-slot:opposite>
          Opposite
        </template>
        {{ item }}
      </v-timeline-item>
    </v-timeline>
</template>

<script>
export default{
  data(){
    return{
      years: [2003, 2010, 2015, 2016, 2017, 2018, 2020, 2023]
    }
  }
}
</script>