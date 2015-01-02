module.exports = function (stores, getStateFn) {
    return {
        componentWillMount: function () {
            var self = this;
            stores.forEach(function (store) {
                store.addChangeListener(self.onChange);
            });
        },
        componentWillUnmount: function () {
            var self = this;
           stores.forEach(function (store) {
                store.removeChangeListener(self.onChange);
            });
        },
        onChange: function () {
            this.setState(getStateFn());
        },
        getInitialState: function () {
            return getStateFn();
        }
    };
};