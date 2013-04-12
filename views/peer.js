define(['Backbone'], function(Backbone){
    var PeerView = Backbone.View.extend({
        tagName: 'div',
        template: "#peer-template",
        initialize: function(){
            var self = this;
            this.listenTo(this.model, "change", this.render.bind(self));
            this.listenTo(this.model, "connection", this.connection.bind(self));
        },
        connection: function(conn){
            console.log(conn);
            var connEL = document.createElement('li');
            connEL.innerHTML = conn.peer;
            this.el.querySelector('.connections').appendChild(connEL);
        },
        render: function(){
            var self = this;
            var t = document.querySelector(this.template);
            t.content.querySelector('.peer-id').innerHTML = this.model.id;
            
            for(var k in self.model.peer.connections){
                console.log(k);
                //might want more functionality than this eventually
                var conn = document.createElement('li');
                conn.innerHTML = k;
                t.content.querySelector('.connections').appendChild(conn);
            }
            
            t.content.querySelector('.toggle-info').setAttribute('data-target', "#"+self.model.id);
            t.content.querySelector('.collapse').id = self.model.id;
            t.content.querySelector('.btn.connect').id = "connect_"+self.model.id
            this.el.innerHTML = null;
            this.el.appendChild(t.content.cloneNode(true));
            
            this.el.querySelector("#connect_"+self.model.id).addEventListener('click', function(){
                console.log(self.model.connect(this.form.id.value));
            }, false);
            
            return this.el;
        }
    });
    return PeerView;
});