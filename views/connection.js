define(['Backbone'], function(Backbone){
    var ConnectionView = Backbone.View.extend({
        tagName: 'li',
        template: "#connection-template",
        initialize: function(){
            var self = this;
            //this.model DataConnection
        },
        render: function(){
            var self = this;
            var id = self.options.origin.id+self.model.peer+self.model.label;
            var t = document.querySelector(this.template);
            t.content.querySelector('.connection-id').innerHTML = this.model.peer + " : "+this.model.label;
            
            t.content.querySelector('.toggle-send').setAttribute('data-target', "#"+id);
            t.content.querySelector('.collapse').id = id;
            
            t.content.querySelector('button').id="connect_"+id
            
            this.el.innerHTML = null;
            this.el.appendChild(t.content.cloneNode(true));
            
            this.el.querySelector("#connect_"+id).addEventListener('click', function(){
                var msg = this.form.message.value;
                try{
                    msg = JSON.parse(msg);
                } catch(e){
                    console.log(e);
                    //send it normally
                }
                self.options.origin.log({type:'sent', message:msg, to:self.model.peer});
                console.log(self.model.isOpen());
                self.model.send(msg);
                this.form.message.value = "";
            }, false);
            
            return this.el;
        }
    });
    return ConnectionView;
});