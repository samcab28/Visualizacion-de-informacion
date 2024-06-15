let nodes, links;
let simulation; // Definimos la variable simulation a nivel global
let numAlphaDecay = 30; //definicion del aphadecay de manera automatica

// Carga de datos de nodos
d3.json('cleanDataSchool/NodeSchool.json').then(data => {
    nodes = data;
    // Asignamos posiciones aleatorias iniciales a los nodos
    nodes.forEach(node => {
        node.x = Math.random() * width;
        node.y = Math.random() * height;
    });
    initializeSimulation();
}).catch(error => {
    console.error('Error:', error);
});

// Carga de datos de enlaces
d3.json('cleanDataSchool/EdgeSchool.json').then(data => {
    links = data;
    initializeSimulation();
}).catch(error => {
    console.error('Error:', error);
});

// Configuración de la ventana
const width = 800;
const height = 800;
const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black'); // Agregar borde negro

// Función de inicialización de la simulación
function initializeSimulation() {
    if (!nodes || !links) return;

    const linkElements = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#E5E5E5');

    function getNodeColor(node) {
        return node.attributes.color;
    }

    const nodeElements = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', getNodeColor)
        .call(dragDrop);

    const textElements = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text(node => node.attributes.label)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);

    simulation = d3.forceSimulation(nodes) // Asignamos la simulación a la variable global
        .force('link', d3.forceLink(links)
            .id(link => link.key)
            .strength(link => link.weight)
        )
        .force('charge', d3.forceManyBody().strength(-50)) // Reducir la fuerza de repulsión
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(20)) // Fuerza de colisión para evitar superposición
        .force('x', d3.forceX().strength(0.1)) // Fuerza de atracción hacia un punto central en X
        .force('y', d3.forceY().strength(0.1)) // Fuerza de atracción hacia un punto central en Y
        .alphaDecay(1 - Math.pow(0.001, 1 / numAlphaDecay)); // Ajustar alphaDecay para estabilizar

    simulation
        .on('tick', () => {
            nodeElements
                .attr('cx', node => node.x)
                .attr('cy', node => node.y);

            textElements
                .attr('x', node => node.x)
                .attr('y', node => node.y);

            linkElements
                .attr('x1', link => link.source.x)
                .attr('y1', link => link.source.y)
                .attr('x2', link => link.target.x)
                .attr('y2', link => link.target.y);
        });
}

// Función de arrastrar y soltar
const dragDrop = d3.drag()
    .on('start', (event, node) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        node.fx = node.x;
        node.fy = node.y;
    })
    .on('drag', (event, node) => {
        node.fx = event.x;
        node.fy = event.y;
    })
    .on('end', (event, node) => {
        if (!event.active) simulation.alphaTarget(0);
        node.fx = node.x;
        node.fy = node.y;
    });

// Función para actualizar el alphaDecay
function updateAlphaDecay() {
    const alphaDecayInput = document.getElementById('alphaDecay').value;
    numAlphaDecay = alphaDecayInput;
    simulation.alphaDecay(1 - Math.pow(0.001, 1 / numAlphaDecay));
    simulation.alpha(1).restart(); // Reiniciar la simulación para aplicar los cambios
}
