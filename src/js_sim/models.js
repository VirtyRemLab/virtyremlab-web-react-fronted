
import { multiply,add } from 'mathjs';

// Constantes del modelos EE del aeropéndulo
// Se identifica la función de tran
export const aeropendulo = { A: [[-0.607, 0], [1, 0]], B: [[1], [0]], C: [[0, 0.853], [0.853, 0]], D: 0 };

// Función para el cálculo de \dot{X} e Y a partir de las matrices de estado y un estado inicial
export class modeloEE {
    constructor(params) {
        this.x_dot = 0; this.y = 0;
        this.params = params;
        
        this.state = (u,x0) => {
            return add(multiply(this.params.A, x0), multiply(this.params.B, u));
        };

        this.out = (x0) => {
            return multiply(this.params.C, x0);
        }
}
};



// var x, y = 0;
// var modeloAeropendulo = new modeloEE(aeropendulo);
// [x,y] = modeloAeropendulo.exec(0,[[0],[0]])
