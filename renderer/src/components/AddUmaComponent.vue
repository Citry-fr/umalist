<template>
  <div class="container">
    <v-card class=" d-flex flex-column text-center ga-4">
      <v-card-title class="text-h5">
        Add Uma Musume
      </v-card-title>
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Uma
      </v-card-subtitle>
      <UmaSelectComponent />
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Rating
      </v-card-subtitle>
      <v-number-input
        v-model="rating"
        class="w-25 mx-auto"
        control-variant="stacked"
        inset
        label="Rating"
        :min="0"
      />
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
            :max="1200"
            :min="0"
            min-width="130px"
          />
        </div>
      </div>
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Track Aptitude
      </v-card-subtitle>
      <div class="d-flex flex-row justify-center ga-16">
        <div v-for="track in tracks" :key="track.name">
          <v-combobox v-model="track.value" :items="rankValue" :label="track.name" min-width="130px" />
        </div>
      </div>
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Distance Aptitude
      </v-card-subtitle>
      <div class="d-flex flex-row justify-center justify-space-evenly">
        <div v-for="distance in distances" :key="distance.name">
          <v-combobox v-model="distance.value" :items="rankValue" :label="distance.name" min-width="130px" />
        </div>
      </div>
      <v-divider class="divider" opacity=".5" thickness="1" />
      <v-card-subtitle class="text-h6">
        Style Aptitude
      </v-card-subtitle>
      <div class="d-flex flex-row justify-center justify-space-evenly">
        <div v-for="style in styles" :key="style.name">
          <v-combobox v-model="style.value" :items="rankValue" :label="style.name" min-width="130px" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import UmaSelectComponent from './UmaSelectComponent.vue'

  const rating = ref(null)

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

  const tracks = ref([
    {
      name: 'Turf',
      value: null,
    },
    {
      name: 'Dirt',
      value: null,
    },
  ])

  const distances = ref([
    {
      name: 'Sprint',
      value: null,
    },
    {
      name: 'Mile',
      value: null,
    },
    {
      name: 'Medium',
      value: null,
    },
    {
      name: 'Long',
      value: null,
    },
  ])

  const styles = ref([
    {
      name: 'Front',
      value: null,
    },
    {
      name: 'Pace',
      value: null,
    },
    {
      name: 'Late',
      value: null,
    },
    {
      name: 'End',
      value: null,
    },
  ])

  const rankValue = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

</script>

<style lang="scss" scoped>
.container {
 width: 100%;
}
.divider {
 margin: 0 15%;
}
</style>
