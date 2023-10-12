<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterSetupStore } from '../../store/counter-setup';
import CounterSetupValue from '@/counter/components/CounterSetupValue.vue';

const counterStore = useCounterSetupStore();
const { count, squareCount } = storeToRefs( counterStore );
//desestructuracion del counterStore
const { increment, incrementBy } = counterStore;


</script>

<template>
    <h1>Pinia Setup</h1>
    <h4>Counter: {{  count }}</h4>
    <h4>Square: {{ squareCount }}</h4>

    
    <br>
        <!--Se desestructuraron metodos que venian del counterStore-->
        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <!--$reset() - Método del counterStore que viene por defecto para resetear valores-->
        <button @click="counterStore.$reset()">No exists - Reset</button>
    <br>
    <CounterSetupValue/>
</template>

<style scoped>
button {
        margin-right: 5px;
}

</style>