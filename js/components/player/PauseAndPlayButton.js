var React = require('react/addons');
var PlayerActions = require('../../actions/player-actions');
var PlayerStore = require('../../stores/player-store');
var StoreListener = require('../../mixins/StoreListen');
var cx = React.addons.classSet;

var listenMixin = StoreListener(
    [PlayerStore],
    () => {
        return {
            playing: PlayerStore.getPlayingState()
        };
    }
);

module.exports = React.createClass({
    mixins: [listenMixin],
    handleClick() {
        this.state.playing ? PlayerActions.pauseSong() : PlayerActions.playSong();
    },
    getClassName() {
        return cx({
            'pause-play-button': true,
            'fa': true,
            'fa-pause': this.state.playing,
            'fa-play': !this.state.playing
        });
    },
    render() {
        return (
            <i className={this.getClassName()} onClick={this.handleClick}></i>
        );
    }
});