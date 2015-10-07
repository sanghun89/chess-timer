(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _config = require('./config');

/**
 * Creating Dom Elements for Clock class
 *
 * @returns {{node: Element, timeDisplay: Element}}
 */

function createClockNode() {
    var node = document.createElement('div');
    node.classList.add('clock');

    var timeDisplay = document.createElement('span');
    timeDisplay.classList.add('time-display');
    node.appendChild(timeDisplay);

    return {
        node: node,
        timeDisplay: timeDisplay
    };
}

/**
 * Converts milliseconds left to displayable time string
 *
 * @param milliseconds
 * @returns {*}
 */
function displayTime(milliseconds) {
    var seconds = Math.floor(milliseconds / _config.MILLISECONDS) % 60;
    seconds = seconds > 10 ? seconds : '0' + seconds;
    var minutes = Math.floor(milliseconds / _config.MILLISECONDS / 60);

    return minutes + ':' + seconds;
}

var Clock = (function (_Node) {
    _inherits(Clock, _Node);

    function Clock() {
        _classCallCheck(this, Clock);

        _get(Object.getPrototypeOf(Clock.prototype), 'constructor', this).call(this, createClockNode());

        this.timeLeft = _config.MINUTE_LIMIT * 60 * 1000;
        this.paused = true;
        this.interval = null;
        this.finished = null;

        this.initState();
    }

    _createClass(Clock, [{
        key: 'initState',
        value: function initState() {
            // setting the initial time
            this.timeDisplay.innerHTML = displayTime(this.timeLeft);
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this.paused = false;

            if (this.timeLeft > 0) {
                this.interval = setInterval(function () {
                    _this.timeLeft -= _config.MILLISECONDS;
                    if (_this.timeLeft === 0) {
                        _this.stop();
                        if (_this.finished && Object.prototype.toString.call(_this.finished) === '[object Function]') _this.finished();
                    }

                    _this.timeDisplay.innerHTML = displayTime(_this.timeLeft);
                }, _config.MILLISECONDS);
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.paused = true;

            if (this.interval) clearInterval(this.interval);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.timeLeft = _config.MINUTE_LIMIT * 60 * 1000;
            this.paused = true;
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            this.initState();
        }
    }]);

    return Clock;
})(_Node3['default']);

exports['default'] = Clock;
module.exports = exports['default'];

},{"./Node":3,"./config":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _config = require('./config');

function createGameNode() {
    var node = document.createElement('div');
    node.classList.add('chess-game', 'container', 'clearfix');

    var gameTitle = document.createElement('h1');
    gameTitle.innerHTML = _config.TITLE;

    node.appendChild(gameTitle);

    return {
        node: node
    };
}

var Game = (function (_Node) {
    _inherits(Game, _Node);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, createGameNode());
        this.gameLogic = {};

        this.initState();
    }

    _createClass(Game, [{
        key: 'add',
        value: function add() {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            //const node = obj instanceof
            args.forEach(function (node) {
                node = node.node ? node.node : node;

                _this.node.appendChild(node);
            });
        }
    }, {
        key: 'triggerGameLogic',
        value: function triggerGameLogic(action, data) {
            var _this2 = this;

            this.gameLogic[action].forEach(function (f) {
                return f.call(_this2, data);
            });
        }
    }, {
        key: 'registerGameLogic',
        value: function registerGameLogic(action, func) {
            this.gameLogic[action] = this.gameLogic[action] || [];
            this.gameLogic[action].push(func);
        }
    }, {
        key: 'start',
        value: function start() {
            this.node.classList.add('game-started');
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.node.classList.remove('game-started');
        }
    }]);

    return Game;
})(_Node3['default']);

