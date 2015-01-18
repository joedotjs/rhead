var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var _ = require('lodash');

var dispatch = AppDispatcher.handleViewAction.bind(AppDispatcher);

module.exports = {
    playSong() {
        dispatch({
           actionType: AppConstants.PLAY_TRACK
        });
    },
    pauseSong() {
        dispatch({
            actionType: AppConstants.PAUSE_TRACK
        });
    },
    togglePlaying() {
        dispatch({
            actionType: AppConstants.TOGGLE_PLAY
        });
    },
    setShuffle(shuffleOn) {
        dispatch({
            actionType: AppConstants.SET_SHUFFLE,
            onState: shuffleOn
        });
    }
};