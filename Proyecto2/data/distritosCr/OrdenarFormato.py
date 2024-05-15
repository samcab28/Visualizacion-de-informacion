import pandas as pd

# Lee el archivo CSV original
df = pd.read_csv('C:/Users/samir/Visualizacion/Proyecto2/data/distritosCr/distritosCr.csv')

# Divide la columna ID en provincia, canton y distrito
df[['PROVINCIA', 'CANTON', 'DISTRITO']] = df['ID'].str.split('.', expand=True)

# Reorganiza las columnas
df = df[['ID', 'PROVINCIA', 'CANTON', 'DISTRITO', 'COD_POSTAL', 'AREA_KM2', 'POBL_2022', 'POBL_2011', 'POBL_2000']]

# Guarda el nuevo CSV
df.to_csv('./Proyecto2/data/distritosCr/DistritosCrOrdenado.csv', index=False)

# Selecciona solo las columnas deseadas
#se debe de tener en cuenta que ademas de la poblacion del agno 2022, se puede tener en base 
#al area o a otros agnos
df_selected = df[['PROVINCIA', 'CANTON', 'DISTRITO', 'POBL_2022']]

# Guarda el DataFrame seleccionado en formato csv
df_selected.to_csv('./Proyecto2/data/distritosCr/DistritosCrSeleccionado.csv', index=False)
