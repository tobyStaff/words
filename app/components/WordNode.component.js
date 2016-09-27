'use strict';

var WordNode = {

	// CONTROL METHODS
	create: function( parentId ) {
		var node = Object.create( this );
		this.parentEl = helpers.getById( parentId );
		this.uid = node.createId();
		// return this;
		this.update();
	},
	watch: function() {
	},
	update: function() {
	},
	render: function( html, cb ) {
		this.parentEl.innerHTML = html;
		cb();
	},
	// CONFIG
	parentEl: undefined,
	uid: undefined,
	el: undefined,
	// BUSINESS LOGIC
	createId: function() {
		return 'word-node-0.1';
	},
	buildTemplate: function( obj ) {
		return [
			"<span ",
				"id='"+ obj.id + "'",
			">",
			"</span>"
		].join("");
	}
};