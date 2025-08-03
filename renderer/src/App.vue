<template>

  <v-tabs
    v-model="tab"
    align-tabs="center"
    bg-color="grey-darken-3"
    class="w-75 d-flex mx-auto rounded-b-lg"
    color="deep-purple"
    grow="true"
  >
    <v-tab value="one">
      Add Uma
    </v-tab>
    <v-divider inset vertical />
    <v-tab value="two">
      Uma List
    </v-tab>
  </v-tabs>

  <v-tabs-window v-model="tab" class=" w-75 mx-auto mt-4">
    <v-tabs-window-item reverse-transition="tabs-window-item-reverse-transition" transition="tabs-window-item-transition" value="one">
      <AddUmaComponent />
    </v-tabs-window-item>
    <v-tabs-window-item reverse-transition="tabs-window-item-reverse-transition" transition="tabs-window-item-transition" value="two">
      <h1>Uma List</h1>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script setup>
  import { ref } from 'vue'
  import AddUmaComponent from '@/components/AddUmaComponent.vue'

  const tab = ref(null)
</script>

<style scoped>

</style>
