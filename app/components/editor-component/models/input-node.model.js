'use strict';
var helpers = require('../../../services/helpers.service.js');
var InputNode = (function() {
    return {
        // CONFIG
        parentEl: undefined,
        uid: undefined,
        el: undefined,
        value: '',
        width: 100,
        // CONTROL METHODS
        create: function(parentId, value, width) {
            var node = Object.create(this);
            this.parentEl = helpers.getById(parentId);
            this.uid = node.createId();
            this.value = this.filter( value ) || '';
            this.width = width || 100;
            // return this;
            this.update();
            return this;
        },
        watch: function() {
            var obj = this;
            this.el.addEventListener('keyup', function(e) {
                var self = this;
                if (e.keyCode === 32) {
                    // pass value to Parent Component. pub/sub
                    events.publish('input-node-space', {
                        value: obj.filter( self.value )
                    });
                }
            });
            this.el.addEventListener('keydown', function(e) {
                var self = this;
                if ( e.keyCode === 8 && self.value.length < 1 ) {
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
        // BUSINESS LOGIC
        createId: function() {
            return 'input-node-0.1';
        },
        buildElement: function(obj) {
            var el = document.createElement('input');
            el.id = obj.id;
            el.className += 'editor__input ';
            el.value = this.value;
            el.style.width = ( this.width + 2 )+'px';
            helpers.log( el.style );
            this.el = el;
        },
        filter: function( value ) {
            if ( value === " " ) {
                return false;
            }
            return value;
        }

    };

})();

module.exports = InputNode;
