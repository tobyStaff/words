'use strict';

var helpers = require('../services/helpers.service.js');
var InputNode = require('./InputNode.component.js');
var WordNode = require('./WordNode.component.js');

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
                self.addWord( self.currentValue );
                self.update();
            });
            var inputNodeDeleteEvent = events.subscribe('input-node-delete', function() {
                self.editableValue = self.words.pop() || '';
                self.removeLastWordNode();
                self.update();
            });
        },
        update: function() {
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

            if ( this.editableValue !== '' ) {
                this.inputNode.el.value = this.editableValue;
            }

            console.log( this.words );
            console.log( this.wordNodes );
        },
        emptyCanvas: function() {
            this.wordNodes = [];
            while ( this.element.firstChild ) {
                this.element.removeChild( this.element.firstChild );
            }
        },
        // CONFIG
        id: undefined,
        element: undefined,
        currentValue: '',
        editableValue: '',
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
        createWordNodes: function() {
            var self = this,
                obj = {};
            helpers.forEach( self.words, function( v ) {
                // Component to be implemented before below works.
                if ( v ) {
                    obj = WordNode.create( self.id, v );
                    self.wordNodes.push( obj );
                }
            });
        },
        removeAllWordNodes: function() {
            helpers.forEach( this.wordNodes, function( v ) {
                if ( v.hasOwnProperty('remove') ) {
                    v.remove();
                }
            });
        },
        removeLastWordNode: function() {
            var leng = this.wordNodes.length;
            if ( leng > 1 ) {
                this.wordNodes[ leng - 1 ].remove();
                return this.wordNodes.pop();
            }
        }

    }
})();

module.exports = WordEditor;
