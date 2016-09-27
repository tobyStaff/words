'use strict';

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
