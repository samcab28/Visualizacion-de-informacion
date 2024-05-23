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
const filePath = 'C:\\Users\\samir\\Visualizacion\\Proyecto2\\data\\flareClasses\\flareClasses.json';

// Función para construir el árbol jerárquico
function construirArbol(data) {
    const arbol = { name: "flare", children: [] };
    const packageMap = new Map();

    data.forEach(item => {
        if (!packageMap.has(item.package)) {
            packageMap.set(item.package, { name: item.package, children: [] });
            arbol.children.push(packageMap.get(item.package));
        }

        const packageNode = packageMap.get(item.package);
        const functionMap = new Map();

        if (!functionMap.has(item.function)) {
            functionMap.set(item.function, { name: item.function, children: [] });
            packageNode.children.push(functionMap.get(item.function));
        }

        const functionNode = functionMap.get(item.function);
        const nameNode = { name: item.name, children: [{ name: item.secondName, size: item.value }] };

        functionNode.children.push(nameNode);
    });

    // Guardar el resultado en el archivo dataflare.json
    fs.writeFileSync('./dataflare.json', JSON.stringify(arbol, null, 2));

    return arbol;
}

// Cargar el archivo JSON
const data = read_data(filePath);

// Construir el árbol jerárquico
const arbol = construirArbol(data);

// Imprimir el árbol completo
console.log(JSON.stringify(arbol, null, 2));
