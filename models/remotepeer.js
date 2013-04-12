
define(['Backbone'], function(Backbone){
    var RemotePeer = Backbone.Model.extend({
        defaults: {
            id: false
        },
        initialize: function(){
            var self = this;
            self.set('connections', new Array());
        }
    });
    return RemotePeer
});