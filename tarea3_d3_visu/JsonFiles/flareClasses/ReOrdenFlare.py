import pandas as pd

# Lee el archivo CSV original
df = pd.read_csv('C:/Users/samir/Visualizacion/tarea3_d3_visu/JsonFiles/flareClasses/flareClasses.csv')

# Filtra los registros que contienen los puntos necesarios en la columna 'id'
filtered_df = df[df['id'].str.count('\\.') >= 3].copy()  # Copia el DataFrame para evitar la advertencia

# Divide la columna 'id' en 'package', 'function', 'name' y 'secondName'
split_data = filtered_df['id'].str.split('\\.', expand=True)
filtered_df.loc[:, 'package'] = split_data[0]
filtered_df.loc[:, 'function'] = split_data[1]
filtered_df.loc[:, 'name'] = split_data[2]
filtered_df.loc[:, 'secondName'] = split_data[3]

# Reorganiza las columnas
filtered_df = filtered_df[['id', 'package', 'function', 'name', 'secondName', 'value']]

# Guarda el nuevo CSV
filtered_df.to_csv('flareClassesOrdenadoRadial.csv', index=False)
