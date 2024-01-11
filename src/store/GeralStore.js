import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    search: false
  }),
  getters: {
    readSearch() {
      return this.search
    },
  },
  actions:{
    changeSearch() {
      this.search = !this.search
    }
  }
});
