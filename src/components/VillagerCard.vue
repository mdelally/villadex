<template lang="pug">
div(class="villager-card-container sm:p-0 sm:pb-2 p-2")
  button(
    class="w-full villager-card bg-green-200 rounded-lg sm:p-2 p-4 flex flex-col sm:flex-row justify-center items-center sm:justify-between hover:bg-green-100 border-4 border-transparent hover:border-green-700"
    @click="$emit('select-villager')"
  )
    div(class="flex-col sm:flex-row-reverse")
      h3(class="px-4 py-2 rounded-full shadow text-xl mb-2" :style="villagerName(villager.id)") {{ villager.name }}
      img(
        class="h-32 villager-icon"
        :src="villager.nh_details.icon_url"
        :alt="villager.name"
        v-if="villager.nh_details.icon_url"
      )
      img(class="h-32 w-full p-2 villager-icon" :src="leaf" v-else)

    div(class="flex flex-col")
      em(class="text-green-900 m-2 px-3 py-1 font-black rounded-full") {{ `${villager.personality} ${villager.species}` }}
      div(class="bg-blue-200 px-3 py-1 rounded-full mb-1 border-2 border-blue-600 text-blue-600") {{ villager.nh_details.hobby ? villager.nh_details.hobby : "???" }}
      strong(class="bg-green-600 text-green-200 border-2 border-green-700 px-4 py-1 rounded-full") {{ `${villager.birthday_month} ${villager.birthday_day}` }}
</template>

<script>
import { defineComponent } from "vue";
import leaf from "@/assets/leaf.svg";

export default defineComponent({
  props: {
    villager: { type: Object, default: null },
  },

  setup(props) {
    const villagerName = () => {
      let color = props.villager.text_color
        ? `#${props.villager.text_color}`
        : "#222";
      let backgroundColor = props.villager.title_color
        ? `#${props.villager.title_color}`
        : "#FFF";

      return {
        color,
        backgroundColor,
      };
    };

    return { leaf, villagerName };
  },
});
</script>

<style lang="stylus">
button.villager-card
  z-index: 1

  transition: all 100ms ease-in-out

  &:hover
    transform: translateY(-2em) translateZ(3px) scale(1.1) rotateZ(-3deg)
    box-shadow: 7px 7px 0px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.2)

  h3
    border-radius: 30px 52% 52% 48%/32px 58% 34px 68%

  img.villager-icon
    filter: drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.1))
</style>
