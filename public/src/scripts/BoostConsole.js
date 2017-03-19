var $ = require('jquery');
var Console = require('./Console');

var keyFilter = function (keyCode) {
    var valid =
        (keyCode > 47 && keyCode < 58)   || // number keys
        keyCode == 32 || keyCode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keyCode > 64 && keyCode < 91)   || // letter keys
        (keyCode > 95 && keyCode < 112)  || // numpad keys
        (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
        (keyCode > 218 && keyCode < 223);   // [\]' (in order)
    return valid;
};

var keyEventMap = {
    8: 'console.char.remove',
    13: 'console.char.enter'
};

/**
 * @constructor BoostConsole
 */
var BoostConsole = function (element) {
    this.$element = $(element);
    this.$tab = $(element).find('.tab');
    this.consoles = this.consoles || [];
    this.currentConsole = this.consoles[0];
    if(this.consoles.length === 0) {
        this.addConsole();
    }

    this.$tab.on('click', '.add', this.addButtonHandler.bind(this));
    this.$tab.on('click', '.tab-console', this.consoleTabHandler.bind(this));

    $(document).on('keydown', this.keyDown.bind(this));
    $(document).on('keypress', this.keyPress.bind(this));
};

BoostConsole.tmlTabItem = '<li class="tab-item tab-console"></li>';

BoostConsole.prototype.switchConsole = function (id) {
    var self = this;
    self.consoles.some(function (cle) {
        if(cle.id === id) {
            if(self.currentConsole) {
                self.currentConsole.hide();
            }
            self.currentConsole = cle.show();
            return true;
        }
    });
    self.$tab.find('.tab-console').removeClass('active').each(function () {
        if($(this).data('console-id') === id) {
            $(this).addClass('active');
        }
    });
};

BoostConsole.prototype.addConsole = function () {
    var newConsoleEl = Console.createConsoleEl().hide();
    this.$element.append(newConsoleEl);
    var newConsole = new Console(this.$element.find('.console').last());
    var newConsoleId = newConsole.id;
    this.consoles.push(newConsole);
    var newTab = $(BoostConsole.tmlTabItem)
        .insertBefore(this.$tab.find('.add'))
        .text('console - ' + newConsoleId);
    newTab.data('console-id', newConsoleId);
    // switch to new console
    this.switchConsole(newConsole.id);
};

BoostConsole.prototype.addButtonHandler = function (e) {
    this.addConsole();
    e.preventDefault();
    return false;
};

BoostConsole.prototype.consoleTabHandler = function (e) {
    var consoleId = $(e.target).data('console-id');
    if(this.currentConsole.id != consoleId) {
        this.switchConsole(consoleId);
    }
    e.preventDefault();
    return false;
};

BoostConsole.prototype.keyDown = function (e) {
    var keyCode = e.which;
    var keyEvent = keyEventMap[keyCode];
    if(keyEvent) {
        this.currentConsole.$element.trigger(keyEvent);
        return false;
    }
    if(!keyFilter(keyCode)) {
        return false;
    }
};

BoostConsole.prototype.keyPress = function (e) {
    e.preventDefault();
    var keyCode = e.which;
    var char = String.fromCharCode(keyCode);
    this.currentConsole.$element.trigger('console.chart.add', char);
    return false;
};

module.exports = BoostConsole;