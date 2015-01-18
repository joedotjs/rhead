var React = require('react');

var TracksStore = require('../../stores/tracks-store');
var PlayerStore = require('../../stores/player-store');
var TracksActions = require('../../actions/tracks-actions');
var StoreListenMixin = require('../../mixins/StoreListen');

var TrackInfo = require('./TrackInfo');
var PlayerControls = require('./PlayerControls');

var storeMixin = StoreListenMixin(
    [TracksStore, PlayerStore],
    () => {
        return {
            song: TracksStore.getCurrentTrack(),
            playing: PlayerStore.getPlayingState()
        };
    }
);

module.exports = React.createClass({

    mixins: [storeMixin],

    setNewTrack() {
        TracksActions.setCurrentTrackNext();
    },

    componentDidMount() {
        this.audioElement = this.refs.audio.getDOMNode();
        this.audioElement.addEventListener('ended', this.setNewTrack);
    },

    componentDidUpdate() {
        if (this.state.playing && this.audioElement.paused) {
            this.audioElement.play();
        } else if (!this.state.playing && !this.audioElement.paused) {
            this.audioElement.pause();
        }
    },

    render() {

        var songFile = this.state.song ? 'songfiles/' + this.state.song.file : '';

        return (
            <div id="player" style={{ display: this.state.song ? 'block' : 'none' }}>
                <TrackInfo />
                <PlayerControls />
                <audio ref="audio" src={songFile}></audio>
            </div>
        );

    }

});