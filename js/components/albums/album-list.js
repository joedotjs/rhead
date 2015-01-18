var React = require('react');
var Album = require('./album');
var AlbumStore = require('../../stores/album-store');
var StoreListenMixin = require('../../mixins/StoreListen');

var listenMixin = StoreListenMixin(
    [AlbumStore],
    () => {
        return {
            albums: AlbumStore.getAlbums(),
            selectedAlbum: AlbumStore.getSelectedAlbum()
        };
    }
);

module.exports = React.createClass({

    mixins: [listenMixin],

    formAlbum(album, i) {
        var current = this.state.selectedAlbum ? this.state.selectedAlbum.id === album.id : false;
        return <Album album={album} current={current} key={i} />;
    },

    render() {
        return (
            <div id="album-list">
                {this.state.albums.map(this.formAlbum)}
            </div>
        );
    }

});