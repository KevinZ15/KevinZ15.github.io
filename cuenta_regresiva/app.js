const contador = () => {
    const fechaDeseada = new Date ('January, 29 2022 00:00:00').getTime ();
    const fechaActual = new Date ().getTime();
    const diferencia = fechaDeseada - fechaActual
    const segundos = 1000,minutos = segundos * 60,horas = minutos * 60,dias = horas * 24;
    const diasTexto = document.querySelector('#dias').innerText = Math.floor(diferencia / dias);
    const horasTexto = document.querySelector('#horas').innerText = Math.floor((diferencia % dias) / horas);
    const minutosTexto = document.querySelector('#minutos').innerText = Math.floor((diferencia % horas) / minutos);
    const segundosTexto = document.querySelector('#segundos').innerText = Math.floor((diferencia % minutos) / segundos);
}
setInterval(contador, 1000)