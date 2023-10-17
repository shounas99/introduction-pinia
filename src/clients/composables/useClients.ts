//Obtener los clientes
import { computed, watch } from 'vue';
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useClientsStore } from "@/store/clients";

import clientsApi from "@/api/clients-api";
import type { Client } from '@/clients/interfaces/client';

const getClients = async( page: number ):Promise<Client[]> => {
    //Va a esperar 1s y medio antes de realizar la petición y cargar la nueva data
    // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 1500)
    // });

    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`)
    return data;
}

const useClients = () => {

    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs( store );

    const { isLoading, data } = useQuery(
        //Extraer clientes
        ['clients?page=', currentPage ],
        () => getClients( currentPage.value ),
        {
            // staleTime: 1000 * 60, //1 min - Yo no espero que cambie en 1 min
        }
        
    );

    //Escuchar los datos de la data cuando cambie
    //Cuando la data cambie voy a estar "escuchando" a clients
    //si no es undefined la data, aqui la establece
    watch( data, clients => {
        if ( clients )
        store.setClients( clients )
    })


    return {
        //Properties
        clients,
        currentPage,
        isLoading,
        totalPages,

        //Methods
        //Llamar/cambiar paginas
        getPage( page: number){
            store.setPage( page )
        },

        //Getters [1,2,3,4,5,...]
        //si es un getter es un computed - porque es una propiedad computada
        // totalPageNumbers: computed(
        //     //cree un arreglo con la cantidad de elementos y luego retorno un + ..
        //     //+ nuevo arreglo haciendo uso del map, basado en el indice
        //     () => [...new Array( totalPages.value )].map( (value, index) => index + 1)
        // ),
    }
}

export default useClients;
