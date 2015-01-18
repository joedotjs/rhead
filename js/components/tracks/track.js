var React = require('react/addons');
var TracksActions = require('../../actions/tracks-actions');
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleClick() {
        TracksActions.setCurrentTrack(this.props.track);
    },
    getClassName() {
        return cx({
            'track': true,
            'current': this.props.current
        });
    },
    render() {
        return (
            <div className={this.getClassName()} onClick={this.handleClick}>
                <span className="track-number">{this.props.trackNumber.toString()}.</span>
                <span>{this.props.track.title}</span>
            </div>
        );
    }
});