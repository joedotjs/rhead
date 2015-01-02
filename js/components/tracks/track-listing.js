var React = require('react');

var TracksStore = require('../../stores/tracks-store');
var AlbumStore = require('../../stores/album-store');

var Track = require('./track');

var StoreListenMixin = require('../../mixins/StoreListen');

var listenMixin = StoreListenMixin(
    [TracksStore, AlbumStore],
    function () {
        return {
            tracksLoading: TracksStore.tracksAreLoading(),
            tracks: TracksStore.getTracks(),
            currentTrack: TracksStore.getCurrentTrack(),
            currentAlbum: AlbumStore.getSelectedAlbum()
        };
    }
);

module.exports = React.createClass({

    mixins: [listenMixin],

    isCurrentTrack: function (track) {
        if (!this.state.currentTrack) return false;
        return this.state.currentTrack.id === track.id;
    },

    formTrack: function (track, i) {
        var isCurrent = this.isCurrentTrack(track);
        return (
            <Track key={i} trackNumber={i + 1} track={track} current={isCurrent} />
        );
    },

    getAlbumImage: function () {
        if (!this.state.currentAlbum) return null;
        return "url('" + this.state.currentAlbum.image + "')";
    },

    render: function () {

        if (this.state.tracksLoading) {
            return (
                <div id="track-listing">
                    <span>Loading</span>
                </div>
            );
        }

        var tracks = this.state.tracks.map(this.formTrack);

        return (
            <div id="track-listing" style={{ backgroundImage: this.getAlbumImage() }}>
                {tracks}
            </div>
        );

    }

});