<template>
  <v-combobox
    v-model="selected"
    class="w-25 mx-auto"
    item-title="name"
    :items="uma"
    label="Choose Uma"
    return-object
  >
    <template #item="{ props, item }">
      <v-list-item v-bind="props" class="my-3" title="">
        <div class="d-flex align-center ga-4">
          <v-avatar class="border-md border-primary border-opacity-100" :image="getImageUrl(item.raw.image)" size="80" start />
          <v-list-item-title class="text-h6">{{ item.raw.name }}</v-list-item-title>
        </div>
      </v-list-item>
      <v-divider v-if="item.raw.index !== uma.length - 1" class="mx-16" opacity=".5" />
    </template>
  </v-combobox>
</template>

<script setup>

  import { ref } from 'vue'
  import characters from '@/data/characters.json'

  const selected = ref(null)

  const uma = Object.entries(characters).map(([name, image], index) => ({ name, image, index }))

  function getImageUrl (image) {
    return new URL(`../assets/characters/${image}`, import.meta.url).href
  }

  console.log(uma)

</script>

<style lang="scss" scoped>

</style>
