import { ref } from "vue";
import axios from "axios";

const apiKey = process.env.VUE_APP_NOOKIPEDIA_API_KEY;
const baseURL = process.env.VUE_APP_NOOKIPEDIA_BASE_URL;
const storageKey = process.env.VUE_APP_LOCAL_STORAGE_KEY;
const storage: string | null = localStorage.getItem(storageKey);

function get(endpoint: string) {
  return axios.get(baseURL + endpoint, {
    headers: {
      "X-API-KEY": apiKey,
      "Accept-Version": "2.0.0",
    },
  });
}

export default function useApi() {
  const items = ref([]);
  const loading = ref(true);
  const loadingText = ref("LOADING...");

  const getVillagers = () => {
    if (storage) {
      items.value = JSON.parse(storage!);
      loading.value = false;
      return;
    }

    get("villagers?game=nh&nhdetails=true")
      .then((results) => {
        items.value = results.data;
        localStorage.setItem(storageKey, JSON.stringify(results.data));
        loading.value = false;
      })
      .catch(() => {
        loadingText.value = "LOAD FAILED!";
      });
  };

  return { getVillagers, items, loading, loadingText };
}
