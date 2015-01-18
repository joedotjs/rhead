var React = require('react/addons');
var PlayerActions = require('../../actions/player-actions');
var PlayerStore = require('../../stores/player-store');
var StoreListener = require('../../mixins/StoreListen');
var cx = React.addons.classSet;

var listenerMixin = StoreListener(
    [PlayerStore],
    () => {
        return {
          shuffle: PlayerStore.getShuffleState()
        };
    }
);

module.exports = React.createClass({

    mixins: [listenerMixin],

    handleClick() {
        PlayerActions.setShuffle(!this.state.shuffle);
    },

    getClassName() {
        return cx({
            'fa': true,
            'fa-random': true,
            'shuffle-on': this.state.shuffle
        });
    },

    render() {
        return (
            <i
                id="shuffle-button"
                onClick={this.handleClick}
                className={this.getClassName()} />
        );
    }

});