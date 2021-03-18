( ()=> {

let baraja = [];
let palos = ['S','C','D','H']
let figuras = ['J','Q','K','A']

let puntosJugador = 0;
let puntosPc = 0;
let nombre;

const btnNuevoJuego = document.querySelector('#btnNuevoJuego'),
      btnPedirCarta = document.querySelector('#btnPedirCarta'),
      btnDetenerse = document.querySelector('#btnDetenerse'),
      btnSalir = document.querySelector('#btnSalir'),
      btnCambiarNombre = document.querySelector('#btnCambiarNombre');

const resultadosPc = document.querySelector('#scorePc'),
      resultadosJugador = document.querySelector('#scoreJugador'),
      cambioNombre = document.querySelector('#nombreJugador'),
      cartaJugador = document.querySelector('#cartas-Jugador'),
      cartaPc = document.querySelector('#cartas-Pc');

setTimeout(() => {
    Swal.fire({
        position: 'bottom-end',
        icon: 'info',
        title: '¡Cambia tu nombre para iniciar el juego!',
        showConfirmButton: false,
        timer: 4000,
    })
}, 2300);


btnCambiarNombre.addEventListener('click', () =>{
    Swal.fire({
        title: '¡Ingresa tu nombre!',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Cambiar Nombre',
        preConfirm: (player) => {
            nombre=player
            cambioNombre.innerHTML = player
            btnNuevoJuego.disabled = false;
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
})

const crearBaraja = () => {
    baraja = [];
    for(let i = 2; i <=10; i++){
        for(let palosDeCartas of palos){
            baraja.push(i+palosDeCartas);
        }
    }
    for(let figurasDeCartas of figuras){
        for(let palosDeCartas of palos){
            baraja.push(figurasDeCartas+palosDeCartas);
        }
    }
    baraja = _.shuffle(baraja);
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length -1);
    return isNaN(valor) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

btnNuevoJuego.addEventListener('click', () => {

    if (baraja.length === 0){
        crearBaraja();
        Swal.fire('Se ha creado una baraja');
    }

    btnDetenerse.disabled = false;
    btnPedirCarta.disabled = false;
    btnSalir.disabled = false;
    btnNuevoJuego.disabled = true;

    puntosJugador = 0;
    puntosPc = 0;
    resultadosJugador.innerText = 0;
    resultadosPc.innerText = 0;
    cartaJugador.innerHTML = '';
    cartaPc.innerHTML = '';

    let timerInterval

    Swal.fire({
        title: '¡Inicia el juego!',
        html: '¡'+nombre+'!'+' el juego inicia en 3 segundos',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                if (b) {
                    b.textContent = Swal.getTimerLeft()
                }}
            }, 100)
        },
        willClose: () => {
        clearInterval(timerInterval)
        }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
        }
        })
})

const pedirCarta = () => {
    return baraja.length === 0 ? Swal.fire('No hay más cartas') : baraja.pop();
}

btnPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    resultadosJugador.innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`; //template literal
    imgCarta.classList.add('cartaJugador');
    cartaJugador.append(imgCarta);
    if (puntosJugador > 21){
        Swal.fire('Perdiste');
        turnoPc(puntosJugador);
        btnPedirCarta.disabled = true;
        btnDetenerse.disabled = true;
    } else if (puntosJugador === 21){
        btnPedirCarta.disabled = true;
        Swal.fire('¡Sacaste 21!');
    }
})

const turnoPc = (puntosJugador) => {
    do{
    const carta = pedirCarta();
    puntosPc = puntosPc + valorCarta(carta);
    resultadosPc.innerText = puntosPc;
    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('cartaPc');
    cartaPc.append(imgCarta);
    if (puntosJugador > 21){
        break;
    }
    } while (puntosPc < puntosJugador && puntosJugador <= 21);

    setTimeout(() => {
        if (puntosJugador === puntosPc) {
            Swal.fire('Empate');
        } else if (puntosJugador > 21){
            Swal.fire('La computadora gana');
        } else if (puntosPc > 21){
            Swal.fire('¡Ganaste!');
        } else {
            Swal.fire('La computadora gana');
        }
    }, 1000);

    btnNuevoJuego.disabled = false;
}

btnDetenerse.addEventListener('click', () => {
    btnPedirCarta.disabled = true;
    btnDetenerse.disabled = true;
    turnoPc(puntosJugador);
})

btnSalir.addEventListener('click', () => {
    Swal.fire({
        text: "¿Seguro que desea salir?",
        showCancelButton: true,
        confirmButtonText: `Si`,
        imageUrl: 'fotos/TristeIcon.png',
        imageHeight: 200,
        imageWidth: 250,
        imageAlt: 'Cara Triste'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Saliendo del juego!',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                            if (b) {
                                b.textContent = Swal.getTimerLeft()
                            }}
                        }, 100)
                    },
                    willClose: () => {
                    clearInterval(timerInterval)
                    }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                    }
                })
            } 
        })       
    })
}) ();