//for global access from the console
var peers = 'hello world';
var jquery = $;

require(['views/peers', 'collections/peers'], function(PeersView, PeerCollection) {
    var self = this;
    peers = new PeerCollection();
    var peersView = new PeersView({model: peers});
    var addPeer = document.getElementById("create_peer");
    addPeer.addEventListener('click', function(){
        var options = formToJSON(this.form);
        console.log("adding peer with options: ", options);
        peers.add(options);
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