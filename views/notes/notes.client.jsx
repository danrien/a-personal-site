var React = require('react');
var NotesList = require('./notes-list');
var jQuery = require('jquery');

jQuery.ajax({
	url: '/notes/1',
	dataType: 'json',
	cache: false,
	success: function(data) {
		React.render(<NotesList notes={data} />, document.getElementById('notes-container'));
	}.bind(this),
	error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	}.bind(this)
});