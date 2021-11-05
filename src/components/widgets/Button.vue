<template lang="pug">
button(
  @click="$emit('click')"
  class="bg-yellow-800 py-2 px-4 text-yellow-100 hover:bg-yellow-100 border-2 border-transparent hover:border-yellow-800 hover:text-yellow-800 rounded-full font-bold sm:text-xs"
) 
  slot
</template>
