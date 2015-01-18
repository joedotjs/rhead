var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var BaseStore = merge(EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(fn) {
        this.on(CHANGE_EVENT, fn);
    },

    removeChangeListener(fn) {
        this.removeListener(CHANGE_EVENT, fn);
    }

});

module.exports = BaseStore;