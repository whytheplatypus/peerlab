define(['Backbone'], function(Backbone){
    var PeerLogView = Backbone.View.extend({
        tagName: 'div',
        template: "#peer-log-template",
        initialize: function(){
            var self = this;
            this.listenTo(this.model, "log", this.log.bind(self));
        },
        log: function(msg){
            var self = this;
            var log = document.createElement('li');
            log.innerHTML = JSON.stringify(msg);
            self.el.querySelector("ul.logs").appendChild(log);
        },
        render: function(){
            var self = this;
            var t = document.querySelector(this.template);
            t.content.querySelector('.peer-id').innerHTML = this.model.id;
            
            
            t.content.querySelector('.toggle-logs').setAttribute('data-target', "#logs_"+self.model.id);
            t.content.querySelector('.collapse').id = "logs_"+self.model.id;

            this.el.innerHTML = null;
            this.el.appendChild(t.content.cloneNode(true));
            
            return this.el;
        }
    });
    return PeerLogView;
});