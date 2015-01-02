var React = require('react/addons');
var TracksActions = require('../../actions/tracks-actions');
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleClick: function () {
        TracksActions.setCurrentTrack(this.props.track);
    },
    getClassName: function () {
        return cx({
            'track': true,
            'current': this.props.current
        });
    },
    render: function () {
        return (
            <div className={this.getClassName()} onClick={this.handleClick}>
                <span className="track-number">{this.props.trackNumber.toString()}.</span>
                <span>{this.props.track.title}</span>
            </div>
        );
    }
});