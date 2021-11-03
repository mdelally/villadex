<template lang="pug">
div(class="flex flex-col items-center")
  label(for="personality" class="text-sm font-black") {{ name.toUpperCase() }}
  select(
    :name="name"
    class="px-4 py-2 rounded-full bg-yellow-200 border-2 border-yellow-500 focus:border-yellow-900"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
  )
    option(:value="''" default) All
    option(v-for="o in options" :key="o" :value="o") {{ o }}
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
    name: String,
    options: Array,
  },
});
</script>
