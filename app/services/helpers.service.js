'use strict';

var helpers = (function() {
    
    return {
        getById: function(id) {
            return document.getElementById(id);
        },
        forEach: function( array, cb ) {
        	var i = 0,
        		l = array.length;

        	for ( i; i < l; i++ ) {
        		cb( array[ i ], i );
        	}
        }
    }
    
})();
