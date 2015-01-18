var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var TracksActions = require('../actions/tracks-actions');

var playing = false;
var shuffle = false;

var PlayerStore = merge(BaseStore, {

    getPlayingState() {
        return playing;
    },

    getShuffleState() {
      return shuffle;
    },

    dispatcherIndex: AppDispatcher.register(payload => {

        var action = payload.action;
        var changed = true;

        switch (action.actionType) {

            case AppConstants.PLAY_TRACK:
                playing = true;
                break;

            case AppConstants.PAUSE_TRACK:
                playing = false;
                break;

            case AppConstants.TOGGLE_PLAY:
                playing = !playing;
                break;

            case AppConstants.SET_SHUFFLE:
                shuffle = action.onState;
                if (shuffle) TracksActions.setCurrentTrackRandom();
                break;

            default:
                changed = false;
                break;

        }

        if (changed) PlayerStore.emitChange();

        return true;

    })

});

module.exports = PlayerStore;