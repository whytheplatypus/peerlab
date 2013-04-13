
define(['Backbone', './peer', './connections', './peerLog'], function(Backbone, PeerView, GraphView, PeerLogView){
    var PeersView = Backbone.View.extend({
        el: "#peers",
        initialize: function(){
            console.log("initialize peers view ", this.model);
            var self = this;
            this.model.on('add', self.newpeer.bind(self));
            this.graphView = new GraphView({model: this.model});
        },
        newpeer: function(peer){
            var self = this;
            var peerView = new PeerView({model: peer});
            this.el.appendChild(peerView.render());
            peer.peer.once("open", function(){
                self.graphView.render();
                self.listenTo(peer, "connection", self.graphView.render.bind(self.graphView));
                
                var peerLogView = new PeerLogView({model: peer});
                document.getElementById("sidrlogs").appendChild(peerLogView.render());
            });
            
            
        },
        render: function(){
            console.log("peers is rendering");
            var self = this;
            self.el.innerHTML = null;
            
            this.model.each(function(peer){//model should be a collection
                var peerView = new PeerView({model: peer});
                self.el.appendChild(peerView.render());
            });
            return self.el;
        }
    });
    return PeersView;
});