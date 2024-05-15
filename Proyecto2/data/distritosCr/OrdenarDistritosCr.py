import pandas as pd



# Lee el archivo CSV original
df = pd.read_csv('C:/Users/samir/Visualizacion/Proyecto2/data/distritosCr/distritosCr.csv')


# Divide la columna ID en provincia, canton y distrito
df[['PROVINCIA', 'CANTON', 'DISTRITO']] = df['ID'].str.split('.', expand=True)

# Reorganiza las columnas
df = df[['ID', 'PROVINCIA', 'CANTON', 'DISTRITO', 'COD_POSTAL', 'AREA_KM2', 'POBL_2022', 'POBL_2011', 'POBL_2000']]

# Guarda el nuevo CSV
df.to_csv('./Proyecto2/data/distritosCr/DistritosCrOrdenado.csv', index=False)
