(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    let puntosJugadores = [];
    // Recursos

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnJuego = document.querySelector('#btnJuego');


    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');


    // Inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }
    // Esta función crea un nuevo deck
    const crearDeck = () => {

        let deck = [];

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

        return _.shuffle(deck);
    }

    // Esta funcion permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    };

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

    // 0: Jugador, Ultimo: Computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            // los puntosMinimos son los puntos del Jugador
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

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




    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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

        inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        for (let i = 0; i < puntosJugadores.length; i++) {
            puntosJugadores[i] = 0;
        }

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divImgJugador.innerHTML = '';  // Limpia el div 
        // divImgComputadora.innerHTML = '';  // Limpia el div

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })
})();