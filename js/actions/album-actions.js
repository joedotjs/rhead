var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

module.exports = {

    setAlbum(album) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_ALBUM,
            album: album
        });
    }

};