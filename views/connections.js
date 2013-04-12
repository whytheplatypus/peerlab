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
                .charge(-120)
                .linkDistance(30)
                .size([width, height]);
            
            this.el = svg;
        },
        
        render: function() {
            var self = this;
            var graph = this.model.graph();
            this.el.selectAll(".node").remove();
            this.el.selectAll(".link").remove();

            this.force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
            
            var link = this.el.selectAll(".link")
              .data(graph.links)
            .enter().append("line")
              .attr("class", "link")
              .style("stroke-width", 1);
            
            var node = this.el.selectAll(".node")
              .data(graph.nodes)
            .enter().append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .style("fill", function(d) { return self.color(d.group); })
              .call(this.force.drag);
            
            node.append("title")
              .text(function(d) { return d.id; });
            
            this.force.on("tick", function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                
                node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
            });
            

            
        }
        
    });

    return connections;
});