<template lang="pug">
div
  div(
    class="info-shade flex items-center justify-center backdrop-filter backdrop-blur"
    tabindex="0"
    @click="closeInfo"
  )

  div(class="info-container flex items-center justify-center" v-if="currentVillager")
    div(class="info-modal w-4/5 sm:w-full bg-yellow-100 sm:p-2 sm:pt-0 p-8 pt-4 rounded-lg")
      div(class="flex justify-end sm:p-2 sm:sticky sm:top-0 bg-yellow-100")
        Button(is-link :href="currentVillager.url" addon-class="mr-2" target="_blank") MORE INFO
        Button(@click="share" addon-class="mr-2" :is-link="false" v-if="canUseShareApi") SHARE
        Button(@click="closeInfo" :is-link="false") CLOSE

      //- // TOP SECTION - GENERAL basic AND IMAGE
      div(class="flex sm:flex-col sm:items-center")
        div: img(:src="currentVillager.image_url" class="w-auto h-36 mr-4" height="144")

        div(class="ml-4 w-full sm:ml-0 sm:p-2")
          h2(class="text-4xl text-yellow-900 text-left sm:text-center mb-2") {{ villagerName }}

          div(class="flex items-center border-b-2 border-yellow-500 w-full pb-2 sm:flex-col")
            em(class="text-xl text-yellow-600 font-black mr-4") {{ currentVillager.personality + " " + currentVillager.species }}
            div(class="bg-blue-200 px-3 rounded-full border-2 border-blue-600 text-blue-600 mr-2 sm:mr-0 sm:mb-2" v-if="currentVillager.nh_details.hobby") 💖 {{ currentVillager.nh_details.hobby }}

            strong(class="bg-yellow-600 text-yellow-200 border-2 border-yellow-700 px-4 rounded-full") 🎁 {{ currentVillager.birthday_month + " " + currentVillager.birthday_day }}

          div(class="p-2 border-l-4 border-yellow-900 mt-2 italic text-yellow-800 text-xl bg-orange-200 text-left")
            span “{{ currentVillager.quote ? currentVillager.quote : '???' }}”
            
      //- <!-- BOTTOM SECTION - DETAILS -->
      h3(class="text-2xl text-yellow-800 mt-4") Details
      div(class="bottom-section py-2 mt-2 text-yellow-900")
        //- <!-- INFO -->
        div(class="info-section")
          div(
            v-for="d in availableDetails"
            :key="d[0]"
            class="bg-yellow-300 mb-1 rounded-full flex"
          )
            div(
              class="detail-label rounded-full font-bold uppercase bg-yellow-700 text-yellow-200 px-2 py-1 sm:min-w-max"
            ) {{ detailLabel(d[0]) }}:
            div(class="px-2 py-1") {{ parseDetail(d[1]) }}

        //- <!-- HOUSE INFO -->
        div(class="house-info-section p-4 bg-yellow-300 rounded-xl flex sm:flex-col sm:items-center justify-evenly mt-4")
          div(class="flex flex-col items-center text-xl text-yellow-800 mb-2 p-2 w-64")
            h4 House Exterior
            a(:href="currentVillager.nh_details.house_exterior_url" target="_blank")
              img(:src="currentVillager.nh_details.house_exterior_url")

          div(class="flex flex-col items-center text-xl text-yellow-800 mb-2 p-2 w-64")
            h4 House Interior
            a(:href="currentVillager.nh_details.house_interior_url" target="_blank")
              img(:src="currentVillager.nh_details.house_interior_url")

          div(class="flex flex-col items-center text-xl text-yellow-800 mb-2 p-2 w-64")
            h4 Villager Photo
            a(:href="currentVillager.nh_details.photo_url" target="_blank")
              img(:src="currentVillager.nh_details.photo_url")
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useData from "@/composables/useData";
import Button from "./widgets/Button.vue";

export default defineComponent({
  components: { Button },
  setup() {
    const { getVillagerById, currentVillager } = useData();

    const availableDetailList = [
      "id",
      "gender",
      "personality",
      "species",
      "sign",
      "clothing",
    ];
    const availableNHDetailList = [
      "catchphrase",
      "hobby",
      "house_music",
      "house_wallpaper",
      "fav_colors",
      "fav_styles",
    ];
    let navigator: any;

    const router = useRouter();
    const route = useRoute();

    navigator = window.navigator;

    const canUseShareApi = navigator.canShare;

    const share = function () {
      const data = {
        title: `${currentVillager.value?.name} at Villadex`,
        url: `https://villadex.netlify.app/v/${currentVillager.value?.id}`,
      };

      navigator.share(data);
    };

    const villagerName = computed(() => {
      let gender = currentVillager.value?.gender === "Male" ? "♂" : "♀";

      return `${currentVillager.value?.name} ${gender}`;
    });

    const availableDetails = computed(() => {
      if (currentVillager.value === null) return [];

      let basic = Object.entries(currentVillager.value).filter((e) => {
        return availableDetailList.includes(e[0]);
      });

      let nh = Object.entries(currentVillager.value.nh_details).filter((e) => {
        return availableNHDetailList.includes(e[0]);
      });

      return [...basic, ...nh];
    });

    const detailLabel = (label: string) => {
      return label.replace("_", " ").replace("house", "");
    };

    const parseDetail = (detail: string) => {
      if (detail === "" || (Array.isArray(detail) && detail.length === 0))
        return "???";

      if (Array.isArray(detail)) return detail.join(", ");

      return detail;
    };

    const closeInfo = () => {
      router.replace({ name: "Home" });
    };

    onMounted(() => {
      document.querySelector("html")!.classList.add("menuOpen");
      getVillagerById(route?.params.id.toString());
    });

    onUnmounted(() => {
      currentVillager.value = null;
      document.querySelector("html")!.classList.remove("menuOpen");
    });

    return {
      currentVillager,
      villagerName,
      availableDetails,
      canUseShareApi,
      share,
      detailLabel,
      parseDetail,
      closeInfo,
    };
  },
});
</script>

<style lang="stylus">
div.info-shade
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgba(0, 0, 0, 0.6)

div.info-container
  pointer-events: none
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh

  div.info-modal
    pointer-events: all
    max-width: 1200px
    box-shadow: 7px 7px 0px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.2)

    div.bottom-section
      max-height: 300px
      overflow-y: scroll

    div.detail-label
      flex-basis: 20%
      border-top-right-radius: 0
      border-bottom-right-radius: 0
      text-align: center

@media (max-width: 639px)
  div.info-container
    div.info-modal
      height: 100vh
      overflow: scroll
      border-radius: 0

      div.bottom-section
        max-height: unset

        div.detail-label
          flex-basis: 40%

@media (min-height: 900px)
  div.info-container
    div.info-modal
      div.bottom-section
        max-height: 520px

.menuOpen
  overflow: hidden;
</style>
