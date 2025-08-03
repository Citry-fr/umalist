<template>
  <div class="container">
    <v-card class=" d-flex flex-column text-center ga-4">
      <v-card-title class="text-h5">
        Add Uma Musume
      </v-card-title>
      <v-card-subtitle class="text-h6">
        Select Uma
      </v-card-subtitle>
      <div>uma dropdown</div>
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Stats
      </v-card-subtitle>
      <div class="d-flex flex-row justify-center justify-space-evenly">
        <div v-for="stat in stats" :key="stat.name">
          <v-number-input
            v-model="stat.value"
            control-variant="stacked"
            inset
            :label="stat.name"
            max="1200"
            min="0"
            min-width="130px"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const stats = ref([
    {
      name: 'Speed',
      value: null,
    },
    {
      name: 'Stamina',
      value: null,
    },
    {
      name: 'Power',
      value: null,
    },
    {
      name: 'Guts',
      value: null,
    },
    {
      name: 'Wisdom',
      value: null,
    },
  ])

</script>

<style lang="scss" scoped>
.container {
 width: 100%;
 height: 600px;
}
.divider {
 margin: 0 15%;
}
</style>
