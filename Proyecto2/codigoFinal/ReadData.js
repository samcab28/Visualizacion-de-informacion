//path del json
const filePath = '../data/distritosCr/distritosCrEstructura.json';


// Función para comparar cantones por población
const compararPorPoblacion = (a, b) => {
    const poblacionA = a["distritos"].reduce((total, distrito) => total + distrito["poblacion"], 0);
    const poblacionB = b["distritos"].reduce((total, distrito) => total + distrito["poblacion"], 0);
    return poblacionB - poblacionA;
};

// Función para construir el árbol
function construirArbolCostaRica(data) {
    const arbol = { name: "Costa Rica", children: [] };

    if ("CostaRica" in data) {
        const costaRica = data["CostaRica"];

        if ("provincias" in costaRica) {
            costaRica["provincias"].forEach((provincia) => {
                const provinciaNode = { name: provincia["provincia"], children: [] };
                const cantones = provincia["cantones"];

                // Ordenar cantones por población
                cantones.sort(compararPorPoblacion);

                cantones.forEach((canton) => {
                    const poblacionCanton = canton["distritos"].reduce((total, distrito) => total + distrito["poblacion"], 0);
                    const cantonNode = { name: `${canton["canton"]} (${poblacionCanton})`, children: [] };

                    const distritos = canton["distritos"];
                    distritos.forEach((distrito) => {
                        cantonNode.children.push({ name: `${distrito["distrito"]} (${distrito["poblacion"]})` });
                    });

                    provinciaNode.children.push(cantonNode);
                });

                arbol.children.push(provinciaNode);
            });
        }
    }

    return arbol;
}

// Resto del código para crear el árbol visualización 1 (sin cambios)





//creacion del arbol visualizacion 1
fetch(filePath)
    .then(response => response.json())
    .then(data => {
        const arbolCostaRica = construirArbolCostaRica(data);
        console.log(arbolCostaRica);

        const margin = { top: 20, right: 120, bottom: 20, left: 120 };
        const width = 3000 - margin.left - margin.right;
        const height = 7000 - margin.top - margin.bottom;

        const svg = d3.select("#tree-svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const root = d3.hierarchy(arbolCostaRica);
        const treeLayout = d3.tree().size([height, width]);
        treeLayout(root);

        const link = svg.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const node = svg.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => {
                const maxLength = 200; // Máxima longitud del nombre del distrito antes de cortar
                if (d.data.name.length > maxLength) {
                    return `${d.data.name.substring(0, maxLength)}... (${d.data.name.substring(maxLength + 2)})`;
                }
                return d.data.name;
            })
            .clone(true).lower()
            .attr("stroke", "white");

    })
    .catch(error => {
        console.error('Error al procesar el JSON:', error);
    });