// @ts-ignore
import {User} from "~/server/utils/database/models";

export const useAuth = defineStore('auth', {
    state() {
        return {
            user: null as typeof User | null,
            token: null as string | null
        }
    },
    getters: {},
    actions: {
        setCredentials({user, token}: { user: typeof User | null, token: string | null }) {
            this.user = user;
            this.token = token;
        },
        logout() {
            this.user = null;
            this.token = null;
        }
    },
    persist: true
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
