var $ = require('jquery');
var Console = require('./Console');

var tmlConsole = '<div class="console">' + 
                    '<div class="container">' +
                    '</div>' +
                 '</div>';
var tmlRow = '<div class="row">' + 
                '<div class="content"></div>' +
                '<div class="cursor"></div>' +
             '</div>';

var createConsoleRow = function (option) {
    option = option || {};
    option = Object.assign({}, {
        editable: false
    }, option);
    var el = $(tmlRow);
    if(option.editable) {
        el.addClass('editable');
    }
    return el;
};

var createConsoleEl = function () {
    var newConsole = $(tmlConsole);
    var newRow = createConsoleRow({editable: true});
    newConsole.find('.container').append(newRow);
    return newConsole;
};

var keyMaps = function (keyCode) {
    switch(keyCode) {
        default: return String.fromCharCode(keyCode);
    }
};

/**
 * @constructor BoostConsole
 */
var BoostConsole = function (element) {
    this.$element = $(element);
    this.consoles = this.consoles || [];
    this.currentConsole = this.consoles[0];
    if(this.consoles.length === 0) {
        this.$element.append(createConsoleEl());
        this.currentConsole = new Console(this.$element.find('.console').first());
        this.consoles.push(this.currentConsole);
    }

    $(document).on('keypress', this.input.bind(this));
};

BoostConsole.prototype.input = function (e) {
    var keyCode = e.which;
    var char = keyMaps(keyCode);
    this.currentConsole.$element.trigger('console.add.chart', char);
    e.preventDefault();
    return false;
};

module.exports = BoostConsole;