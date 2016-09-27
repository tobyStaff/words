'use strict';

var WordEditor = {
	// CONTROL METHODS
	create: function( id ) {
		var editor = Object.create( this );
		this.id = id;
		this.update();
	},
	watch: function() {
		// watch custom event for input space-up and corresponding value.
		// then add new word to array, process and then re-build view.
	},
	update: function() {
		this.render();
	},
	render: function() {
		var inputnode = InputNode.create( this.id );
	},
	// CONFIG
	id: undefined
	words: []

}