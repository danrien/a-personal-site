import React from 'react';
import ReactDomServer from 'react-dom/server';
import LayoutFactory from '../layout';
import NotesList from './notes-list';
import { div, script } from 'react-hyperscript-helpers';

const NotesContainer = (props) => {
	const html = ReactDomServer.renderToString(React.createElement(NotesList, { notes: props.notes }));

	return LayoutFactory([
		div('#notes-container', { dangerouslySetInnerHTML: {__html: html} }),
		script({ type: 'text/javascript', src: '/js/notes.client.js' })
	]);
};

export default NotesContainer;
