var React = require('react/addons');
var AlbumActions = require('../../actions/album-actions');

module.exports = React.createClass({

    handleClick: function () {
        if (!this.props.current) AlbumActions.setAlbum(this.props.album);
    },

    getClassName: function () {
        return React.addons.classSet({
            'album': true,
            'current': this.props.current
        });
    },

    render: function () {
        return (
            <div onClick={this.handleClick} className={this.getClassName()}>
                <img src={this.props.album.image} />
                <div className="overlay"></div>
                <h1>{this.props.album.title}</h1>
            </div>
        );
    }

});