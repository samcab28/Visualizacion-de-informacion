// ScriptCirc.js

// Importa la estructura de datos desde data.js
import costaRicaData from './data.js';

var width = 1000;
var height = 1000;
var radius = Math.min(width, height) / 2;

var svg = d3.select("#demo10")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var root = d3.hierarchy(costaRicaData)
    .sum(function(d) { return d.size; })
    .sort(function(a, b) { return b.value - a.value; });

var partition = d3.partition()
    .size([2 * Math.PI, radius]);

partition(root);

var arc = d3.arc()
    .startAngle(function(d) { return d.x0; })
    .endAngle(function(d) { return d.x1; })
    .innerRadius(function(d) { return radius - (d.depth * radius / root.height); })
    .outerRadius(function(d) { return radius - ((d.depth - 1) * radius / root.height); });

svg.selectAll("path")
    .data(root.descendants())
    .enter().append("path")
    .attr("display", function(d) { return d.depth ? null : "none"; }) // Hide the root node
    .attr("d", arc)
    .style("stroke", "#fff")
    .style("fill", function(d) { 
        switch(d.depth) {
            case 1: return "pink"; // Provincias
            case 2: return "red";  // Cantones
            default: return "green"; // Default color
        }
    })
    .append("title")
    .text(function(d) { return d.data.name + "\n" + d.value; });

svg.selectAll("text")
    .data(root.descendants())
    .enter().append("text")
    .attr("transform", function(d) { 
        return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
    })
    .attr("dx", "-20") // radius margin
    .attr("dy", ".5em")
    .text(function(d) { return d.parent ? d.data.name : ""; });

function computeTextRotation(d) {
    var angle = (d.x0 + d.x1) / Math.PI * 90;
    return (angle < 180) ? angle - 90 : angle + 90;
}
