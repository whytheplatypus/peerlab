define(['Backbone', '../models/peer'], function(Backbone, Peer){
    var PeerCollection = Backbone.Collection.extend({
        model: Peer,
        graph: function(){
            var self = this;
            var json = {
                nodes: [],
                links: []
            };
            var searchArray = []
            this.each(function(node){
                var graphNode = {
                    'id': node.get('id'),
                    'group': 1 //1 is local
                };
                searchArray.push(graphNode.id);
                json.nodes.push(graphNode);
            });
            for(var i = 0; i < json.nodes.length; i++){
                var node = self.get(json.nodes[i].id);
                for(var conn in node.peer.connections){
                    console.log(_.indexOf(searchArray, conn));
                    json.links.push({
                        'source': i,
                        'target': _.indexOf(searchArray, conn),
                        'value': 1
                    });
                }
            }
            console.log(json);
            return json;
        }
    });
    return PeerCollection;
});