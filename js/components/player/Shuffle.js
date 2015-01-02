var React = require('react/addons');
var PlayerActions = require('../../actions/player-actions');
var cx = React.addons.classSet;

module.exports = React.createClass({
    handleClick: function () {
        PlayerActions.setShuffle(!this.props.shuffle);
    },
    getClassName: function () {
        return cx({
            'fa': true,
            'fa-random': true,
            'shuffle-on': this.props.shuffle
        });
    },
    render: function () {
        return (
            <i
                id="shuffle-button"
                onClick={this.handleClick}
                className={this.getClassName()} />
        );
    }
});