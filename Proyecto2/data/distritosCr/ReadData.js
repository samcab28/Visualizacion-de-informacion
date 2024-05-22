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

// Función para comparar entidades por población (opcional, no usada en este ejemplo)
const compararPorPoblacion = (a, b) => {
    let poblacionA = a.poblacion || (a.cantones ? a.cantones.reduce((total, canton) => total + canton.poblacion, 0) : 0);
    let poblacionB = b.poblacion || (b.cantones ? b.cantones.reduce((total, canton) => total + canton.poblacion, 0) : 0);

    return poblacionB - poblacionA;
};

// Función para construir el árbol
function construirArbolCostaRica(data) {
    const arbol = { name: "Costa Rica", size: "5196852", children: [] }; // Agregar el tamaño total de Costa Rica

    if (data.CostaRica && data.CostaRica.provincias) {
        data.CostaRica.provincias.forEach((provincia) => {
            let poblacionProvincia = 0; // Población inicial de la provincia
            const provinciaNode = { name: provincia.provincia, size: 0, children: [] }; // Agregar la propiedad size a la provincia

            provincia.cantones.forEach((canton) => {
                let poblacionCanton = 0; // Población inicial del cantón
                const cantonNode = { name: canton.canton, size: 0, children: [] }; // Agregar la propiedad size al cantón

                canton.distritos.forEach((distrito) => {
                    const poblacionDistrito = parseInt(distrito.poblacion, 10);
                    if (!isNaN(poblacionDistrito)) {
                        const distritoNode = { name: distrito.distrito, size: poblacionDistrito }; // Agregar el tamaño del distrito
                        cantonNode.children.push(distritoNode);
                        poblacionCanton += poblacionDistrito;
                    }
                });

                cantonNode.size = poblacionCanton; // Actualizar el tamaño del cantón
                provinciaNode.children.push(cantonNode);

                poblacionProvincia += poblacionCanton;
            });

            provinciaNode.size = poblacionProvincia; // Actualizar el tamaño de la provincia
            arbol.children.push(provinciaNode);
        });
    }

    // Guardar el resultado en el archivo data.json
    fs.writeFileSync('./data2.json', JSON.stringify(arbol, null, 2));

    return arbol;
}

// Cargar el archivo JSON
const data = read_data(filePath);

// Construir el árbol
const arbol = construirArbolCostaRica(data);

// Imprimir el árbol completo
console.log(JSON.stringify(arbol, null, 2));
