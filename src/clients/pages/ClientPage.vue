<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

import LoadingModal from "@/shared/LoadingModal.vue";
import useClient from '../composables/useClient';

const route = useRoute();
const router = useRouter();
// const queryClient = useQueryClient();

//Usar mi composable
//agregue un + para que pasara de string a int :o
const { 
        client, 
        isLoading, 
        isError, 
        clientMutation,
        updateClient,
        isUpdating,
        isErrorUpdating,
        isUpdatingSuccess,
    } = useClient( +route.params.id );

// const updateClient = async( client: Client):Promise<Client> => {
//     // await new Promise( resolve => {
//     //     setTimeout( () => resolve(true), 2500)
//     // });
//     //posteo
//     const { data } = await clientsApi.patch(`/clients/${ client.id }`, client);
//     // const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false }); // Buscar a los que tengan en comun
//     // const queries = queryClient.getQueryCache().clear(); // Mi clear limpia todo
//     // queries.forEach( query => query.fetch )
//     // console.log('queries', queries);
//     return data;
// }

//Mandar llamar la petición - dentro se manda llamar la funcion para que haga el post 
// const clientMutation = useMutation( updateClient )

//Estar pendiente del clientMutation
watch( clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset()
    }, 2000)
})

watch( isError, () => {
    if( isError.value )
        router.replace('/clients') //Si tiene un error lo saco de la pantalla de clientes
})

</script>

<template>
    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>

    <LoadingModal v-if="false"/>

    <div v-if="client">
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="updateClient( client )">
            <input 
                type="text"
                placeholder="Nombre"
                v-model="client.name"
            />
            <br>
            <input 
                type="text"
                placeholder="Dirección"
                v-model="client.address"
            />
            <br>

            <button 
                type="submit"
                :disabled="isUpdating"
            >Guardar</button>

        </form>
    </div>

    <code>
        <!-- Toda la info del cliente -->
        {{  client  }}
    </code>
</template>


<style scoped>
input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button {
    margin-bottom: 10px;
}
</style>