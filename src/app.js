import Player from './Player';
import Game from './Game';
import {ACTIONS} from './config';

const game = new Game();

// Getting Players Names
const player1 = new Player(prompt("What is Player 1's name?"));
const player2 = new Player(prompt("What is Player 2's name?"));

const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Game';
resetButton.classList.add('btn', 'btn-danger', 'btn-reset');

game.add(player1, player2, resetButton);

// Registering Game Logic
game.registerGameLogic('endTurn', (player) => {
    const opponent = player === player1 ? player2 : player1;

    if (player.passButton.innerHTML === ACTIONS.INITIAL) {
        game.start();

        player.passButton.innerHTML = opponent.passButton.innerHTML = ACTIONS.DURATION;
        player.startTurn();
        opponent.endTurn();
        return;
    }

    if (player.clock.timeLeft === 0) {
        player.clock.reset();
        opponent.clock.reset();
    }

    player.endTurn();

    if (opponent.clock.timeLeft > 0) {
        opponent.startTurn();
    }
});

game.registerGameLogic('reset', () => {
    game.reset();
    player1.reset();
    player2.reset();
});

const player1Logic = game.triggerGameLogic.bind(game, 'endTurn', player1);
player1.passButton.addEventListener('click', player1Logic);
player1.clock.finished = player1Logic;

const player2Logic = game.triggerGameLogic.bind(game, 'endTurn', player2);
player2.passButton.addEventListener('click', player2Logic);
player2.clock.finished = player2Logic;

resetButton.addEventListener('click', game.triggerGameLogic.bind(game, 'reset'));

// Fire Off!
if (player1 && player2) {
    document.getElementById('app').appendChild(game.node);
}


