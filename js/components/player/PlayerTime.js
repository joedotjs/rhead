var React = require('react');

module.exports = React.createClass({

    leadingZero(num) {
        if (num < 10) return '0' + num.toString();
        return num.toString();
    },

    sms(secs) {
        var minutes = Math.floor(secs / 60);
        var leftoverSeconds = secs - (minutes * 60);
        return `${minutes.toString()}:${this.leadingZero(leftoverSeconds)}`;
    },

    render() {
        return (
          <span className="player-time">
            {this.sms(this.props.current)} / {this.sms(this.props.total)}
          </span>
        );
    }
});