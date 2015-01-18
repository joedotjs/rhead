var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var BaseStore = require('./base-store');
var _ = require('lodash');

var TracksActions = require('../actions/tracks-actions');

var albums = [
    {id: 1, title: 'Kid A', image: 'http://upload.wikimedia.org/wikipedia/en/b/b5/Radiohead.kida.albumart.jpg'},
    {id: 2, title: 'OK Computer', image: 'http://cdn.albumoftheyear.org/album/ok-computer.jpg'},
    {id: 3, title: 'Pablo Honey', image: 'http://upload.wikimedia.org/wikipedia/en/0/0f/Radiohead.pablohoney.albumart.jpg'},
    {id: 4, title: 'The Bends', image: 'http://upload.wikimedia.org/wikipedia/en/8/8b/Radiohead.bends.albumart.jpg'},
    {id: 5, title: 'Amnesiac', image: 'http://upload.wikimedia.org/wikipedia/en/c/c5/Radiohead.amnesiac.albumart.jpg'},
    {id: 6, title: 'Hail to the Thief', image: 'http://upload.wikimedia.org/wikipedia/en/6/63/Radiohead_-_Hail_to_the_Thief_-_album_cover.jpg'},
    {id: 7, title: 'In Rainbows', image: 'http://upload.wikimedia.org/wikipedia/en/2/2e/In_Rainbows_Official_Cover.jpg'},
    {id: 8, title: 'The King of Limbs', image: 'http://upload.wikimedia.org/wikipedia/en/2/24/The_king_of_limbs.jpg'}
];

var selectedAlbum = null;

var AlbumStore = merge(BaseStore, {

    getAlbums() {
        return albums;
    },

    getSelectedAlbum() {
        return _.find(albums, { id: selectedAlbum }) || null;
    },

    dispatcherIndex: AppDispatcher.register(payload => {

        var action = payload.action;
        var changed = true;

        switch (action.actionType) {

            case AppConstants.SET_ALBUM:
                selectedAlbum = action.album.id;
                TracksActions.setTracks(action.album);
                break;

            default:
                changed = false;
                break;

        }

        if (changed) AlbumStore.emitChange();

    })

});

module.exports = AlbumStore;