import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataStore = defineStore('dataStore', () => {
  const arr = ref([]);

  const addItem = (item) => {
    arr.value.push(item);
  };

  return { arr, addItem };
});
