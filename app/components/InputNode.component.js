'use strict';

var InputNode = {
	// CONTROL METHODS
	create: function( parentId ) {
		var node = Object.create( this );
		this.parentEl = helpers.getById( parentId );
		this.uid = node.createId();
		// return this;
		this.update();
	},
	watch: function() {
		this.el.addEventListener( 'keyup', function( e ) {
			console.log( e.keyCode );
			if ( e.keyCode === 32 ) {
				// pass value to Parent Component. pub/sub
			}
		} );
	},
	update: function() {
		var self = this;
		this.buildElement( { id: this.uid } );
		this.render( this.el, function() {
			self.el = helpers.getById( self.uid );
		});
		this.el.focus();
		this.watch();
		return this;
	},
	render: function( el, cb ) {
		this.parentEl.appendChild( el );
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
	buildElement: function( obj ) {
		var el = document.createElement('input');
		el.id = obj.id;
		this.el = el;
	}

};