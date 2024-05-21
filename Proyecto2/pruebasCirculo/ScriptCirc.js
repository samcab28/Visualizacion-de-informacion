var width = 1000; // Ancho del SVG
var height = 1000; // Alto del SVG
var centerX = width / 2; // Centro en X
var centerY = height / 2; // Centro en Y
var maxRadius = 500; // Radio máximo

// Cargar los datos desde el archivo JSON
d3.json("data.json").then(function(inputs) {
    var profundidad = inputs.length;

    var angleGen = d3.pie()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .padAngle(.05)
        .value((d) => d.size)
        .sortValues((a, b) => a < b ? 1 : -1);

    var svg = d3.select("#demo10")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + centerX + "," + centerY + ")");

    for (var i = 0; i < profundidad; i++) {
        var innerRadius = (maxRadius / profundidad) * i;
        var outerRadius = (maxRadius / profundidad) * (i + 1);

        var arcGen = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        var data = angleGen(inputs[i]);

        svg.selectAll(".circle" + i)
            .data(data)
            .enter()
            .append("path")
            .attr("class", "circle" + i)
            .attr("d", arcGen)
            .attr("fill", d3.schemeCategory10[i % 10]) // Colores de D3
            .attr("stroke", "gray")
            .attr("stroke-width", 1 + i); // Aumenta el ancho del borde según el nivel
    }
});
