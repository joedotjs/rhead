var React = require('react');
var AlbumList = require('./albums/album-list');
var TrackListing = require('./tracks/track-listing');
var Player = require('./player/Player');
var PlayerActions = require('../actions/player-actions');

module.exports = React.createClass({
    componentDidMount: function () {
        window.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) PlayerActions.togglePlaying()
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