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
            // watch custom event for input space-up and corresponding value.
            // then add new word to array, process and then re-build view.
            var subs = events.subscribe('input-node-space', function(val) {
                self.lastWord = val.value;
                self.update();
            });
        },
        update: function() {
            this.addWord( this.lastWord );
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
        words: [],
        lastWord: '',
        inputNode: undefined,
        wordNodes: [],
        // LOGIC
        addWord: function( word ) {
            if ( word ) {
                this.words.push( word );
            }
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
