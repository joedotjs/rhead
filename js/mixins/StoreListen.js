module.exports = function (stores, getStateFn) {
    return {
        componentWillMount() {
            stores.forEach(store => store.addChangeListener(this.onChange));
        },
        componentWillUnmount() {
           stores.forEach(store => store.removeChangeListener(this.onChange));
        },
        onChange() {
            this.setState(getStateFn());
        },
        getInitialState() {
            return getStateFn();
        }
    };
};