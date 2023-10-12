import { defineStore } from "pinia"

//Crear un interfaz para definir los valores
interface CounterOptionsState {
    count: number;
    lastChanged?: Date;
}

//counterOptions -> es lo que yon podre visualizar en las devtools
//NOTA: Hasta que yo use el useCounterOptions, hasta ese momento Pinia lo va a mostrar
export const useCounterOptionsStore = defineStore('counterOptions', {
    //state - objeto reactivo
    state: () => ({
        count: 0,
        lastChanged: undefined,
    } as CounterOptionsState ),

    //getters - Es una forma de tener computadas ciertas perticiones y/o tareas frecuentes
    //Funcion que me va a regresar un valor
    getters: {
        squareCount: ( state ) => state.count * state.count,
    },

    //Definir mis acciones
    actions: {
        incrementBy( value: number ) {
            this.count += value;
            //Obtener fecha del ultimo cambio
            this.lastChanged = new Date();
        },
        //anotherAction
        increment(){
            this.incrementBy(1);
        }
    }
});