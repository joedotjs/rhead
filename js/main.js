var React = require('react');
var APP = require('./components/app');

document.addEventListener("DOMContentLoaded", function () {
    React.render(<APP />, document.getElementById('main'));
});