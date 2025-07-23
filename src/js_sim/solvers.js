


import { multiply,add } from 'mathjs';


export function rk4(u,x,modelo, Tm) { 
    var k1, k2, k3, k4;

    k1 = modelo.state(u, x);
    k2 = modelo.state(u, add(x, multiply(k1, 0.5*Tm)));
    k3 = modelo.state(u, add(x, multiply(k2, 0.5*Tm)));
    k4 =  modelo.state(u, add(x, multiply(k3, Tm)));
    
    x = add(x, multiply(k1, Tm / 6));
    x = add(x, multiply(k2, Tm / 3));
    x = add(x, multiply(k3, Tm / 3));
    x = add(x, multiply(k4, Tm / 6));
    

    return x;
}