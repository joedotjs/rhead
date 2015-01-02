var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var TracksActions = require('./tracks-actions');

module.exports = {

    setAlbum: function (album) {

        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_ALBUM,
            album: album
        });

        TracksActions.setTracks(album);

    }

};