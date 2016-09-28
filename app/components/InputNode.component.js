'use strict';
var helpers = require('../services/helpers.service.js');
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
