import json

def crear_estructura_jerarquica(archivo_json):
    with open(archivo_json, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    estructura_jerarquica = {
        "CostaRica": {
            "provincias": []
        }
    }

    for item in data:
        provincia = item['PROVINCIA']
        canton = item['CANTON']
        distrito = item['DISTRITO']
        poblacion = item['POBL_2022']

        # Busca la provincia en la lista de provincias, si no existe la agrega
        provincia_data = next((p for p in estructura_jerarquica["CostaRica"]["provincias"] if p["provincia"] == provincia), None)
        if provincia_data is None:
            provincia_data = {
                "provincia": provincia,
                "cantones": []
            }
            estructura_jerarquica["CostaRica"]["provincias"].append(provincia_data)

        # Busca el cantón en la lista de cantones de la provincia, si no existe lo agrega
        canton_data = next((c for c in provincia_data["cantones"] if c["canton"] == canton), None)
        if canton_data is None:
            canton_data = {
                "canton": canton,
                "distritos": []
            }
            provincia_data["cantones"].append(canton_data)

        # Agrega el distrito al cantón
        distrito_data = {
            "distrito": distrito,
            "poblacion": poblacion
        }
        canton_data["distritos"].append(distrito_data)

    return estructura_jerarquica

ruta_archivo_json = 'C:/Users/samir/Visualizacion/Proyecto2/data/distritosCr/distritosCrOrdenado.json'
ruta_archivo_nuevo = 'C:/Users/samir/Visualizacion/Proyecto2/data/distritosCr/distritosCrEstructura.json'

estructura = crear_estructura_jerarquica(ruta_archivo_json)

with open(ruta_archivo_nuevo, 'w', encoding='utf-8') as file:
    json.dump(estructura, file, indent=2, ensure_ascii=False)
