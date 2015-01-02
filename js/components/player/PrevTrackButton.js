var React = require('react');

var TrackActions = require('../../actions/tracks-actions');

module.exports = React.createClass({
    handleClick: function () {
        if (!this.props.shuffle) {
            TrackActions.setCurrentTrackPrev();
        } else {
            TrackActions.setCurrentTrackRandom();
        }
    },
    render: function () {
        return (
            <i className="fa fa-backward" onClick={this.handleClick}></i>
        );
    }
});