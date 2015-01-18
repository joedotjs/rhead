var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var dispatch = AppDispatcher.handleViewAction.bind(AppDispatcher);
var fs = window.fs;

module.exports = {
    setTracks(album) {
        fs.readFileAsync('album-tracks.json')
            .then(data => {
                var albumTracks = JSON.parse(data)[album.title];
                dispatch({
                    actionType: AppConstants.SET_TRACKS,
                    tracks: albumTracks
                });
            });
    },
    setCurrentTrack(track) {
        dispatch({
            actionType: AppConstants.SET_CURRENT_TRACK,
            track: track
        });
    },
    setCurrentTrackNext() {
        dispatch({
           actionType: AppConstants.SET_CURRENT_TRACK_NEXT
        });
    },
    setCurrentTrackPrev() {
        dispatch({
           actionType: AppConstants.SET_CURRENT_TRACK_PREV
        });
    },
    setCurrentTrackRandom() {
        dispatch({
           actionType: AppConstants.SET_CURRENT_TRACK_RANDOM
        });
    }
};