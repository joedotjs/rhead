var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var PlayerActions = require('./player-actions');
var _ = require('lodash');
var fs = window.fs;

module.exports = {

    setTracks: function (album) {

        var self = this;

        fs.readFileAsync('album-tracks.json').then(function (data) {

            var albumTracks = JSON.parse(data)[album.title];

            AppDispatcher.handleViewAction({
                actionType: AppConstants.SET_TRACKS,
                tracks: albumTracks
            });

            self.setCurrentTrack(albumTracks[0]);

        });

    },

    setCurrentTrack: function (track) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_CURRENT_TRACK,
            track: track
        });

    },

    setCurrentTrackNext: function () {

        AppDispatcher.handleViewAction({
           actionType: AppConstants.SET_CURRENT_TRACK_NEXT
        });

    },

    setCurrentTrackPrev: function () {

        AppDispatcher.handleViewAction({
           actionType: AppConstants.SET_CURRENT_TRACK_PREV
        });

    },

    setCurrentTrackRandom: function () {

        AppDispatcher.handleViewAction({
           actionType: AppConstants.SET_CURRENT_TRACK_RANDOM
        });

    }

};