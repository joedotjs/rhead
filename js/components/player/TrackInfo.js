var React = require('react');

var StoreListener = require('../../mixins/StoreListen');
var TracksStore = require('../../stores/tracks-store');

var listenMixin = StoreListener(
    [TracksStore],
    () => {
        return {
            track: TracksStore.getCurrentTrack()
        };
    }
);

module.exports = React.createClass({
    mixins: [listenMixin],
    render: function () {
        if (!this.state.track) return null;
        return (
            <div className="track-info">
                <h2>{this.state.track.title}</h2>
            </div>
        );
    }
});