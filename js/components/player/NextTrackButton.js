var React = require('react');

var TrackActions = require('../../actions/tracks-actions');

module.exports = React.createClass({
    handleClick: function () {
        if (!this.props.shuffle) {
            TrackActions.setCurrentTrackNext();
        } else {
            TrackActions.setCurrentTrackRandom();
        }
    },
    render: function () {
        return (
            <i className="fa fa-forward" onClick={this.handleClick}></i>
        );
    }
});