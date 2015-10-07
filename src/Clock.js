import Node from './Node';
import {MILLISECONDS, MINUTE_LIMIT} from './config';

/**
 * Creating Dom Elements for Clock class
 *
 * @returns {{node: Element, timeDisplay: Element}}
 */

function createClockNode() {
    const node = document.createElement('div');
    node.classList.add('clock');

    const timeDisplay = document.createElement('span');
    timeDisplay.classList.add('time-display');
    node.appendChild(timeDisplay);

    return {
        node,
        timeDisplay
    };
}

/**
 * Converts milliseconds left to displayable time string
 *
 * @param milliseconds
 * @returns {*}
 */
function displayTime(milliseconds) {
    let seconds = Math.floor(milliseconds / MILLISECONDS) % 60;
    seconds = seconds > 10 ? seconds : '0'+seconds;
    const minutes = Math.floor(milliseconds / MILLISECONDS / 60);


    return `${minutes}:${seconds}`;
}

class Clock extends Node {
    constructor() {
        super(createClockNode());

        this.timeLeft = MINUTE_LIMIT * 60 * 1000;
        this.paused = true;
        this.interval = null;
        this.finished = null;

        this.initState();
    }
    initState() {
        // setting the initial time
        this.timeDisplay.innerHTML = displayTime(this.timeLeft);
    }
    start() {
        this.paused = false;

        if (this.timeLeft > 0) {
            this.interval = setInterval(() => {
                this.timeLeft -= MILLISECONDS;
                if (this.timeLeft === 0) {
                    this.stop();
                    if (this.finished && Object.prototype.toString.call(this.finished) === '[object Function]')
                        this.finished();
                }

                this.timeDisplay.innerHTML = displayTime(this.timeLeft);
            }, MILLISECONDS);
        }
    }
    stop() {
        this.paused = true;

        if (this.interval)
            clearInterval(this.interval);
    }
    reset() {
        this.timeLeft = MINUTE_LIMIT * 60 * 1000;
        this.paused = true;
        this.interval = null;
        this.finished = null;
        this.initState();
    }
}

export default Clock;