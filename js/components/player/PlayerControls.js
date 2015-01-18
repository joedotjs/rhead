var React = require('react');

var PauseAndPlayButton = require('./PauseAndPlayButton');
var NextTrackButton = require('./NextTrackButton');
var PrevTrackButton = require('./PrevTrackButton');
var Shuffle = require('./Shuffle');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="player-controls">
                <PrevTrackButton />
                <PauseAndPlayButton />
                <NextTrackButton />
                <Shuffle />
            </div>
        );
    }
});