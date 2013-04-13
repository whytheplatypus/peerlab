define(['d3', 'Backbone'], function(d3, Backbone){
    var connections = Backbone.View.extend({
        //el: '',
        initialize: function() {
            var self = this;
            var width = 960,
            height = 500;
        
            var svg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);
            this.color = d3.scale.category20();
            
            this.force = d3.layout.force()
                .charge(-200)
                .linkDistance(70)
                .size([width, height]);
            
            this.el = svg;
            this.force.on("tick", function() {
                self.el.selectAll(".link").attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                
                self.el.selectAll(".node").attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                self.el.selectAll(".label").attr("x", function(d) { return d.x+20; })
                    .attr("y", function(d) { return d.y; });
            });
            self.startNode = false;
        },
        
        render: function() {
            var self = this;
            var graph = this.model.graph();
            //this.el.selectAll(".node").remove();
            //this.el.selectAll(".link").remove();
            //this.el.selectAll(".label").remove();
            self.startNode = false;
            self.force.stop();
            if(self.force.nodes().length){
                for(var i = 0; i < self.force.nodes().length; i++){
                    var same = _.findWhere(graph.nodes, {id: self.force.nodes()[i].id});
                    graph.nodes = _.without(graph.nodes, same);
                    console.log(same);
                }
                for(var i = 0; i < self.force.links().length; i++){
                    var same = _.where(graph.links, {source: self.force.links()[i].source, source: self.force.links()[i].target});
                    graph.links = _.without(graph.links, same);
                    console.log(same);
                }
                for(var i = 0; i < graph.links.length; i++){
                    self.force.links().push(graph.links[i]);
                }
                for(var i = 0; i < graph.nodes.length; i++){
                    self.force.nodes().push(graph.nodes[i]);
                }
                self.force.start();
            } else {
                this.force
                  .nodes(graph.nodes)
                  .links(graph.links)
                  .start();
            }
            
            var links = this.el.selectAll(".link")
              .data(self.force.links())
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", 1);
            
            var nodes = this.el.selectAll(".node")
              .data(self.force.nodes())
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 10)
              .style("fill", function(d) { console.log(self.color(d.group));return self.color(d.group); })
              .on('mousedown', function(d){
                  self.startNode = d;
                  console.log("mousedown on", d)
              })
              .on('mouseup', function(d){
                  if(self.startNode){
                      self.model.get(self.startNode.id).connect(d.id);
                  }
                  self.startNode = false;
                  console.log("mouseup on", d)
              });
              //.call(this.force.drag);;
            
            var labels = this.el.selectAll(".label")
                .data(self.force.nodes())
                .enter()
                .append("svg:text").attr("class", "label").text(function(d) { return d.id+d.group })
                .call(this.force.drag);
                
            
            nodes.append("title")
              .text(function(d) { return d.id; });
            
            
            

            
        }
        
    });

    return connections;
});