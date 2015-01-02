var React = require('react');

var TracksStore = require('../../stores/tracks-store');
var PlayerStore = require('../../stores/player-store');
var TracksActions = require('../../actions/tracks-actions');
var StoreListenMixin = require('../../mixins/StoreListen');

var TrackInfo = require('./TrackInfo');
var PlayerControls = require('./PlayerControls');

var storeMixin = StoreListenMixin(
    [TracksStore, PlayerStore],
    function () {
        return {
            song: TracksStore.getCurrentTrack(),
            playing: PlayerStore.getPlayingState(),
            shuffle: PlayerStore.getShuffleState()
        }
    }
);

module.exports = React.createClass({

    mixins: [storeMixin],

    setNewTrack: function () {
        TracksActions.setCurrentTrackNext();
    },

    componentDidMount: function () {
        this.audioElement = this.refs.audio.getDOMNode();
        this.audioElement.addEventListener('ended', this.setNewTrack);
    },

    componentDidUpdate: function () {

        if (this.state.playing && this.audioElement.paused) {
            return this.audioElement.play();
        }

        if (!this.state.playing && !this.audioElement.paused) {
            return this.audioElement.pause();
        }

    },

    render: function () {

        var songFile = this.state.song ? 'songfiles/' + this.state.song.file : '';

        return (
            <div id="player" style={{ display: this.state.song ? 'block' : 'none' }}>
                <TrackInfo track={this.state.song} />
                <PlayerControls shuffle={this.state.shuffle} playing={this.state.playing} />
                <audio ref="audio" src={songFile}></audio>
            </div>
        );

    }

});