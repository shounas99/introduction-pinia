import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterSetupStore = defineStore('counterSetup', () => {
    //Lo colocamos dentro de mi store
    const count       = ref<number>(0);
    const lastChanged = ref<Date>();

    //Definir acciones dentro del cuerpo de mi store
    //NOTA: Cuando esta muy grande y solo la mando llamar en mi return
    //o definirla si no estan grande en el mismo return
    const incrementBy = ( value: number) => {
        count.value += value;
        lastChanged.value = new Date();
    }

    //Voy a poder acceder a mis propiedades hasta que las ponga en el return
    return {
        //-----STATE PROPERTIES-----
        count, 
        lastChanged,
        //-----GETTERS-----
        squareCount: computed( () => count.value * count.value),

        //-----ACTIONS-----
        incrementBy,
        increment: () => incrementBy(1),
    }
});