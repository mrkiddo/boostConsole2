var $ = require('jquery');

var defaultConfig = {};

/**
 * @constructor Console
 */
var Console = function (element, config) {
    config = config || {};
    config = Object.assign({}, defaultConfig, config);
    this.$element = $(element);
    this.$currentRow = $(element).find('.row:first-child');

    this.$element.on('console.add.chart', this.addChar.bind(this));
};

Console.prototype.addChar = function (e, char) {
    var span = $('<span></span>');
    span.text(char);
    //this.$currentRow.find('.content').append(span);
    span.insertBefore(this.$currentRow.find('.cursor'));
    e.preventDefault();
};

Console.prototype.constructor = Console;

module.exports = Console;