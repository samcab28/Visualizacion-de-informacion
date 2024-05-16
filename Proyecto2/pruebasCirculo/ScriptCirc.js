var width = 1000; // Ancho del SVG
var height = 1000; // Alto del SVG
var centerX = width / 2; // Centro en X
var centerY = height / 2; // Centro en Y

var input = [
    { name: "a", size: "1" },
    { name: "b", size: "1" },
    { name: "c", size: "1" },
    { name: "d", size: "1" },
    { name: "e", size: "4" },
    { name: "f", size: "2" },
    { name: "g", size: "2" },
    { name: "h", size: "4" }
];

var input2 = [
    { name: "a", size: "5" },
    { name: "b", size: "6" },
    { name: "c", size: "2" },
    { name: "d", size: "1" },
    { name: "e", size: "1" },
    { name: "f", size: "3" },
    { name: "g", size: "2" },
    { name: "h", size: "3" }
];

var input3 = [
    { name: "a", size: "52" },
    { name: "b", size: "66" },
    { name: "c", size: "24" },
    { name: "d", size: "11" },
    { name: "e", size: "13" },
    { name: "f", size: "31" },
    { name: "g", size: "23" },
    { name: "h", size: "35" }
];

var input4 = [
    { name: "a", size: "5" },
    { name: "b", size: "6" },
    { name: "c", size: "2" },
    { name: "d", size: "2" },
    { name: "e", size: "3" },
    { name: "f", size: "5" },
    { name: "g", size: "2" },
    { name: "h", size: "3" }
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
    .innerRadius(100)
    .outerRadius(200); 

var arcGen4 = d3.arc()
    .innerRadius(0)
    .outerRadius(100);

var svg = d3.select("#demo10")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + centerX + "," + centerY + ")");

svg.selectAll(".outer-circle")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "outer-circle")
    .attr("d", arcGen)
    .attr("fill", "pink")
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

svg.selectAll(".inner-circle1")
    .data(data2)
    .enter()
    .append("path")
    .attr("class", "inner-circle1")
    .attr("d", arcGen2)
    .attr("fill", "red")
    .attr("stroke", "gray")
    .attr("stroke-width", 1);

svg.selectAll(".inner-circle2")
    .data(data3)
    .enter()
    .append("path")
    .attr("class", "inner-circle2")
    .attr("d", arcGen3)
    .attr("fill", "green")
    .attr("stroke", "gray")
    .attr("stroke-width", 2);

svg.selectAll(".inner-circle3")
    .data(data4)
    .enter()
    .append("path")
    .attr("class", "inner-circle3")
    .attr("d", arcGen4)
    .attr("fill", "blue")
    .attr("stroke", "gray")
    .attr("stroke-width", 3);

