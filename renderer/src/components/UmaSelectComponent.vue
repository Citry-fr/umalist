<template>
  <div class="d-flex flex-row justify-center align-content-center">
    <div>
      <v-avatar v-if="selected" class="border-md border-primary border-opacity-100 " :image="getImageUrl(selectedImage)" size="80" />
    </div>
    <v-divider v-if="selected" class="mx-16" opacity=".5" vertical />
    <div class="w-25 d-flex mt-3 justify-center">
      <v-combobox
        v-model="selected"
        class="combo"
        item-title="name"
        :items="uma"
        label="Choose Uma"
        return-object
      >
        <template #item="{ props, item }">
          <v-list-item v-bind="props" class="my-3" title="">
            <div class="d-flex align-center ga-4">
              <v-avatar class="border-md border-primary border-opacity-100 " :image="getImageUrl(item.raw.image)" size="80" />
              <v-list-item-title class="text-h6">{{ item.raw.name }}</v-list-item-title>
            </div>
          </v-list-item>
          <v-divider v-if="item.raw.index !== uma.length - 1" class="mx-16" opacity=".5" />
        </template>
      </v-combobox>
    </div>
  </div>
  <v-expand-transition>
    <v-radio-group
      v-if="selected && selected.variants.length > 1"
      v-model="variantLabel"
      class="d-flex justify-center"
      inline
    >
      <div class="ga-6 d-flex">
        <v-radio
          v-for="variant in selected.variants"
          :key="variant.label"
          :label="variant.label"
          :value="variant.label"
        />
      </div>
    </v-radio-group>
  </v-expand-transition>
</template>

<script setup>

  import { ref, watch } from 'vue'
  import characters from '@/data/characters.json'

  const selected = ref(null)
  const variantLabel = ref(null)

  const uma = characters.map((char, index) => {
    const defaultVariant = char.variants.find(variant => variant.label === 'Default')

    return {
      name: char.name,
      image: defaultVariant.image,
      variants: char.variants,
      index,
    }
  })

  function getImageUrl (image) {
    return new URL(`../assets/characters/${image}`, import.meta.url).href
  }

  watch(selected, newVal => {
    if (newVal) {
      variantLabel.value = 'Default'
    }
  })

  const selectedImage = computed(() => {
    if (!selected.value) return null
    const match = selected.value.variants.find(variant => variant.label === variantLabel.value)
    return match?.image || selected.value.image
  })

</script>

<style lang="scss" scoped>
.combo {
 height: 60px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
 transition: opacity .3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
 opacity: 0;
}
</style>
