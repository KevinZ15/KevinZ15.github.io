let numero = document.querySelector('#numero');
let sumar = document.querySelector('#sumar');
let restar = document.querySelector('#restar');

let resultado = 0;

sumar.addEventListener("click", () =>{
    resultado = resultado + 1;
    numero.innerText = resultado;
})

restar.addEventListener("click", () =>{
    resultado = resultado - 1;
    numero.innerText = resultado;
})