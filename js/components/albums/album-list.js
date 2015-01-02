var React = require('react');
var Album = require('./album');
var AlbumStore = require('../../stores/album-store');
var StoreListenMixin = require('../../mixins/StoreListen');

var listenMixin = StoreListenMixin(
    [AlbumStore],
    function () {
        return {
            albums: AlbumStore.getAlbums(),
            selectedAlbum: AlbumStore.getSelectedAlbum()
        };
    }
);

module.exports = React.createClass({

    mixins: [listenMixin],

    formAlbum: function (album, i) {
        var selected = this.state.selectedAlbum ? this.state.selectedAlbum.id === album.id : false;
        return (
            <Album album={album} current={selected} key={i} />
        );
    },

    render: function () {
        return (
            <div id="album-list">
                {this.state.albums.map(this.formAlbum)}
            </div>
        );
    }

});