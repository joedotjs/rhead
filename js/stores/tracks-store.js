var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var PlayerActions = require('../actions/player-actions');

var currentTracks = [];
var currentPlayingTrack = null;
var tracksLoading = false;

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

var TracksStore = merge(BaseStore, {

    getTracks: function () {
      return currentTracks;
    },

    getCurrentTrack: function () {
      return currentPlayingTrack;
    },

    tracksAreLoading: function () {
      return tracksLoading;
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {

        var action = payload.action;
        var changed = true;

        switch (action.actionType) {

            case AppConstants.LOADING_TRACKS:
                currentTracks = null;
                currentPlayingTrack = null;
                tracksLoading = true;
                PlayerActions.pauseSong();
                break;

            case AppConstants.SET_TRACKS:
                tracksLoading = false;
                currentTracks = action.tracks;
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