
const ID_QUESTION = 'questionText';
const ID_OPTIONS = 'options';
const ID_FEEDBACK = 'feedback';
const ID_WELCOME = 'welcome';
const ID_QUIZ = 'quiz';

const QUESTIONS = [
    { text: 'Quem é conhecido como o "Rei do Futebol"?', options: ['Pelé','Maradona','Messi'], correct: 0 },
    { text: 'Qual clube Colombiano levantou a taça da Libertadores em 2004?', options: ['Once Caldas','Atletico Nacional','Colo Colo'], correct: 0 },
    { text: 'Qual foi o placar da final da copa do mundo de 2018?', options: ['1x0','2x1','4x2'], correct: 2},
    { text: 'Qual o jogador com mais gols na história da Champions League?', options: ['Ozil','Messi','Cristiano Ronaldo'], correct: 2 },
    { text: 'Em quantas finais de libertadores o Palmeiras participou?', options: ['5','7','3'], correct: 1 },
    { text: 'Quantas vezes o corinthians foi eliminado na pré-libertadores?', options: ['2','6','3'], correct: 2 },
    { text: 'Qual jogador do Palmeiras marcou o gol do título brasileiro de 2018?', options: ['Dudu','Willian','Zezeca'], correct: 0 }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft;

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
 // Atualizar progresso
 const progressPercent = ((currentIndex + 1) / QUESTIONS.length) * 100;
 document.getElementById('progress-bar').style.setProperty('--progress-width', `${progressPercent}%`);
 document.getElementById('progress-text').innerText = `Pergunta ${currentIndex + 1} de ${QUESTIONS.length}`;
 timeLeft = 15;
 document.getElementById('timer').innerText = `Tempo: ${timeLeft}`;
 timer = setInterval(() => {
     timeLeft--;
     document.getElementById('timer').innerText = `Tempo: ${timeLeft}`;
     if (timeLeft <= 0) {
         clearInterval(timer);
         timeUp();
     }
 }, 1000);
}

function answer(choice) {
 clearInterval(timer);
 const q = QUESTIONS[currentIndex];
 const correct = choice === q.correct;
 const fb = document.getElementById(ID_FEEDBACK);
 if (choice === -1) {
     fb.innerText = 'Tempo esgotado!';
     fb.style.color = 'orange';
 } else {
     fb.innerText = correct ? 'Certa!' : 'Errada!';
     fb.style.color = correct ? 'green' : 'red';
     if (correct) score++;
 }
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

function timeUp() {
 answer(-1);
}

function endQuiz() {
 document.getElementById(ID_QUESTION).innerText = `Fim do Quiz! Você acertou ${score} de ${QUESTIONS.length} perguntas.`;
 document.getElementById(ID_OPTIONS).innerHTML = '';
 document.getElementById('timer').innerText = '';
 document.getElementById('progress-container').style.display = 'none';
}

window.onload = () => {

 document.getElementById(ID_WELCOME).style.display = 'block';
 document.getElementById(ID_QUIZ).style.display = 'none';
};
