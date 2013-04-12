
define(['Backbone', './peer', './connections'], function(Backbone, PeerView, GraphView){
    var PeersView = Backbone.View.extend({
        el: "#peers",
        initialize: function(){
            console.log("initialize peers view ", this.model);
            var self = this;
            this.model.on('add', self.newpeer.bind(self));
            this.graphView = new GraphView({model: this.model});
        },
        newpeer: function(peer){
            var peerView = new PeerView({model: peer});
            this.el.appendChild(peerView.render());
            this.graphView.render();
            this.listenTo(peer, "connection", this.graphView.render.bind(this.graphView));
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