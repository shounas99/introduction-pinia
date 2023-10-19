import { ref, watch, computed } from 'vue';
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { Client } from '@/clients/interfaces/client'
import clientsApi from '../../api/clients-api';

//-----Obtener Cliente-----
const getClient = async( id: number ):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${ id }`);
    return data; 
}
//-----Actualizar Cliente-----

const updateClient = async( client: Client):Promise<Client> => {
    const { data } = await clientsApi.patch(`/clients/${ client.id }`, client);
    return data;
}



const useClient = ( id: number ) => {
    
    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery(
        ['client', id],
        () => getClient(id),
        { 
            retry: false, //Cuando falla no va a volver a intentarlo
        }
    );

    const clientMutation = useMutation( updateClient )

    //Estar pendiente de cuando cambie la data
    watch( data, () => {
        if( data.value )
            client.value = {...data.value};
    }, { immediate: true } ); //inmediatamente despues de que se monte

    return {
        client,
        clientMutation,
        isError,
        isLoading, 
        
        // Method
        updateClient: clientMutation.mutate,
        isUpdating:        computed( () => clientMutation.isLoading.value ),
        isUpdatingSuccess: computed( () => clientMutation.isSuccess.value ),
        isErrorUpdating:   computed( () => clientMutation.isError.value),
    }
}

export default useClient;

