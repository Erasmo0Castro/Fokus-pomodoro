//#region Variables
//cambio en el footer de la pagina
const pie = document.getElementById('pie');
const html = document.querySelector('html');
//variables para cambiar las imagenes en cada seccion-enfoque-largo-corto
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
//variables para la musica de fondo
const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');

//variables para el boton "comenzar que iniciara el temporizador"
const botonInicioPausa = document.querySelector('#start-pause');
const textoInicioPausa = document.querySelector('#start-pause span');
const tiempoEnPantalla = document.querySelector('#timer');
let temporizador = 1500;
let idIntervalo  = null;
const tocarPlay = document.querySelector('#start-pause');
const play = new Audio('./sonidos/play.wav');
const pausarPlay = document.querySelector('#start-pause');
const pausar = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');
const iconoDePausa = document.querySelector('.app__card-primary-butto-icon');


tocarPlay.addEventListener('click', ()=> {
if(temporizador == 5){
    play.play()

    if(temporizador < 5 ){
        pausar.play()
}
}else{
    play.pause
}
})

//Ajustes de la musica de fondo
musica.loop = true;
musica.currentTime = 0;
musica.volume = 0.25;
//---------
inputMusica.addEventListener('change', ()=> {
if (musica.paused) {
    musica.play()
}else{
    musica.pause()
}
}) 


//Ajustes del temporizador en cada seccion
botonEnfoque.addEventListener('click',  () => {
    temporizador = 1500
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active')
});
botonCorto.addEventListener('click', () => {
    temporizador = 300

    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active')
});

botonLargo.addEventListener('click', () => {
    temporizador = 900

    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active')
});

//-------
function cambiarContexto(contexto){
    mostrarTiempo()
   botones.forEach(function(contexto){
    contexto.classList.remove('active')
   })
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`);
    

    //#region Switch
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
            `;
            break;
        default:
            break;
    }
}

const cuentaRegresiva  = () => {
    if(temporizador == 0) {
       audioTiempoFinalizado.play()
       alert ('se acabo el tiempo')
        reiniciar()
        return;
    }
    
    textoInicioPausa.textContent = "Pausar"
    iconoDePausa.setAttribute('src', `/imagenes/pause.png`);
    temporizador -= 1
    mostrarTiempo()
}


botonInicioPausa.addEventListener('click' , iniciarPausar) 

function iniciarPausar (){
    if(idIntervalo){
        pausar.play();
        reiniciar()
        return
    }

    play.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000)
}


function reiniciar(){
    clearInterval(idIntervalo)
    textoInicioPausa.textContent = "Comenzar"
    iconoDePausa.setAttribute('src', `/imagenes/play_arrow.png`);
    idIntervalo = null
}

function mostrarTiempo() {
    const tiempo = new Date( temporizador * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit' , second: '2-digit' })
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo()



pie.innerHTML = 'Este es un proyecto creado con los conocimientos practicos del programa Oracle ONE/ Alura--ERASMO.GRAMING' 
