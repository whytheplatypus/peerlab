
define(['Backbone', '../views/backgroundLog', 'mesh'], function(Backbone, backgroundLog, mesh){
    var PeerModel = Backbone.Model.extend({
        defaults: {
            id: false,
            host: 'localhost',
            port: 8000,
            debug: true
        },
        initialize: function(){
            var self = this;
            //self.set('connections', []);
            if(this.isValid()){
                if(!this.get('id')) {
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
                self.log({
                    type:"connection",
                    peer:connection.peer,
                    meta:meta
                });
                self._setupConnectionListeners(connection);                
                self.trigger('connection', connection);
            });
            this.peer.on('error', function peerError(error){
                self.log({
                    type:"error",
                    error: error
                });
            });
            this.peer.on('close', function peerClose(){
                self.log({
                    type:"close"
                });
            });
            
            if(this.get('mesh')){
                mesh(self.peer);
            }
            
            this.set('log', new Array());
        },
        log: function(msg){
            if(msg instanceof Object){
                msg.stamp = (new Date()).getTime();
            } else {
                var log = {
                    stamp: (new Date()).getTime(),
                    msg: msg
                };
                msg = log;
            }
            
            this.get('log').push(msg);
            this.trigger('log', msg);
            if(this.get('debug')){
                console.log(msg);                
            }
            backgroundLog(this.id, JSON.stringify(msg));
        },
        connect: function(id, options){
            var self = this;
            var connection = self.peer.connect(id, options);
            //self.get('connections').push(connection);
            /*self.log({
                type:"connection",
                to:id,
                meta:options
            });*/
            //self._setupConnectionListeners(connection);
            //self.trigger('connection', connection);
            return connection;
        },
        _setupConnectionListeners: function(connection){
            var self = this;
            connection.on("data", function(data){
                self.log({
                    got: data,
                    from: connection.peer
                });
            });
            connection.once("open", function(){
                self.log("connection to " +connection.peer+" open");
            });
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