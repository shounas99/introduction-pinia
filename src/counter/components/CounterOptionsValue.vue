<!--Mostrar informacion propiamente del store, sin pasarla por props-->
<script setup lang="ts">
import { useCounterOptionsStore } from "../../store/counter-options";


const counterStore = useCounterOptionsStore();

</script>

<template>
    <h1>El valor es: {{ counterStore.count }}</h1>
    <h4>Último cambio fue en: {{ counterStore.lastChanged  }}</h4>
</template>


<style scoped>

</style>