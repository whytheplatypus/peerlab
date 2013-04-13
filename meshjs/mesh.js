//open -a /Applications/Google\ Chrome\ Canary.app --args --disable-web-security

/*
 * Mesh JS extends Peer.js by handeling automatic
 * creation of a fully connected graph (everyone connected to everyone)
 */

var mesh = function(peer){
  var _read = function(data){
    if(data.type !== undefined && data.type == 'connect'){
      console.log(data);
      if(peer.connections[data.id] === undefined && data.id != peer.id){
          peer.connect(data.id);
      }
    }
  };

  peer.broadcast = function(package){
    var self = this;
    for(var key in self.connections){
      var conn = self.connections[key];
      for(var label in conn){
        var channel = conn[label];
        if(channel){
            if(channel.isOpen()){
                channel.send(package);
            } else {
                channel.once('open', function() {
                    channel.send(package);
                });
            }
        } else {
            console.log('no channel for '+key+' yet.');
        }
      }
    }
  };
  //assumes connection event on peer.connect call
	peer.on('connection', function(channel){
    peer.broadcast({
        type:"connect",
        id:channel.peer
    });
    channel.on('data', function(data) {
      _read(data);
    });
  });
};
