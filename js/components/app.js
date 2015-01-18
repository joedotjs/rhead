var React = require('react');

var AlbumList = require('./albums/album-list');
var TrackListing = require('./tracks/track-listing');
var Player = require('./player/Player');

var PlayerActions = require('../actions/player-actions');
var TracksActions = require('../actions/tracks-actions');

module.exports = React.createClass({

    componentDidMount: function () {
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) PlayerActions.togglePlaying();
            if (e.keyCode === 37) TracksActions.setCurrentTrackPrev();
            if (e.keyCode === 39) TracksActions.setCurrentTrackNext();
        });
    },

    render: function () {
        return (
            <div>
                <AlbumList />
                <div id="right-section">
                    <TrackListing />
                    <Player />
                </div>
            </div>
        );
    }

});