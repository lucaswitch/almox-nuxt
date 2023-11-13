// @ts-ignore

export const usePreferences = defineStore('preferences', {
    state() {
        return {
            drawer: true
        }
    },
    getters: {},
    actions: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePreferences, import.meta.hot))
}
