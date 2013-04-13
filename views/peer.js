define(['Backbone', './connection'], function(Backbone, ConnectionView){
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
            var connectionView = new ConnectionView({model: conn, origin:this.model});
            this.el.querySelector('.connections').appendChild(connectionView.render());
        },
        render: function(){
            var self = this;
            var t = document.querySelector(this.template);
            t.content.querySelector('.peer-id').innerHTML = this.model.id;
            
            
            t.content.querySelector('.toggle-info').setAttribute('data-target', "#"+self.model.id);
            t.content.querySelector('.collapse').id = self.model.id;
            t.content.querySelector('.btn.connect').id = "connect_"+self.model.id
            this.el.innerHTML = null;
            this.el.appendChild(t.content.cloneNode(true));
            
            this.el.querySelector("#connect_"+self.model.id).addEventListener('click', function(){
                console.log(self.model.connect(this.form.id.value));
                this.form.id.value = "";
            }, false);
            
            for(var k in self.model.peer.connections){
                for(var label in self.model.peer.connections[k]){
                    self.connection(self.model.peer.connections[k][label]);
                }
            }
            
            if(self.model.get("mesh")){
                var sendBroadcast = document.createElement("button");
                sendBroadcast.type = "button";
                sendBroadcast.className="btn";
                var broadcast = document.createElement("textarea");
                sendBroadcast.addEventListener('click', function(){
                    var msg = broadcast.value;
                    try{
                        msg = JSON.parse(msg);
                    } catch(e){
                        console.log(e);
                        //send it normally
                    }
                    self.model.peer.broadcast(msg);
                });
                this.el.querySelector('.collapse').appendChild(broadcast);
                this.el.querySelector('.collapse').appendChild(sendBroadcast);
            }
            
            return this.el;
        }
    });
    return PeerView;
});