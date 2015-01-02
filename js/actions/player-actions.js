var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');

module.exports = {
    playSong: function () {
        AppDispatcher.handleViewAction({
           actionType: AppConstants.PLAY_TRACK
        });
    },
    pauseSong: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.PAUSE_TRACK
        });
    },
    togglePlaying: function () {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.TOGGLE_PLAY
        });
    },
    setShuffle: function (shuffleOn) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_SHUFFLE,
            onState: shuffleOn
        });
    }
};