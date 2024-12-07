import { questions } from './questions.js';

let index = 0; 
let correctas = 0; 

///
function showResult(corr, inc)
{
    const result = document.querySelector(".result");
    const resultTrue = document.getElementById('resultTrue');
    const resultFalse = document.getElementById('resultFalse');

    result.classList.remove("result__disabled"); 
    resultTrue.innerText = corr;
    resultFalse.innerText = inc;
}
// FUNCION PARA SELECCIONAR LA OPCION CORRECTA: 
function selectOption(optionDiv, correctOption) {
    const opSelected = optionDiv.textContent;
    if (opSelected === correctOption) {
        optionDiv.classList.add("option__true");
        correctas++;
    } else {
        optionDiv.classList.add("option__false");
    }

    // Remarcamos la opción correcta
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach((e) => {
        if (e.textContent === correctOption) {
            e.classList.add('option__true');
        }
        e.style.pointerEvents = 'none'; 
    });
}

// FUNCION PARA CARGAR LA SIGUIENTE PREGUNTA
function next(questions, index) {
    if (index >= questions.length) 
    {
        showResult(correctas, questions.length - correctas);
        document.querySelector(".questions").classList.add("questions__disabled");
        return; 
    }

    const questions__title = document.querySelector(".questions__title");
    const options = document.querySelector(".options");

    questions__title.textContent = questions[index].pregunta; // Muestra la pregunta actual

    options.innerHTML = ''; // Limpiar opciones anteriores

    // Crear las opciones de la pregunta
    questions[index].opciones.forEach(element => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = element;
        options.appendChild(optionDiv);

        // Define el manejador para el clic
        function handleClick() {
            selectOption(optionDiv, questions[index].opcion_correcta); // Verifica la respuesta seleccionada
            optionDiv.removeEventListener('click', handleClick); // Deshabilita el clic una vez seleccionada la opción
        }

        // Asocia el evento de clic
        optionDiv.addEventListener('click', handleClick);
    });

    // Incrementa el índice para la siguiente pregunta
    return index + 1;
}

// FUNCION INICIO DEL JUEGO
const btnStart = document.getElementById('btn_start');
const boxQuestions = document.querySelector(".questions");
btnStart.addEventListener('click', () => {
    btnStart.classList.add('btn__disabled'); 
    boxQuestions.classList.remove('questions__disabled'); 
    index = next(questions, index); 
});

// BOTÓN PARA LA SIGUIENTE PREGUNTA
const btnNext = document.getElementById('next');
btnNext.addEventListener('click', () => {
    index = next(questions, index); 
});

document.getElementById('btnRetry').addEventListener('click', ()=>{
    location.reload();
})