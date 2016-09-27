'use strict';

var InputNode = (function() {
    return {
        // CONTROL METHODS
        create: function(parentId) {
            var node = Object.create(this);
            this.parentEl = helpers.getById(parentId);
            this.uid = node.createId();
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
                    })
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
        // BUSINESS LOGIC
        createId: function() {
            return 'input-node-0.1';
        },
        buildElement: function(obj) {
            var el = document.createElement('input');
            el.id = obj.id;
            this.el = el;
        }

    };

})();
