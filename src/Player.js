import Node from './Node';
import Clock from './Clock';
import {ACTIONS} from './config';

function createPlayerNode() {
    const node = document.createElement('div');
    node.classList.add('chess-player', 'bg-info', 'col-sm-12', 'col-md-6', 'col-lg-6');

    const name = document.createElement('h2');
    node.appendChild(name);

    const passButton = document.createElement('button');
    passButton.classList.add('btn', 'btn-primary');
    passButton.innerHTML = ACTIONS.INITIAL;

    node.appendChild(passButton);

    const clock = new Clock();

    node.appendChild(clock.node);

    return {
        node,
        name,
        passButton,
        clock
    };
}

class Player extends Node {
    constructor(name) {
        super(createPlayerNode());
        this.playerName = name;

        this.isPlayersTurn = false;
        this.initState();
    }
    initState() {
        // setting name
        this.name.appendChild(document.createTextNode(this.playerName));
    }
    startTurn() {
        this.clock.start();
        this.isPlayersTurn = true;
        this.passButton.disabled = false;

        if (this.node.classList.contains('turn-disabled')) {
            this.node.classList.remove('turn-disabled');
        }
    }
    endTurn() {
        this.clock.stop();
        this.isPlayersTurn = false;

        this.passButton.disabled = true;

        if (!this.node.classList.contains('turn-disabled')) {
            this.node.classList.add('turn-disabled');
        }
    }
    reset() {
        if (this.node.classList.contains('turn-disabled')) {
            this.node.classList.remove('turn-disabled');
        }

        this.passButton.innerHTML = ACTIONS.INITIAL;
        this.isPlayersTurn = false;
        this.passButton.disabled = false;
        
        this.clock.reset();
    }
}

export default Player;