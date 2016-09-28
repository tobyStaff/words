'use strict';
var helpers = require('../services/helpers.service.js');
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
