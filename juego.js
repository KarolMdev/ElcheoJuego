// Array con palabras válidas de 4 letras.
const palabras = ["casa", "lobo", "mesa", "pato", "vaca", 
    "rama", "foca", "lago", "nube", "cheo",
    "sola", "luna", "toro", "pelo", "risa",
    "alma", "nuez", "miel", "roca", "vino",
    "seda", "arte", "sopa", "cafe", "tiza",
    "duro", "gato", "lima", "rosa", "solo",
    "cola", "bajo", "alto", "cero", "dado",
    "lomo", "pico", "rana", "mina", "humo",
    "liso", "muro", "lava", "neon", "peso",
    "codo", "cara", "pata", "moto", "auto"
];

// Objeto que asocia cada palabra a su pista correspondiente.
const pistas = {
    "casa": "Un refugio donde se teje la vida diaria.",
    "lobo": "El espíritu salvaje que guía en la penumbra.",
    "mesa": "Un escenario silencioso para encuentros y banquetes.",
    "pato": "Con pasos tambaleantes, adorna lagos en su paso.",
    "vaca": "Una noble presencia que susurra en los campos al alba.",
    "rama": "Una extensión natural que se desprende de la grandeza.",
    "foca": "Un danzarín del hielo, moviéndose con sutil elegancia.",
    "lago": "Un espejo mudo que guarda secretos en calma.",
    "nube": "Un viajero efímero del cielo, siempre en transformación.",
    "cheo": "Un enigma, un apodo que desafía una explicación sencilla.",
    "sola": "Brilla en lo alto, inmutable en el cenit.",
    "luna": "Guardián nocturno, espejo de los sueños.",
    "toro": "Fuerza indomable en el ruedo de la vida.",
    "pelo": "Hilos delicados que cuentan historias de identidad.",
    "risa": "Un destello que ilumina el rostro en momentos felices.",
    "alma": "El núcleo inmaterial que define a una persona.",
    "nuez": "Un pequeño enigma encapsulado en una cáscara dura.",
    "miel": "Dulzura natural que endulza la existencia.",
    "roca": "Eterna y firme, testigo silencioso del tiempo.",
    "vino": "Brebaje que evoca memorias en cada sorbo.",
    "seda": "Tacto suave que se desliza como un susurro.",
    "arte": "Expresión sublime que trasciende lo ordinario.",
    "sopa": "Caldo reconfortante en días fríos.",
    "cafe": "Energía oscura que despierta la mente.",
    "tiza": "Polvo efímero que deja huellas en la pizarra.",
    "duro": "Una cualidad inflexible que se percibe al tacto.",
    "gato": "Felino misterioso que camina con sigilo.",
    "lima": "Un toque ácido que realza sabores y colores.",
    "rosa": "Delicadeza y fragancia en un simple pétalo.",
    "solo": "La singularidad en medio de la multitud.",
    "cola": "Extremo discreto que da balance a la figura.",
    "bajo": "Posición que se sitúa en la parte inferior.",
    "alto": "El vértice desde el que se contempla el mundo.",
    "cero": "El punto inicial que marca la ausencia.",
    "dado": "Objeto azaroso en manos del destino.",
    "lomo": "Superficie que respalda el vigor de un ser.",
    "pico": "El apice afilado que desafía el cielo.",
    "rana": "Saltarina habitante de charcos y cuentos.",
    "mina": "Tesoro oculto en la penumbra de la tierra.",
    "humo": "Emanación sutil que se disipa en el aire.",
    "liso": "Una textura sin imperfecciones ni arrugas.",
    "muro": "Barrera sólida que guarda secretos detrás.",
    "lava": "Corriente ardiente que renueva la tierra.",
    "neon": "Luz vibrante que pinta la noche en colores.",
    "peso": "Medida sutil de la resistencia del ser.",
    "codo": "Curva natural en el camino del movimiento.",
    "cara": "Reflejo que guarda la esencia de lo vivido.",
    "pata": "Extremidad que impulsa y sostiene el andar.",
    "moto": "Ritmo veloz en dos ruedas que desafía el viento.",
    "auto": "Engranaje moderno que lleva al destino veloz."
};

// Seleccionar una palabra secreta y mostrar la pista asociada.
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
// Elemento para mostrar la pista.
const pistaElemento = document.getElementById("pista");
pistaElemento.innerText = "Pista: " + pistas[palabraSecreta];

let intentos = 6;
let intentoActual = 0;

const grid = document.getElementById("grid");
const mensaje = document.getElementById("mensaje");
const resetButton = document.getElementById("resetbutton");

// Crear la cuadrícula vacía: 6 filas x 4 columnas.
for (let i = 0; i < 6 * 4; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
}

// Función para verificar la palabra ingresada.
function verificarPalabra() {
    let input = document.getElementById("inputWord").value.toLowerCase();
    
    // Verificar que la palabra tenga 4 letras y esté en la lista de palabras válidas.
    if (input.length !== 4 ) {
        mensaje.innerText = "Escribe una palabra válida de 4 letras.";
        return;
    }

    let row = document.querySelectorAll(".cell");
    let startIndex = intentoActual * 4;

    // Recorrer cada letra de la palabra ingresada y actualizar la cuadrícula con colores según corresponda.
    for (let i = 0; i < 4; i++) {
        row[startIndex + i].innerText = input[i];

        if (input[i] === palabraSecreta[i]) {
            row[startIndex + i].classList.add("correct"); // Letra en la posición correcta.
        } else if (palabraSecreta.includes(input[i])) {
            row[startIndex + i].classList.add("present"); // Letra en la palabra pero en posición distinta.
        } else {
            row[startIndex + i].classList.add("absent");  // Letra que no está en la palabra.
        }
    }

    // Si el usuario adivinó la palabra secreta.
    if (input === palabraSecreta) {
        mensaje.innerText = "¡Felicidades! Adivinaste la palabra.";
        document.getElementById("inputWord").disabled = true;
        resetButton.style.display = "block";
        return;
    }

    intentoActual++;
    intentos--;

    // Si se han agotado los intentos.
    if (intentos === 0) {
        mensaje.innerText = `Perdiste. La palabra era "${palabraSecreta}".`;
        document.getElementById("inputWord").disabled = true;
        resetButton.style.display = "block";
    }

    // Limpiar el campo de entrada para el siguiente intento.
    document.getElementById("inputWord").value = "";
}

// Función para reiniciar el juego.
function reiniciar_juego() {
    // Seleccionar una nueva palabra secreta y actualizar la pista.
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    pistaElemento.innerText = "Pista: " + pistas[palabraSecreta];

    // Resetear contadores y mensajes.
    intentos = 6;
    intentoActual = 0;
    mensaje.innerText = "";
    document.getElementById("inputWord").disabled = false;
    document.getElementById("inputWord").value = "";
    resetButton.style.display = "none";

    // Limpiar la cuadrícula: vaciar celdas y quitar clases de colores.
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("correct", "present", "absent");
    });
}
