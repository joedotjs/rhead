var React = require('react');

var TracksStore = require('../../stores/tracks-store');
var PlayerStore = require('../../stores/player-store');
var TracksActions = require('../../actions/tracks-actions');
var StoreListenMixin = require('../../mixins/StoreListen');

var TrackInfo = require('./TrackInfo');
var PlayerControls = require('./PlayerControls');
var PlayerTime = require('./PlayerTime');

var storeMixin = StoreListenMixin(
    [TracksStore, PlayerStore],
    () => {
        return {
            song: TracksStore.getCurrentTrack(),
            playing: PlayerStore.getPlayingState()
        };
    }
);

var c = console.log.bind(console);

module.exports = React.createClass({

    mixins: [storeMixin],

    setNewTrack() {
        TracksActions.setCurrentTrackNext();
    },

    setPlayerTime() {

        var t = Math.floor(this.audioElement.currentTime);

        if (t !== this.state.currentTime) {
            this.setState({
                currentTime: t
            });
        }

    },

    setPlayerTotalTime() {
        this.setState({
            currentTime: 0,
            totalTime: Math.floor(this.audioElement.duration)
        });
    },

    componentDidMount() {

        this.audioElement = this.refs.audio.getDOMNode();

        this.audioElement.addEventListener('ended', this.setNewTrack);
        this.audioElement.addEventListener('timeupdate', this.setPlayerTime);
        this.audioElement.addEventListener('durationchange', this.setPlayerTotalTime);

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
                <PlayerTime current={this.state.currentTime} total={this.state.totalTime} />
            </div>
        );

    }

});