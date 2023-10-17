import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Client } from '@/clients/interfaces/client'

export const useClientsStore = defineStore('clients', () => {
    const currentPage = ref<number>(1)
    const totalPages = ref<number>(5)
    const clients = ref <Client>([])

    return {
        //-----STATE-----
        currentPage,
        totalPages,
        clients,
        // -----GETTERS-----
        // squareCount: computed( () => count.value * count.value),

        //-----ACTIONS-----
        setClients( newClients: Client[]){
            clients.value = newClients;
        },
        setPage( page: number ){
            if( currentPage.value === page ) return;
            if( page < 0 ) return;

            currentPage.value = page;
        },

    }
});