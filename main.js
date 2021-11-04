// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { createButtons, show } from './lib/ui.js';
import {computerPlay} from './lib/rock-paper-scissors.js';
import {checkGame} from './lib/rock-paper-scissors.js';
import { updateResultScreen } from './lib/ui.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];
let n = 0;
let sigurvegari = "";
let result = 0;


/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  
  let computer = computerPlay();
  result = checkGame(player,computer);
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  if (result === 1){
    playerWins = playerWins + 1;
  } else if (result === -1){
    computerWins = computerWins + 1;
  }
  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });
  show('result');
  

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil

  // Ákveðum hvaða takka skuli sýna

  // Sýnum niðurstöðuskjá
}
document
.querySelector('.button.nextRound')
.addEventListener('click', ()=> round(null));
document
.querySelector('.button.finishGame')
.addEventListener('click', () =>finishGame());


/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  // TODO útfæra
  if(e !== null){
    totalRounds = Number.parseInt(e.target.innerText);
    currentRound = 1;
    playerWins = 0;
    computerWins = 0;
  }
  if (result !== 0){
  currentRound = currentRound + 1;
  }
  show('play');


}


// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));


document
  .querySelector('.start button')
  .addEventListener('click', () => createButtons(MAX_BEST_OF, round));

  document
  .querySelector('.start button')
  .addEventListener('click', () => currentRound = 0);
// Búum til takka
// createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
// TODO
document
  .querySelector('button.scissor')
  .addEventListener('click', ()=> playRound('1'));

document
  .querySelector('button.paper')
  .addEventListener('click', () => playRound('2'));

document
  .querySelector('button.rock')
  .addEventListener('click', () => playRound('3'));
/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  if (playerWins > totalRounds/2){
    let win = true;
    games[n] = {playerWins, computerWins, win};
    sigurvegari = "Þú vannst ";
    totalWins++;
    n++;
  }else if (computerWins > totalRounds/2){
    let win = false;
    games[n] = {playerWins, computerWins, win};
    sigurvegari = "Tölva vann ";
    n++;
  }
  currentRound = 0;
  if(n > 0){
    const gameStats = document.querySelector('.games__list');
    const f = document.createElement('li');
    f.className = ('gameRes');
    f.textContent = (sigurvegari + playerWins + "-" + computerWins);
    gameStats.appendChild(f);
    const fjoldi = document.querySelector('.games__played');
    fjoldi.textContent = (n);
    const fjoldiSigra = document.querySelector('.games__wins');
    fjoldiSigra.textContent = (totalWins);
    const fjoldiOsigra = document.querySelector('.games__losses');
    let g = n - totalWins;
    fjoldiOsigra.textContent = (g);
    const hlutfSigra = document.querySelector('.games__winratio');
    let hlutf = (totalWins/n)*100;
    hlutf = hlutf.toFixed(2);
    let evilHlutf = 100.00 - hlutf;
    evilHlutf = evilHlutf.toFixed(2);
    hlutfSigra.textContent = (hlutf);
    const hlutfOsigra = document.querySelector('.games__lossratio');
    hlutfOsigra.textContent = (evilHlutf);
  }
  show('rounds')

}