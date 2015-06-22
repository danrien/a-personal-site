var React = require("react");
var marked = require("marked");

var Note = React.createClass({
	render: function() {
		return (<div className="note" dangerouslySetInnerHTML={{__html: marked(this.props.note.text || "", {sanitize: true})}} />);
	}
});

module.exports = Note;