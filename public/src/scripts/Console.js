var $ = require('jquery');

var getId = (function () {
    var counter = 1;
    return function () {
        return counter++;
    };
})();

var defaultConfig = {};

/**
 * @constructor Console
 */
var Console = function (element, config) {
    config = config || {};
    config = Object.assign({}, defaultConfig, config);
    this.id = getId();
    this.$element = $(element);
    this.$currentRow = $(element).find('.row:first-child');

    this.$element.on('console.chart.add', this.addChar.bind(this));
    this.$element.on('console.char.remove', this.removeChar.bind(this));
    this.$element.on('console.char.enter', this.enterChar.bind(this));
};

// class members
Console.tmlConsole = '<div class="console">' + 
                       '<div class="container">' +
                      '</div>' +
                     '</div>';

Console.basePrefix = '<span>&gt;</span>';

Console.tmlRow = '<div class="row">' + 
                   '<div class="prefix">' + Console.basePrefix +'</div>' +
                   '<div class="content"></div>' +
                   '<div class="cursor"></div>' +
                 '</div>';

Console.createConsoleRow = function (option) {
    option = option || {};
    option = Object.assign({}, {
        editable: false
    }, option);
    var el = $(Console.tmlRow);
    if(option.editable) {
        el.addClass('editable');
    }
    else {
        el.find('.cursor').remove();
    }
    return el;
};

Console.createConsoleEl = function () {
    var newConsole = $(Console.tmlConsole);
    var newRow = Console.createConsoleRow({editable: true});
    newConsole.find('.container').append(newRow);
    return newConsole;
};

Console.prototype.addRow = function (option) {
    var newRow = Console.createConsoleRow(option);
    this.$currentRow.find('.cursor').remove();
    this.$element.find('.container').append(newRow);
    this.$currentRow = this.$element.find('.row').last();
};

Console.prototype.addChar = function (e, char) {
    var span = $('<span></span>');
    span.text(char);
    this.$currentRow.find('.content').append(span);
    e.preventDefault();
};

Console.prototype.removeChar = function (e) {
    this.$currentRow.find('.content span').last().remove();
    e.preventDefault();
};

Console.prototype.enterChar = function (e) {
    var option = {
        editable: true
    };
    this.addRow(option);
    e.preventDefault();
    return false;
};

Console.prototype.show = function () {
    this.$element.show();
    return this;
};

Console.prototype.hide = function () {
    this.$element.hide();
    return this;
};

Console.prototype.constructor = Console;

module.exports = Console;