exports['default'] = Game;
module.exports = exports['default'];

},{"./Node":3,"./config":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = (function () {
  /**
   * Initializing Node
   * @param node
   */

  function Node(elems) {
    _classCallCheck(this, Node);

    Object.assign(this, elems);
  }

  /**
   * Initializing State
   */

  _createClass(Node, [{
    key: "initState",
    value: function initState() {}

    /**
     * Resetting State
     */
  }, {
    key: "reset",
    value: function reset() {}
  }]);

  return Node;
})();

exports["default"] = Node;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _config = require('./config');

function createPlayerNode() {
    var node = document.createElement('div');
    node.classList.add('chess-player', 'bg-info', 'col-sm-12', 'col-md-6', 'col-lg-6');

    var name = document.createElement('h2');
    node.appendChild(name);

    var passButton = document.createElement('button');
    passButton.classList.add('btn', 'btn-primary');
    passButton.innerHTML = _config.ACTIONS.INITIAL;

    node.appendChild(passButton);

    var clock = new _Clock2['default']();

    node.appendChild(clock.node);

    return {
        node: node,
        name: name,
        passButton: passButton,
        clock: clock
    };
}

var Player = (function (_Node) {
    _inherits(Player, _Node);

    function Player(name) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, createPlayerNode());
        this.playerName = name;

        this.isPlayersTurn = false;
        this.initState();
    }

    _createClass(Player, [{
        key: 'initState',
        value: function initState() {
            // setting name
            this.name.appendChild(document.createTextNode(this.playerName));
        }
    }, {
        key: 'startTurn',
        value: function startTurn() {
            this.clock.start();
            this.isPlayersTurn = true;
            this.passButton.disabled = false;

            if (this.node.classList.contains('turn-disabled')) {
                this.node.classList.remove('turn-disabled');
            }
        }
    }, {
        key: 'endTurn',
        value: function endTurn() {
            this.clock.stop();
            this.isPlayersTurn = false;

            this.passButton.disabled = true;

            if (!this.node.classList.contains('turn-disabled')) {
                this.node.classList.add('turn-disabled');
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this.node.classList.contains('turn-disabled')) {
                this.node.classList.remove('turn-disabled');
            }

            this.passButton.innerHTML = _config.ACTIONS.INITIAL;
            this.isPlayersTurn = false;
            this.passButton.disabled = false;

            this.clock.reset();
        }
    }]);

    return Player;
})(_Node3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"./Clock":1,"./Node":3,"./config":6}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _config = require('./config');

var game = new _Game2['default']();

// Getting Players Names
var player1 = new _Player2['default'](prompt("What is Player 1's name?"));
var player2 = new _Player2['default'](prompt("What is Player 2's name?"));

var resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Game';
resetButton.classList.add('btn', 'btn-danger', 'btn-reset');

game.add(player1, player2, resetButton);

// Registering Game Logic
game.registerGameLogic('endTurn', function (player) {
    var opponent = player === player1 ? player2 : player1;

    if (player.passButton.innerHTML === _config.ACTIONS.INITIAL) {
        game.start();

        player.passButton.innerHTML = opponent.passButton.innerHTML = _config.ACTIONS.DURATION;
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

game.registerGameLogic('reset', function () {
    game.reset();
    player1.reset();
    player2.reset();
});

var player1Logic = game.triggerGameLogic.bind(game, 'endTurn', player1);
player1.passButton.addEventListener('click', player1Logic);
player1.clock.finished = player1Logic;

var player2Logic = game.triggerGameLogic.bind(game, 'endTurn', player2);
player2.passButton.addEventListener('click', player2Logic);
player2.clock.finished = player2Logic;

resetButton.addEventListener('click', game.triggerGameLogic.bind(game, 'reset'));

// Fire Off!
if (player1 && player2) {
    document.getElementById('app').appendChild(game.node);
}

},{"./Game":2,"./Player":4,"./config":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var ACTIONS = {
    INITIAL: 'Start First',
    DURATION: 'End Turn'
};

var MINUTE_LIMIT = 4;
var MILLISECONDS = 1000;
var TITLE = 'Chess Timer';

exports['default'] = {
    ACTIONS: ACTIONS,
    MINUTE_LIMIT: MINUTE_LIMIT,
    MILLISECONDS: MILLISECONDS,
    TITLE: TITLE
};
module.exports = exports['default'];

},{}]},{},[5]);
