var width = 1000; // Ancho del SVG
var height = 1000; // Alto del SVG
var centerX = width / 2; // Centro en X
var centerY = height / 2; // Centro en Y

var input = [
    {"name": "Costa Rica",
    "size": "5196852"}
];

var input2 = [
    {"name": "SanJosé",
    "size": 1685299,},
    {"name": "Alajuela",
    "size": 1039127},
    {"name": "Cartago",
    "size": 547691},
    {"name": "Heredia",
    "size": 539598},
    {"name": "Guanacaste",
    "size": 404774},
    {"name": "Puntarenas",
    "size": 510566},
    {"name": "Limón",
    "size": 469797}
];

var input3 = [
    {"name": "SanJosé", "size": 351958},
    {"name": "Escazú", "size": 71202},
    {"name": "Desamparados", "size": 249367},
    {"name": "Puriscal", "size": 38593},
    {"name": "Tarrazú", "size": 18787},
    {"name": "Aserrí", "size": 64480},
    {"name": "Mora", "size": 30759},
    {"name": "Goicoechea", "size": 140764},
    {"name": "SantaAna", "size": 61853},
    {"name": "Alajuelita", "size": 97158},
    {"name": "VázquezdeCoronado", "size": 72932},
    {"name": "Acosta", "size": 22257},
    {"name": "Tibás", "size": 86065},
    {"name": "Moravia", "size": 63259},
    {"name": "MontesdeOca", "size": 62844},
    {"name": "Turrubares", "size": 7031},
    {"name": "Dota", "size": 8041},
    {"name": "Curridabat", "size": 80677},
    {"name": "PérezZeledón", "size": 143282},
    {"name": "LeónCortés", "size": 13990}
];



var angleGen = d3.pie()
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .padAngle(.05)
    .value((d) => d.size)
    .sortValues((a, b) => a < b ? 1 : -1);

var data = angleGen(input);
var data2 = angleGen(input2);
var data3 = angleGen(input3);
var data4 = angleGen(input4);

var arcGen = d3.arc()
    .innerRadius(300)
    .outerRadius(400); 

var arcGen2 = d3.arc()
    .innerRadius(200)
    .outerRadius(300);

var arcGen3 = d3.arc()
    .innerRadius(0)
    .outerRadius(200); 


var svg = d3.select("#demo10")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + centerX + "," + centerY + ")");

svg.selectAll(".outer-circle-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "outer-circle-group")
    .each(function(d) {
        var group = d3.select(this);
        group.append("path")
            .attr("class", "outer-circle")
            .attr("d", arcGen(d))
            .attr("fill", "pink")
            .attr("stroke", "gray")
            .attr("stroke-width", 1);
        group.append("text")
            .attr("transform", "translate(" + arcGen.centroid(d) + ")")
            .attr("text-anchor", "middle")
            .text(d.data.name);
    });

svg.selectAll(".inner-circle-group1")
    .data(data2)
    .enter()
    .append("g")
    .attr("class", "inner-circle-group1")
    .each(function(d) {
        var group = d3.select(this);
        group.append("path")
            .attr("class", "inner-circle1")
            .attr("d", arcGen2(d))
            .attr("fill", "red")
            .attr("stroke", "gray")
            .attr("stroke-width", 1);
        group.append("text")
            .attr("transform", "translate(" + arcGen2.centroid(d) + ")")
            .attr("text-anchor", "middle")
            .text(d.data.name);
    });

svg.selectAll(".inner-circle-group2")
    .data(data3)
    .enter()
    .append("g")
    .attr("class", "inner-circle-group2")
    .each(function(d) {
        var group = d3.select(this);
        group.append("path")
            .attr("class", "inner-circle2")
            .attr("d", arcGen3(d))
            .attr("fill", "green")
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
        group.append("text")
            .attr("transform", "translate(" + arcGen3.centroid(d) + ")")
            .attr("text-anchor", "middle")
            .text(d.data.name);
    });

svg.selectAll(".inner-circle-group3")
    .data(data4)
    .enter()
    .append("g")
    .attr("class", "inner-circle-group3")
    .each(function(d) {
        var group = d3.select(this);
        group.append("path")
            .attr("class", "inner-circle3")
            .attr("d", arcGen4(d))
            .attr("fill", "blue")
            .attr("stroke", "gray")
            .attr("stroke-width", 3);
        group.append("text")
            .attr("transform", "translate(" + arcGen4.centroid(d) + ")")
            .attr("text-anchor", "middle")
            .text(d.data.name);
    });