<template lang="pug">
div(class="p-8 sm:p-2 rounded-lg")
  div(class="p-4 sm:p-2 bg-yellow-400 rounded-lg text-yellow-700 mb-2 border-2 border-yellow-600 flex justify-between items-center flex-wrap sm:flex-col")
    //- NAME FILTER
    div(class="flex flex-col items-center")
      label(class="text-sm font-black") FILTER BY NAME
      input(
        type="text"
        class="p-2 rounded-full bg-yellow-200 border-2 border-yellow-500 w-64 text-center focus:border-yellow-900"
        v-model="nameFilter"
      )

    //- FILTERS
    div(class="toolbar flex sm:flex-col flex-wrap")
      //- SPECIES
      FilterDropdown(name="species" :options="species" v-model="specie")
      //- PERSONALITY
      FilterDropdown(name="personality" :options="personalities" v-model="personality" class="ml-2")
      //- HOBBY
      FilterDropdown(name="hobby" :options="hobbies" v-model="hobby" class="ml-2")
      //- BIRTH MONTH
      FilterDropdown(name="birthmonth" :options="months" v-model="birthmonth" class="ml-2")

      //- CLEAR FILTERS
      button(
        class="text-yellow-700 px-6 font-bold"
        @click="clearFilters"
        v-if="hasFilters"
      ) Clear

  //- CARDS
  div(v-if="filteredVillagers.length > 0")
    transition-group(
      tag="div"
      class="flex flex-wrap items-center"
      mode="out-in"
      name="cards"
    )
      VillagerCard(
        v-for="(v, index) in filteredVillagers"
        :key="'villager' + index + '_' + v.id"
        :villager="v"
        @select-villager="$emit('select-villager', v)"
      )
  div(class="text-center p-16 text-5xl text-yellow-700" v-else) NO VILLAGERS MATCH!
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import VillagerCard from "./VillagerCard.vue";
import FilterDropdown from "./widgets/FilterDropdown.vue";

export default defineComponent({
  components: { VillagerCard, FilterDropdown },

  props: {
    villagers: { type: Array, default: () => [] },
  },

  setup(props) {
    let nameFilter = ref("");
    let personality = ref(null);
    let hobby = ref(null);
    let specie = ref(null);
    let birthmonth = ref(null);

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
      "Bear cub",
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
      "Rhinoceros",
      "Sheep",
      "Squirrel",
      "Tiger",
      "Wolf",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const filteredByName = computed(() => {
      return props.villagers.filter((v) => {
        return v.name.toLowerCase().includes(nameFilter.value.toLowerCase());
      });
    });

    const filteredVillagers = computed(() => {
      let params = filteredByName.value;

      if (
        hobby.value ||
        personality.value ||
        specie.value ||
        birthmonth.value
      ) {
        if (specie.value)
          params = params.filter((v) => v.species === specie.value);

        if (personality.value)
          params = params.filter((v) => v.personality === personality.value);

        if (hobby.value)
          params = params.filter((v) => v.nh_details.hobby === hobby.value);

        if (birthmonth.value)
          params = params.filter((v) => v.birthday_month === birthmonth.value);
      }

      return params;
    });

    const hasFilters = computed(() => {
      return (
        nameFilter.value !== "" ||
        specie.value !== null ||
        personality.value !== null ||
        hobby.value !== null ||
        birthmonth.value !== null
      );
    });

    const clearFilters = () => {
      nameFilter.value = "";
      specie.value = null;
      personality.value = null;
      hobby.value = null;
      birthmonth.value = null;
    };

    return {
      nameFilter,
      personality,
      hobby,
      specie,
      birthmonth,
      personalities,
      hobbies,
      species,
      months,
      filteredByName,
      filteredVillagers,
      hasFilters,
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
.cards-leave-active,
.cards-move
  transition: all 0.5s ease-out

.cards-enter,
.cards-leave-to
  opacity: 0
  transform: translateY(10px)
</style>
