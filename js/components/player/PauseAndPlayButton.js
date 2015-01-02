var React = require('react');
var PlayerActions = require('../../actions/player-actions');

module.exports = React.createClass({
    handleClick: function () {
        if (this.props.playing) {
            PlayerActions.pauseSong();
        } else {
            PlayerActions.playSong();
        }
    },
    getClassName: function () {
        var c = "pause-play-button fa ";
        c += this.props.playing ? "fa-pause" : "fa-play";
        return c;
    },
    render: function () {
        return (
            <i className={this.getClassName()} onClick={this.handleClick}></i>
        );
    }
});