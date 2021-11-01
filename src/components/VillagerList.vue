<template lang="pug">
div(class="mt-8 bg-green-500 p-8 sm:p-2 rounded-lg")
  div(class="text-center p-16 text-green-700" v-if="loading")
    h3(class="text-5xl") Initial Loading...
    p(class="text-3xl"
    ) If this is the first time you're visiting Villadex, please allow the app to load all the Villager data. This process can take upwards of a minute or so depending on your connection. The data will be stored locally on your device to save you time in the future.

  div(
    v-if="!loading"
    class="p-4 sm:p-2 bg-green-300 rounded-lg text-green-700 mb-2 border-2 border-green-600 flex justify-between items-center flex-wrap sm:flex-col"
  )
    div(class="flex flex-col items-center")
      label(class="text-sm font-black") FILTER BY NAME
      input(
        type="text"
        class="p-2 rounded-full bg-green-200 border-2 border-green-400 w-64 text-center"
        v-model="nameFilter"
      )

    div(class="toolbar flex sm:flex-col flex-wrap")
      //- <!-- SPECIES -->
      div(class="flex flex-col items-center")
        label(for="personality" class="text-sm font-black") SPECIES
        select(
          name="personality"
          class="px-4 py-2 rounded-full bg-green-200 border-2 border-green-400"
          v-model="specie"
        )
          option(:value="null" default) All
          option(v-for="s in species" :key="s" :value="s") {{ s }}

      //- <!-- PERSONALITY -->
      div(class="flex flex-col ml-2 items-center")
        label(for="personality" class="text-sm font-black") PERSONALITY
        select(
          name="personality"
          class="px-4 py-2 rounded-full bg-green-200 border-2 border-green-400"
          v-model="personality"
        )
          option(:value="null" default) All
          option(v-for="p in personalities" :key="p" :value="p") {{ p }}

      //- <!-- HOBBY -->
      div(class="flex flex-col ml-2 items-center")
        label(for="personality" class="text-sm font-black") HOBBY
        select(
          name="personality"
          class="px-4 py-2 rounded-full bg-green-200 border-2 border-green-400"
          v-model="hobby"
        )
          option(:value="null" default) All
          option(v-for="h in hobbies" :key="h" :value="h") {{ h }}

      //- <!-- CLEAR FILTERS -->
      button(
        class="text-green-700 px-6 font-bold"
        @click="clearFilters"
        v-if="hasFilters"
      ) Clear Filters

  //- CARDS
  div(v-if="!loading && filteredVillagers.length > 0")
    transition-group(
      tag="div"
      class="flex flex-wrap items-center justify-center"
      mode="out-in"
      name="cards"
    )
      VillagerCard(
        v-for="(v, index) in filteredVillagers"
        :key="'villager' + index + '_' + v.id"
        :villager="v"
        @select-villager="$emit('select-villager', v)"
      )
  div(class="text-center p-16 text-5xl text-green-700" v-else-if="!loading") NO VILLAGERS MATCH!
</template>

<script>
import axios from "axios";
import { defineComponent, ref, computed, onMounted } from "vue";
import VillagerCard from "./VillagerCard.vue";

export default defineComponent({
  components: { VillagerCard },

  setup() {
    let villagers = ref([]);
    let loading = ref(true);
    let nameFilter = ref("");
    let personality = ref(null);
    let hobby = ref(null);
    let specie = ref(null);
    let loadingText = ref("LOADING...");
    const personalities = [
      "Cranky",
      "Jock",
      "Lazy",
      "Normal",
      "Peppy",
      "Big sister",
      "Smug",
      "Snooty",
    ];
    const hobbies = [
      "Education",
      "Fashion",
      "Fitness",
      "Music",
      "Nature",
      "Play",
    ];
    const species = [
      "Alligator",
      "Anteater",
      "Bear",
      "Bird",
      "Bull",
      "Cat",
      "Chicken",
      "Cow",
      "Cub",
      "Deer",
      "Dog",
      "Duck",
      "Eagle",
      "Elephant",
      "Frog",
      "Goat",
      "Gorilla",
      "Hamster",
      "Hippo",
      "Horse",
      "Kangaroo",
      "Koala",
      "Lion",
      "Monkey",
      "Mouse",
      "Octopus",
      "Ostrich",
      "Penguin",
      "Pig",
      "Rabbit",
      "Rhino",
      "Sheep",
      "Squirrel",
      "Tiger",
      "Wolf",
    ];

    const filteredByName = computed(() => {
      return villagers.value.filter((v) => {
        return v.name.toLowerCase().includes(nameFilter.value.toLowerCase());
      });
    });

    const filteredVillagers = computed(() => {
      if (hobby.value || personality.value || specie.value) {
        let params = filteredByName.value;

        if (specie.value) {
          params = params.filter((v) => {
            return v.species === specie.value;
          });
        }

        if (personality.value) {
          params = params.filter((v) => {
            return v.personality === personality.value;
          });
        }

        if (hobby.value) {
          params = params.filter((v) => {
            return v.nh_details.hobby === hobby.value;
          });
        }

        return params;
      }

      return filteredByName.value;
    });

    const hasFilters = computed(() => {
      return (
        nameFilter.value !== "" ||
        specie.value !== null ||
        personality.value !== null ||
        hobby.value !== null
      );
    });

    const getVillagers = () => {
      if (localStorage.getItem("villadex-villagers")) {
        villagers.value = JSON.parse(
          localStorage.getItem("villadex-villagers")
        );
        loading.value = false;
        return;
      }

      axios
        .get("https://api.nookipedia.com/villagers?game=nh&nhdetails=true", {
          headers: {
            "X-API-KEY": "d84c97c8-144d-41a3-8639-2275e7cfecf8",
            "Accept-Version": "2.0.0",
          },
        })
        .then((results) => {
          villagers.value = results.data;

          localStorage.setItem(
            "villadex-villagers",
            JSON.stringify(results.data)
          );
          loading.value = false;
        })
        .catch(() => {
          loadingText.value = "LOAD FAILED!";
        });
    };

    const clearFilters = () => {
      nameFilter.value = "";
      specie.value = null;
      personality.value = null;
      hobby.value = null;
    };

    onMounted(() => {
      getVillagers();
    });

    return {
      villagers,
      loading,
      nameFilter,
      personality,
      hobby,
      specie,
      loadingText,
      personalities,
      hobbies,
      species,
      filteredByName,
      filteredVillagers,
      hasFilters,
      getVillagers,
      clearFilters,
    };
  },
});
</script>

<style lang="stylus">
div.villager-card-container
  flex-basis: 25%

@media (min-width: 1920px)
  div.villager-card-container
    flex-basis: 20%


@media (max-width: 1023px)
  div.villager-card-container
    flex-basis: 33%


@media (max-width: 767px)
  div.villager-card-container
    flex-basis: 50%

@media (max-width: 639px)
  div.villager-card-container
    flex-basis: 100%

.cards-enter-active,
.cards-leave-active
  transition: all 0.5s ease-in-out

.cards-enter,
.cards-leave-to
  opacity: 0
  transform: translateY(-50px)
</style>
