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

// Función para comparar entidades por población
const compararPorPoblacion = (a, b) => {
    let poblacionA = a.poblacion || (a.cantones ? a.cantones.reduce((total, canton) => total + canton.poblacion, 0) : 0);
    let poblacionB = b.poblacion || (b.cantones ? b.cantones.reduce((total, canton) => total + canton.poblacion, 0) : 0);

    return poblacionB - poblacionA;
};

// Función para construir el árbol
function construirArbolCostaRica(data) {
    const arbol = { name: "Costa Rica", children: [] };
    let poblacionTotalProvincias = 0;

    if (data.CostaRica && data.CostaRica.provincias) {
        // Ordenar provincias por población
        data.CostaRica.provincias.sort(compararPorPoblacion);

        data.CostaRica.provincias.forEach((provincia) => {
            let poblacionProvincia = 0; // Población inicial de la provincia
            const provinciaNode = { name: `${provincia.provincia} (${poblacionProvincia})`, children: [] };
            const cantones = provincia.cantones;

            cantones.forEach((canton) => {
                // Ordenar distritos por población
                canton.distritos.sort(compararPorPoblacion);

                const poblacionCanton = canton.distritos.reduce((total, distrito) => {
                    const poblacionDistrito = parseInt(distrito.poblacion, 10); // Convertir población a entero
                    if (!isNaN(poblacionDistrito)) {
                        return total + poblacionDistrito;
                    }
                    return total;
                }, 0);

                const cantonNode = { name: `${canton.canton} (${poblacionCanton})`, children: [] };

                const distritos = canton.distritos;
                distritos.forEach((distrito) => {
                    cantonNode.children.push({ name: `${distrito.distrito} (${distrito.poblacion})` });
                });

                provinciaNode.children.push(cantonNode);
                poblacionProvincia += poblacionCanton;
            });

            poblacionTotalProvincias += poblacionProvincia;
            provinciaNode.name = `${provincia.provincia} (${poblacionProvincia})`;
            arbol.children.push(provinciaNode);
        });
    }

    arbol.name = `Costa Rica (${poblacionTotalProvincias})`;

    // Guardar el resultado en el archivo data.json
    fs.writeFileSync('./data.json', JSON.stringify(arbol, null, 2));

    return arbol;
}

// Cargar el archivo JSON
const data = read_data(filePath);

// Construir el árbol
const arbol = construirArbolCostaRica(data);

console.log(arbol);
