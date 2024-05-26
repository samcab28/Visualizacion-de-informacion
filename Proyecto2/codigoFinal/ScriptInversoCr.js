document.addEventListener("DOMContentLoaded", function() {
    var width = 2000;
    var height = 2000;
    var radius = Math.min(width, height) / 3;

    var svg = d3.select("#demo10")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.json("dataCr.json").then(function(input) {
        var root = d3.hierarchy(input)
            .sum(function(d) { return d.size; })
            .sort(function(a, b) { return b.value - a.value; });

        var partition = d3.partition()
            .size([2 * Math.PI, radius]);

        partition(root);

        var colorScale = d3.scaleOrdinal()
            .domain(["San José", "Guanacaste", "Puntarenas", "Alajuela", "Cartago", "Limón", "Heredia"])
            .range(["blue", "green", "orange", "red", "purple", "yellow", "gray"]);

        var arc = d3.arc()
            .startAngle(function(d) { return d.x0; })
            .endAngle(function(d) { return d.x1; })
            .innerRadius(function(d) { return radius * d.depth / root.height; })
            .outerRadius(function(d) { return radius * (d.depth + 1) / root.height; });

        svg.selectAll("path")
            .data(root.descendants())
            .enter().append("path")
            .attr("display", function(d) { return d.depth ? null : "none"; }) // Hide the root node
            .attr("d", arc)
            .style("stroke", function(d) { return d.depth === 0 ? "lightblue" : null; }) // Cambia el color del contorno
            .style("fill", function(d) { 
                return d.depth === 0 ? "white" : d.depth === 1 ? colorScale(d.data.name) : d.parent ? colorScale(d.parent.data.name) : null;
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
            .style("font-size", function(d) {
                var fontSize = Math.min((2 * radius * Math.PI) / root.height, 30); // Limit font size to 24px
                return fontSize + "px";
            })
            .style("fill", function(d) { return d.depth === 0 ? "black" : "black"; })
            .text(function(d) { return d.parent ? d.data.name : "Costa Rica, pob: 5196852"; });

        function computeTextRotation(d) {
            return 0; // Rotación siempre vertical
        }
    });
});
