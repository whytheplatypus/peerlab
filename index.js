//for global access from the console
var peers = 'hello world';
var jquery = $;

require(['views/peers', 'collections/peers', 'models/peer'], function(PeersView, PeerCollection, PeerModel) {
    var self = this;
    peers = new PeerCollection();
    var peersView = new PeersView({model: peers});
    var addPeer = document.getElementById("create_peer");
    addPeer.addEventListener('click', function(){
        var options = formToJSON(this.form);
        console.log("adding peer with options: ", options);
        _.defaults(options, {host : "localhost", port : "8000"});
        var peer
        if(options.id === undefined) {
            peer = new Peer(options);
        } else {
            peer = new Peer(options.id, options);
        }
        options.peer = peer;
        //doing this so peermodel can and other scan be used in future renderings
        peers.add(new PeerModel(options));
        jquery('#settings').modal('hide');
    });
/*
    function log(message){
        console.log(message);
        //put it up on the html
        //send it to a winston server
    }
    
    function createPeer(){
        
    }
    
    
    var peer = new Peer({host: 'localhost', port: 8000});
    var globalCon = false;
    peer.on('connection', function(conn) {
        conn.on('data', function(data){
          // Will print 'hi!'
          console.log(data);
        });
        conn.on('open', function(){
            console.log("open");
            conn.send("hello");
        });
        globalCon = conn;
    });
    peer.on('open', function(){
        console.log(peer.id);
    });
    */
});