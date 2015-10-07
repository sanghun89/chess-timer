import Node from './Node';
import {TITLE} from './config';

function createGameNode() {
    const node = document.createElement('div');
    node.classList.add('chess-game', 'container', 'clearfix');

    const gameTitle = document.createElement('h1');
    gameTitle.innerHTML = TITLE;

    node.appendChild(gameTitle);

    return {
        node
    };
}

class Game extends Node {
    constructor() {
        super(createGameNode());
        this.gameLogic = {};

        this.initState();
    }
    add(...args) {
        //const node = obj instanceof
        args.forEach((node) => {
            node = node.node ? node.node : node;

            this.node.appendChild(node);
        });
    }
    triggerGameLogic(action, data) {
        this.gameLogic[action].forEach(f => f.call(this, data));
    }
    registerGameLogic(action, func) {
        this.gameLogic[action] = this.gameLogic[action] || [];
        this.gameLogic[action].push(func);
    }
    start() {
        this.node.classList.add('game-started');
    }
    reset() {
        this.node.classList.remove('game-started');
    }
}

export default Game;