function createVisualization() {
    const width = 2000;
    const height = 2000;
    const radius = Math.min(width, height) / 3;

    const svg = d3.select("#demo10")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Cargar el archivo JSON
    d3.json('dataFlare.json').then(function(data) {
        var root = d3.hierarchy(data)
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
            .innerRadius(function(d) { return radius - (d.depth * radius / root.height) * 0.8; }) // Multiplicador para ajustar el tamaño
            .outerRadius(function(d) { return radius - ((d.depth - 1) * radius / root.height) * 0.8; }); // Multiplicador para ajustar el tamaño

        svg.selectAll("path")
            .data(root.descendants())
            .enter().append("path")
            .attr("display", function(d) { return d.depth ? null : "none"; }) // Hide the root node
            .attr("d", arc)
            .style("stroke", "#fff")
            .style("fill", function(d) { 
                return d.depth === 1 ? colorScale(d.data.name) : d.parent ? colorScale(d.parent.data.name) : null;
            })
            .append("title")
            .text(function(d) { return d.data.name + "\n" + d.value; });

        svg.selectAll("text")
            .data(root.descendants())
            .enter().append("text")
            .attr("transform", function(d) { 
                return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
            })
            .attr("dx", "-100") // radius margin
            .attr("dy", ".5em")
            .style("font-size", function(d) {
                var fontSize = Math.min((2 * radius * Math.PI) / root.height, 30);
                return fontSize + "px";
            })
            .text(function(d) { return d.parent ? d.data.name : ""; });

        function computeTextRotation(d) {
            var angle = (d.x0 + d.x1) / Math.PI * 90;
            return (angle < 180) ? angle - 90 : angle + 90;
        }

    });
}

document.addEventListener("DOMContentLoaded", createVisualization);
