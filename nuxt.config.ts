import {ThemeDefinition} from "vuetify";

const PROJECT_THEME: ThemeDefinition = {
    dark: false,
    colors: {
        primary: '#15616d',
        secondary: 'red',
        error: '#000000',
        info: '#000000',
        success: '#000000',
        warning: '#000000',
    }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@invictus.codes/nuxt-vuetify',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    imports: {
        dirs: ['./stores'],
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    vuetify: {
        /* vuetify options */
        vuetifyOptions: {},
        moduleOptions: {
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,
            font: {
                family: 'Roboto'
            },
            icons: 'mdi',
            /* vite-plugin-vuetify options */
            styles: true,
            autoImport: true,
            useVuetifyLabs: true,
        }
    },
    devtools: {enabled: false},

})
