import { ref } from "vue";
import axios from "axios";

const apiKey: string = process.env.VUE_APP_NOOKIPEDIA_API_KEY;
const baseURL: string = process.env.VUE_APP_NOOKIPEDIA_BASE_URL;
const storageKey: string = process.env.VUE_APP_LOCAL_STORAGE_KEY;
const storage: string | null = localStorage.getItem(storageKey);

export interface Villager {
  id: string;
  name: string;
  species: string;
  personality: string;
  hobby: string;
  gender: string;
  nh_details: Record<string, unknown>;
  birthday_month: string;
}

const villagers = ref<Villager[]>([]);
const currentVillager = ref<Villager | null>(null);

function get(endpoint: string) {
  return axios.get(baseURL + endpoint, {
    headers: {
      "X-API-KEY": apiKey,
      "Accept-Version": "2.0.0",
    },
  });
}

export default function useData() {
  const loading = ref(true);
  const loadingText = ref("LOADING...");

  const setVillager = (v: Villager) => {
    currentVillager.value = v;
  };

  const getVillagerById = (id: string) => {
    const villager: Villager = villagers.value.find(
      (v) => v.id === id
    ) as Villager;

    currentVillager.value = villager;
  };

  const getVillagers = (filters = "") => {
    if (storage) {
      villagers.value = JSON.parse(storage);
      loading.value = false;
      return;
    }

    get("villagers?game=nh&nhdetails=true" + filters)
      .then((results) => {
        villagers.value = results.data;
        localStorage.setItem(storageKey, JSON.stringify(results.data));
        loading.value = false;
      })
      .catch(() => {
        loadingText.value = "LOAD FAILED!";
      });
  };

  const clearData = () => {
    if (confirm("Are you sure you want to clear and update?")) {
      localStorage.removeItem("villadex-villagers");
      window.location.reload();
    }
  };

  return {
    setVillager,
    getVillagerById,
    getVillagers,
    clearData,
    villagers,
    currentVillager,
    loading,
    loadingText,
  };
}
