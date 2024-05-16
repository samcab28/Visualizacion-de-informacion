import json

ruta_archivo_json = 'C:/Users/samir/Visualizacion/Proyecto2/data/distritosCr/distritosCrEstructura.json'

def leer_estructura_costa_rica(archivo_json):
    with open(archivo_json, 'r', encoding='utf-8') as file:
        data = json.load(file)

    if "CostaRica" in data:
        costa_rica = data["CostaRica"]
        print("Costa Rica:")
        for provincia in costa_rica["provincias"]:
            print(f"  Provincia: {provincia['provincia']}")
            for canton in provincia["cantones"]:
                print(f"    Canton: {canton['canton']}")
                for distrito in canton["distritos"]:
                    print(f"      Distrito: {distrito['distrito']}, Poblacion: {distrito['poblacion']}")

leer_estructura_costa_rica(ruta_archivo_json)
