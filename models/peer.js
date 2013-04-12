
define(['Backbone'], function(Backbone){
    var PeerModel = Backbone.Model.extend({
        defaults: {
            id: false,
            host: 'localhost',
            port: 8000
        },
        initialize: function(){
            var self = this;
            //self.set('connections', []);
            if(this.isValid()){
                if(this.get('id')) {
                    this.peer = new Peer(this.attributes);
                } else {
                    this.peer = new Peer(this.get('id'), this.attributes);
                }
            }
            
            this.peer.on('open', function peerOpen(id){
                console.log(id);
                self.set('id', id);
                self.id = id;
            });
            this.peer.on('connection', function peerConnection(connection, meta){
                //self.get('connections').push(connection);
                self.trigger('connection', connection);
            });
            this.peer.on('error', function peerError(error){
                console.log(error);//or whatever
            });
            this.peer.on('close', function peerClose(){
                console.log("connection to server lost");
            });
        },
        connect: function(id, options){
            var self = this;
            var connection = self.peer.connect(id, options);
            //self.get('connections').push(connection);
            self.trigger('connection', connection);
            return connection;
        },
        kill: function(options){
            var self = this;
            self.peer.destroy();
            self.destroy(options);
        },
        validate: function(attrs, options) {
            if(!(attrs.key || (attrs.host && attrs.port))){
                return "Need key or host and port"
            }
        }
    });
    return PeerModel
})