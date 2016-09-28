/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var WordEditor = __webpack_require__(1);
	var editor = WordEditor.create( 'editor' );

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helpers = __webpack_require__(2);
	var InputNode = __webpack_require__(3);
	var WordNode = __webpack_require__(4);

	var WordEditor = (function() {
	    return {
	        // CONTROL METHODS
	        create: function(id) {
	            var editor = Object.create(this);
	            this.id = id;
	            this.element = helpers.getById( id );
	            this.update();
	            this.watch();
	        },
	        watch: function() {
	            var self = this;
	            var inputNodeSpaceEvent = events.subscribe('input-node-space', function(val) {
	                self.currentValue = val.value;
	                self.update();
	            });
	            var inputNodeDeleteEvent = events.subscribe('input-node-delete', function() {
	                self.update();
	            });
	        },
	        update: function() {
	            this.addWord( this.currentValue );
	            // this.removeLastWord();
	            this.render();
	        },
	        render: function() {
	            // CLEAR WORDS THEN ADD NEW
	            this.emptyCanvas();
	            this.createWordNodes();

	            // CLEAR INPUT THEN ADD NEW
	            if ( this.inputNode !== undefined ) {
	                this.inputNode.remove();
	            }
	            this.inputNode = InputNode.create(this.id);
	        },
	        emptyCanvas: function() {
	            while ( this.element.firstChild) {
	                this.element.removeChild( this.element.firstChild );
	            }
	        },
	        // CONFIG
	        id: undefined,
	        element: undefined,
	        currentValue: '',
	        words: [],
	        inputNode: undefined,
	        wordNodes: [],
	        // LOGIC
	        addWord: function( word ) {
	            if ( word ) {
	                this.words.push( word );
	            }
	        },
	        getLastWord: function() {
	            return this.words[ this.words.length-1 ];
	        },
	        removeLastWord: function() {
	            this.words.pop();
	            this.wordNodes.pop();
	        },
	        createWordNodes: function() {
	            var self = this;
	            helpers.forEach( this.words, function( v ) {
	                // Component to be implemented before below works.
	                if ( v ) {
	                    self.wordNodes.push( WordNode.create( self.id, v ) );
	                }
	            });
	        },
	        removeWordNodes: function() {
	            helpers.forEach( this.wordNodes, function( v ) {
	                if ( v.hasOwnProperty('remove') ) {
	                    v.remove();
	                }
	            });
	        }

	    }
	})();

	module.exports = WordEditor;


/***/ },
/* 2 */
/***/ function(module, exports) {

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

	module.exports = helpers;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var helpers = __webpack_require__(2);
	var InputNode = (function() {
	    return {
	        // CONTROL METHODS
	        create: function(parentId, lastWord) {
	            var node = Object.create(this);
	            this.parentEl = helpers.getById(parentId);
	            this.uid = node.createId();
	            this.value = lastWord || '';
	            // return this;
	            this.update();
	            return this;
	        },
	        watch: function() {

	            this.el.addEventListener('keyup', function(e) {
	                // console.log( e.keyCode );
	                var self = this;
	                if (e.keyCode === 32) {
	                    // pass value to Parent Component. pub/sub
	                    events.publish('input-node-space', {
	                        value: self.value
	                    });
	                }
	                if ( e.keyCode === 8 && self.value.length < 1 ) {
	                    console.log( 'remove' );
	                    // remove last word in words array, wordNodes and insert into input field.
	                    // pass value to Parent Component. pub/sub
	                    events.publish('input-node-delete');
	                }
	            });
	        },
	        update: function() {
	            var self = this;
	            this.buildElement({ id: this.uid });
	            this.render(this.el, function() {
	                self.el = helpers.getById(self.uid);
	            });
	            this.el.focus();
	            this.watch();
	            return this;
	        },
	        render: function(el, cb) {
	            this.parentEl.appendChild(el);
	            cb();
	        },
	        remove: function() {
	            // this.parentEl.removeChild( this.el );
	            delete this;
	        },
	        // CONFIG
	        parentEl: undefined,
	        uid: undefined,
	        el: undefined,
	        value: '',
	        // BUSINESS LOGIC
	        createId: function() {
	            return 'input-node-0.1';
	        },
	        buildElement: function(obj) {
	            var el = document.createElement('input');
	            el.id = obj.id;
	            el.value = this.value;
	            this.el = el;
	        }

	    };

	})();

	module.exports = InputNode;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var helpers = __webpack_require__(2);
	var WordNode = (function() {

	    return {
	        // CONTROL METHODS
	        create: function(parentId, word) {
	            var node = Object.create(this);
	            this.parentEl = helpers.getById(parentId);
	            this.uid = node.createId();
	            this.text = word;
	            this.update();
	            return this;
	        },
	        watch: function() {

	        },
	        update: function() {
	            this.buildElement( { id: this.uid }, this.text );
	            this.render();
	        },
	        render: function() {
	            this.parentEl.appendChild( this.el );
	        },
	        remove: function() {
	            this.parentEl.removeChild( this.el );
	            delete this;
	        },
	        // CONFIG
	        parentEl: undefined,
	        uid: undefined,
	        el: undefined,
	        text: '',
	        // BUSINESS LOGIC
	        createId: function() {
	            return 'word-node-0.1';
	        },
	        buildElement: function(obj, text) {
	            var el = document.createElement('span');
	            el.id = obj.id;
	            el.innerHTML = text;
	            this.el = el;
	        }
	    };
	})();

	module.exports = WordNode;


/***/ }
/******/ ]);