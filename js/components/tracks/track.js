var React = require('react');
var TracksActions = require('../../actions/tracks-actions');

module.exports = React.createClass({
    handleClick: function () {
        TracksActions.setCurrentTrack(this.props.track);
    },
    getClassName: function () {
        var c = 'track';
        c += this.props.current ? ' current' : '';
        return c;
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