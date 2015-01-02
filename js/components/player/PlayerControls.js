var React = require('react');

var PauseAndPlayButton = require('./PauseAndPlayButton');
var NextTrackButton = require('./NextTrackButton');
var PrevTrackButton = require('./PrevTrackButton');
var Shuffle = require('./Shuffle');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="player-controls">
                <PrevTrackButton shuffle={this.props.shuffle} />
                <PauseAndPlayButton playing={this.props.playing} />
                <NextTrackButton shuffle={this.props.shuffle} />
                <Shuffle shuffle={this.props.shuffle} />
            </div>
        );
    }
});