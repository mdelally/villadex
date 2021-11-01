<template lang="pug">
div(class="bg-green-200 rounded-lg p-4 text-center text-green-900")
  p.mb-2 Quickly search and learn about <em>Animal Crossing: New Horizons®</em> villagers. This data is brought to you by the 
    a(href="https://api.nookipedia.com/") Nookipedia API

  p.font-bold.text-xl.mb-4 App built with love by Michael DeLally using Vue 3 with TypeScript and TailwindCSS

  p.text-xs All characters, content, and imagery is copyright Nintendo

  button(
        class="hover:bg-green-800 hover:text-green-200 font-bold px-8 py-2 mt-4 rounded-full hover:border-transparent border-2 border-green-800 text-green-800 bg-transparent"
        @click="clearData"
  )
    span Clear and Update Villager Data

  VillagerList(@select-villager="setVillager")

  transition(mode="out-in" name="info")
    VillagerInfoPage(
      v-if="currentVillager"
      :villager="currentVillager"
      @close-info="closeInfo"
    )
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VillagerList from "@/components/VillagerList.vue";
import VillagerInfoPage from "@/components/VillagerInfoPage.vue";

export default defineComponent({
  components: { VillagerList, VillagerInfoPage },
  setup() {
    let currentVillager = ref(null);

    const setVillager = (v: any) => {
      currentVillager.value = v;
    };
    const closeInfo = () => {
      currentVillager.value = null;
    };

    const clearData = () => {
      if (confirm("Are you sure you want to clear and update?"))
        localStorage.removeItem("villadex-villagers");
      window.location.reload();
    };

    return { currentVillager, setVillager, closeInfo, clearData };
  },
});
</script>
