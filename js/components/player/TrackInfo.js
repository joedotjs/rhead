var React = require('react');

module.exports = React.createClass({
    render: function () {
        if (!this.props.track) return null;
        return (
            <div className="track-info">
                <h2>{this.props.track.title}</h2>
            </div>
        );
    }
});