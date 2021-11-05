<template lang="pug">
div(class="appContainer bg-yellow-300 rounded-lg p-4 sm:p-2 text-center text-yellow-900 mb-16 sm:rounded-none")
  div(class="grid grid-cols-2 gap-4 sm:grid-cols-none")
    div.p-2.justify-end
      Intro

    div
      button(
        class="hover:bg-yellow-800 hover:text-yellow-200 font-bold px-8 py-2 mt-4 rounded-full hover:border-transparent border-2 border-yellow-800 text-yellow-800 bg-transparent"
        @click="clearData"
      )
        span Clear and Update Villager Data

  VillagerList(@select-villager="setVillager" :villagers="villagers" v-if="!loading")
  div(class="p-16 flex justify-center" v-else): img(src="../assets/gyroid.gif")

  transition(mode="out-in" name="info")
    VillagerInfoPage(
      v-if="currentVillager"
      :villager="currentVillager"
      @close-info="closeInfo"
    )

  Footer
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import useData from "@/composables/useData";
import Intro from "@/components/layout/Intro.vue";
import VillagerList from "@/components/VillagerList.vue";
import VillagerInfoPage from "@/components/VillagerInfoPage.vue";
import Footer from "@/components/layout/Footer.vue";

export default defineComponent({
  components: { Intro, VillagerList, VillagerInfoPage, Footer },
  setup() {
    const {
      setVillager,
      getVillagerById,
      getVillagers,
      clearData,
      villagers,
      currentVillager,
      loading,
    } = useData();
    const route = useRoute();

    watch(villagers, () => {
      const id = route.params.id;

      if (id && villagers.value !== null) {
        getVillagerById(id.toString());
      }
    });

    const closeInfo = () => {
      currentVillager.value = null;
    };

    onMounted(() => {
      getVillagers();
    });

    return {
      currentVillager,
      villagers,
      loading,
      setVillager,
      closeInfo,
      clearData,
    };
  },
});
</script>

<style lang="stylus">
div.appContainer
  box-shadow: 7px 7px 0px rgba(146, 64, 14, 0.25)
</style>
