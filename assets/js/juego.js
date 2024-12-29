let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;
// Recursos

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');   
const btnJuego = document.querySelector('#btnJuego');   

const puntosHTML = document.querySelectorAll('small');
const divImgJugador = document.querySelector('#jugador-cartas');
const divImgComputadora = document.querySelector('#computadora-cartas');

// Esta función crea un nuevo deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let esp of especiales) {
        for (let tipo of tipos) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    // Shuffle devuelve un nuevo arreglo
    deck = _.shuffle(deck);

    return deck;
}

crearDeck()



// Esta funcion permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) { // Cuando uso lenght es un number
        throw 'No hay cartas en el deck'; // throw muestra error en consola
    }

    const carta = deck.pop(); // Toma el ultimo valor y lo retorna

    return carta;
}

const turnoComputadora = (puntosMinimos) => {
    do {
         // los puntosMinimos son los puntos del Jugador
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img'); 
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divImgComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 10);
}


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Obtiene el valor de la carta pero ignorando el último
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;

    // let puntos = 0;
    // if ( isNaN(valor)) {
    //     console.log('No es un número');

    //     puntos = (valor === 'A') ? 11: 10;

    // } else {
    //     console.log('Es un número');
    //     puntos = valor * 1;
    // }



}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img'); 
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divImgJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
})

btnJuego.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divImgJugador.innerHTML = '';  // Limpia el div 
    divImgComputadora.innerHTML = '';  // Limpia el div

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})