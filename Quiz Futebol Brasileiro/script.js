
const ID_QUESTION = 'questionText';
const ID_OPTIONS = 'options';
const ID_FEEDBACK = 'feedback';
const ID_WELCOME = 'welcome';
const ID_QUIZ = 'quiz';

const QUESTIONS = [
    { text: 'Quem é conhecido como o "Rei do Futebol"?', options: ['Pelé','Maradona','Messi'], correct: 0 },
    { text: 'Qual clube carioca levantou a taça da Libertadores em 2019?', options: ['Flamengo','Fluminense','Vasco'], correct: 0 },
    { text: 'Quantos títulos mundiais de clubes o Corinthians conquistou na década de 2000?', options: ['0','1','2'], correct: 1 },
    { text: 'Qual seleção venceu a Copa do Mundo de 2002?', options: ['Brasil','Argentina','França'], correct: 0 },
    { text: 'Qual jogador brasileiro marcou 15 gols em Copas do Mundo?', options: ['Romário','Ronaldo','Zico'], correct: 1 },
    { text: 'Em que ano o Palmeiras conquistou a Copa Libertadores pela primeira vez?', options: ['1999','2000','2001'], correct: 0 },
    { text: 'Qual jogador do Palmeiras marcou o gol do título brasileiro de 2018?', options: ['Dudu','Willian','Zezeca'], correct: 0 }
];

let currentIndex = 0;
let score = 0;

function startQuiz() {
 document.getElementById(ID_WELCOME).style.display = 'none';
 document.getElementById(ID_QUIZ).style.display = 'block';
 currentIndex = 0;
 score = 0;
 showQuestion();
}

function showQuestion() {
 const q = QUESTIONS[currentIndex];
 document.getElementById(ID_QUESTION).innerText = q.text;
 const opts = document.getElementById(ID_OPTIONS);
 opts.innerHTML = '';
 q.options.forEach((opt, i) => {
 const btn = document.createElement('button');
 btn.innerText = opt;
 btn.onclick = () => answer(i);
 opts.appendChild(btn);
 });
}

function answer(choice) {
 const q = QUESTIONS[currentIndex];
 const correct = choice === q.correct;
 const fb = document.getElementById(ID_FEEDBACK);
 fb.innerText = correct ? 'Certa!' : 'Errada!';
 fb.style.color = correct ? 'green' : 'red';
 if (correct) score++;
 setTimeout(() => {
     fb.innerText = '';
     currentIndex++;
     if (currentIndex < QUESTIONS.length) {
         showQuestion();
     } else {
         endQuiz();
     }
 }, 1000);
}

function endQuiz() {
 document.getElementById(ID_QUESTION).innerText = `Fim! Você acertou ${score} de ${QUESTIONS.length}`;
 document.getElementById(ID_OPTIONS).innerHTML = '';
}

window.onload = () => {

 document.getElementById(ID_WELCOME).style.display = 'block';
 document.getElementById(ID_QUIZ).style.display = 'none';
};
