var React = require('react/addons');
var PlayerActions = require('../../actions/player-actions');
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleClick: function () {
        this.props.playing
            ? PlayerActions.pauseSong()
            : PlayerActions.playSong();
    },
    getClassName: function () {
        return cx({
            'pause-play-button': true,
            'fa': true,
            'fa-pause': this.props.playing,
            'fa-play': !this.props.playing
        });
    },
    render: function () {
        return (
            <i className={this.getClassName()} onClick={this.handleClick}></i>
        );
    }
});