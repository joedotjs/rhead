var React = require('react');

var TrackActions = require('../../actions/tracks-actions');

module.exports = React.createClass({
    handleClick() {
        TrackActions.setCurrentTrackPrev();
    },
    render() {
        return (
            <i className="fa fa-backward" onClick={this.handleClick}></i>
        );
    }
});