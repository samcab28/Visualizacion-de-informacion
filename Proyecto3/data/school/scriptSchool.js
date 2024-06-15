d3.json('school.json').then(data => {
  // Verifica que los datos existen y tienen la estructura esperada
  if (!data || !data.nodes) {
      throw new Error('El archivo JSON no contiene los datos esperados.');
  }

  // Mapea los nodos
  const nodes = data.nodes.map(d => ({
      id: d.key,
      label: d.attributes.label,
      size: d.attributes.size,
      color: d.attributes.color,
      group: d.attributes['0'], // Asume que '0' es el grupo
      gender: d.attributes['1'] // Asume que '1' es el género
  }));

  const width = 960;
  const height = 600;

  const svg = d3.select("svg")
      .attr("width", width)
      .attr("height", height);

  const tooltip = d3.select("#tooltip");

  const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => d.color)
      .call(drag(simulation))
      .on("mouseover", (event, d) => {
          tooltip.transition()
              .duration(200)
              .style("opacity", .9);
          tooltip.html(`Label: ${d.label}<br/>Group: ${d.group}<br/>Gender: ${d.gender}`)
              .style("left", (event.pageX + 5) + "px")
              .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);
      });

  function ticked() {
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
  }

  function drag(simulation) {
      function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
      }

      function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
      }

      function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
      }

      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
  }

}).catch(error => {
  console.error('Error:', error);
});
