var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var PlayerActions = require('../actions/player-actions');
var PlayerStore = require('../stores/player-store');

var currentTracks = [];
var currentPlayingTrack = null;

function getCurrentTrackIndex() {
    return _.findIndex(currentTracks, function (track) {
        return track.id === currentPlayingTrack.id;
    });
}

function getNextTrack() {
    if (!currentPlayingTrack) return null;
    return currentTracks[getCurrentTrackIndex() + 1] || null;
}

function getPreviousTrack() {
    if (!currentPlayingTrack) return null;
    return currentTracks[getCurrentTrackIndex() - 1] || null;
}

function getRandomTrack() {
    return currentTracks[Math.floor(Math.random() * currentTracks.length)];
}

function setTrackPossiblyRandom(track) {
    if (!PlayerStore.getShuffleState()) {
        currentPlayingTrack = track;
    } else {
        currentPlayingTrack = getRandomTrack();
    }
}

var TracksStore = merge(BaseStore, {

    getTracks: function () {
        return currentTracks;
    },

    getCurrentTrack: function () {
        return currentPlayingTrack;
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {

        var action = payload.action;
        var changed = true;

        switch (action.actionType) {

            case AppConstants.SET_TRACKS:
                currentTracks = action.tracks;
                setTrackPossiblyRandom(currentTracks[0]);
                PlayerActions.playSong();
                break;

            case AppConstants.SET_CURRENT_TRACK:
                currentPlayingTrack = action.track;
                PlayerActions.playSong();
                break;

            case AppConstants.SET_CURRENT_TRACK_NEXT:

                var nextTrack = getNextTrack();

                if (nextTrack) {
                    currentPlayingTrack = nextTrack;
                    PlayerActions.playSong();
                } else {
                    currentPlayingTrack = null;
                    PlayerActions.pauseSong();
                }

                break;

            case AppConstants.SET_CURRENT_TRACK_PREV:

                var prevTrack = getPreviousTrack();

                if (prevTrack) {
                    currentPlayingTrack = prevTrack;
                    PlayerActions.playSong();
                } else {
                    currentPlayingTrack = null;
                    PlayerActions.pauseSong();
                }

                break;

            case AppConstants.SET_CURRENT_TRACK_RANDOM:
                currentPlayingTrack = getRandomTrack();
                PlayerActions.playSong();
                break;

            default:
                changed = false;
                break;


        }

        if (changed) TracksStore.emitChange();

        return true;

    })

});

module.exports = TracksStore;