<template lang="pug">
div
  button(
    v-if="!isLink"
    @click="$emit('click')"
    :class="buttonClass"
  ) 
    slot

  a(:href="href" v-if="isLink" :class="buttonClass" class="inline-block opacity-100" :target="target")
    slot
  
  router-link(:to="to" v-else-if="isRouterLink" :class="buttonClass" class="inline-block opacity-100" :target="target")
</template>

<script>
import { defineComponent } from "vue";
// import { stringifyQuery } from "vue-router";

export default defineComponent({
  props: {
    isLink: Boolean,
    isRouterLink: Boolean,
    href: String,
    to: Object,
    addonClass: String,
    target: String,
  },

  setup(props) {
    const buttonClass =
      "bg-yellow-800 py-2 px-4 text-yellow-100 hover:bg-yellow-100 border-2 border-transparent hover:border-yellow-800 hover:text-yellow-800 rounded-full font-bold sm:text-xs " +
      props.addonClass;

    return { buttonClass };
  },
});
</script>
