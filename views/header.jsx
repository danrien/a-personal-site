var React = require("react");

var Header = React.createClass({
	displayName: "Header",
	render: function() {
		return (
			<div className="header">
				<h1>David Vedvick</h1>
				<h2>{this.props.subheader}</h2>
			</div>
		);
	}
});

module.exports = Header;
