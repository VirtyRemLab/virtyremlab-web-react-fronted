
import { multiply,add } from 'mathjs';

// Constantes del modelos EE del aeropéndulo
// Se identifica la función de tran
export const aeropendulo = { A: [[-0.607, 0], [1, 0]], B: [[1,1], [0,0]], C: [[0, 0.853], [0.853, 0]], D: 0 };
export const PI = function (Kp, Ki) {
    return { A: [[0]], B: [[1]], C: [[Kp*Ki]], D: Kp };
}
    
export const PID = function (Kp, Ki, Kd,alpha=0.01) {
    let a = Ki, b = 1 - (Kd / alpha) + Ki * alpha, c = Kp * Kd / alpha;
    return { A: [[0,0],[0,-1/alpha]], B: [[1],[1/alpha]], C: [[Kp*a, Kp*b]], D: c };
}



    

// Función para el cálculo de \dot{X} e Y a partir de las matrices de estado y un estado inicial
export class modeloEE {
    constructor(params) {
        this.x_dot = 0; this.y = 0;
        this.params = params;
        
        // Métodos
        this.update_params = (params) => { this.params = params };

        this.state = (u,x0) => {
            return add(multiply(this.params.A, x0), multiply(this.params.B, u));
        };

        this.out = (u,x0) => {
            return add(multiply(this.params.C, x0),multiply(this.params.D, u));
        }
}
};



// var x, y = 0;
// var modeloAeropendulo = new modeloEE(aeropendulo);
// [x,y] = modeloAeropendulo.exec(0,[[0],[0]])
