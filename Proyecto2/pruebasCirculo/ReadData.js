const fs = require('fs');

function read_data(file_path) {
    try {
        const data = fs.readFileSync(file_path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Path del JSON
const filePath = '../data/distritosCr/distritosCrEstructura.json';

// Lee el archivo y asigna los datos a una variable llamada data_leida
const data_leida = read_data(filePath);

// Función para comparar entidades por población
const compararPorPoblacion = (a, b) => {
    let poblacionA = 0;
    let poblacionB = 0;

    if ("cantones" in a) {
        poblacionA = a["cantones"].reduce((total, canton) => total + canton["poblacion"], 0);
    } else {
        poblacionA = parseInt(a["poblacion"], 10);
    }

    if ("cantones" in b) {
        poblacionB = b["cantones"].reduce((total, canton) => total + canton["poblacion"], 0);
    } else {
        poblacionB = parseInt(b["poblacion"], 10);
    }

    return poblacionB - poblacionA;
};

// Función para construir el árbol
function construirArbolCostaRica(filePath) {
    const data = read_data(filePath);
    if (!data || !("CostaRica" in data)) {
        console.error("Error: Archivo JSON no contiene la estructura esperada.");
        return null;
    }

    const arbol = { name: "Costa Rica", children: [] };
    let poblacionTotalProvincias = 0;

    const costaRica = data["CostaRica"];

    if ("provincias" in costaRica) {
        // Ordenar provincias por población
        costaRica["provincias"].sort(compararPorPoblacion);

        costaRica["provincias"].forEach((provincia) => {
            let poblacionProvincia = 0; // Población inicial de la provincia
            const provinciaNode = { name: `${provincia["provincia"]} (${poblacionProvincia})`, children: [] };
            const cantones = provincia["cantones"];

            cantones.forEach((canton) => {
                // Ordenar distritos por población
                canton["distritos"].sort(compararPorPoblacion);

                const poblacionCanton = canton["distritos"].reduce((total, distrito) => {
                    const poblacionDistrito = parseInt(distrito["poblacion"], 10); // Convertir población a entero
                    if (!isNaN(poblacionDistrito)) {
                        return total + poblacionDistrito;
                    }
                    return total;
                }, 0);

                const cantonNode = { name: `${canton["canton"]} (${poblacionCanton})`, children: [] };

                const distritos = canton["distritos"];
                distritos.forEach((distrito) => {
                    cantonNode.children.push({ name: `${distrito["distrito"]} (${distrito["poblacion"]})` });
                });

                provinciaNode.children.push(cantonNode);
                poblacionProvincia += poblacionCanton;
            });

            poblacionTotalProvincias += poblacionProvincia;
            provinciaNode.name = `${provincia["provincia"]} (${poblacionProvincia})`;
            arbol.children.push(provinciaNode);
        });
    }

    arbol.name = `Costa Rica (${poblacionTotalProvincias})`;

    return arbol;
}

const datavar = construirArbolCostaRica(filePath);

// Print the entire tree structure
console.log(JSON.stringify(datavar, null, 2));

export default datavar;


