var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var PlayerActions = require('../actions/player-actions');
var PlayerStore = require('../stores/player-store');

var currentTracks = [];
var currentPlayingTrack = null;
var alreadyShuffledTracks = [];

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

function getOnlyUnplayedTracks() {
    return _.filter(currentTracks, function (track) {
        return !_.contains(alreadyShuffledTracks, track.id);
    });
}

function getPreviousRandomTrack() {
    if (alreadyShuffledTracks.length < 2) return null;
    alreadyShuffledTracks.pop();
    var lastTrackId = _.last(alreadyShuffledTracks);
    return _.find(currentTracks, { id: lastTrackId });
}

function getRandomTrack() {

    var unplayedTracks = getOnlyUnplayedTracks();

    if (!unplayedTracks.length) return null;

    var randomTrack = _.sample(unplayedTracks);

    alreadyShuffledTracks.push(randomTrack.id);

    return randomTrack;

}

function setPlayingTrackTo(track) {
    if (track) {
        currentPlayingTrack = track;
        PlayerActions.playSong();
    } else {
        currentPlayingTrack = null;
        PlayerActions.pauseSong();
    }
}

function resetShuffledSongs() {
    alreadyShuffledTracks = [];
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
                resetShuffledSongs();

                if (PlayerStore.getShuffleState()) {
                    setPlayingTrackTo(getRandomTrack());
                } else {
                    setPlayingTrackTo(currentTracks[0]);
                }

                break;

            case AppConstants.SET_CURRENT_TRACK:
                resetShuffledSongs();
                setPlayingTrackTo(action.track);
                break;

            case AppConstants.SET_CURRENT_TRACK_RANDOM:
                setPlayingTrackTo(getRandomTrack());
                break;

            case AppConstants.SET_CURRENT_TRACK_NEXT:

                if (!PlayerStore.getShuffleState()) {
                    resetShuffledSongs();
                    setPlayingTrackTo(getNextTrack());
                } else {
                    setPlayingTrackTo(getRandomTrack());
                }

                break;

            case AppConstants.SET_CURRENT_TRACK_PREV:

                if (!PlayerStore.getShuffleState()) {
                    resetShuffledSongs();
                    setPlayingTrackTo(getPreviousTrack());
                } else {
                    var previousRandomTrack = getPreviousRandomTrack();
                    if (previousRandomTrack) setPlayingTrackTo(previousRandomTrack);
                }

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