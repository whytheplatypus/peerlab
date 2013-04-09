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