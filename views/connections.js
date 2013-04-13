define(['d3', 'Backbone'], function(d3, Backbone){
    var connections = Backbone.View.extend({
        //el: '',
        initialize: function() {
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
        },
        
        render: function() {
            var self = this;
            var graph = this.model.graph();
            this.el.selectAll(".node").remove();
            this.el.selectAll(".link").remove();
            this.el.selectAll(".label").remove();
            var startNode = false;
            this.force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
            
            var links = this.el.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", 1);
            
            var nodes = this.el.selectAll(".node")
              .data(graph.nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("r", 10)
              .style("fill", function(d) { return self.color(d.group); })
              .on('mousedown', function(d){
                  startNode = d;
                  console.log("mousedown on", d)
              })
              .on('mouseup', function(d){
                  if(startNode){
                      self.model.get(startNode.id).connect(d.id);
                  }
                  startNode = false;
                  console.log("mouseup on", d)
              });
              //.call(this.force.drag);;
            
            var labels = this.el.selectAll(".label")
                .data(graph.nodes)
                .enter()
                .append("svg:text").attr("class", "label").text(function(d) { return d.id })
                .call(this.force.drag);
                
            
            nodes.append("title")
              .text(function(d) { return d.id; });
            
            this.force.on("tick", function() {
                links.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                
                nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                labels.attr("x", function(d) { return d.x+20; })
                    .attr("y", function(d) { return d.y; });
            });
            

            
        }
        
    });

    return connections;
});