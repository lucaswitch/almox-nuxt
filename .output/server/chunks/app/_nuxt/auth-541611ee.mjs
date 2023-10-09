import { Q as defineStore } from '../server.mjs';

const useAuth = defineStore("auth", {
  state() {
    return {
      user: null,
      token: null
    };
  },
  getters: {},
  actions: {
    setCredentials({ user, token }) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    }
  },
  persist: true
});

export { useAuth as u };
//# sourceMappingURL=auth-541611ee.mjs.map
