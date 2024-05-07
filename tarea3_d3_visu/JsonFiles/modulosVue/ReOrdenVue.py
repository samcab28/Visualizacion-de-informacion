import pandas as pd

# Lee el archivo CSV original
df = pd.read_csv('C:/Users/samir/Visualizacion/tarea3_d3_visu/JsonFiles/modulosVue/modulosVue.csv')

# Filtra los registros que contienen los puntos necesarios en la columna 'id'
filtered_df = df[df['pathname'].str.count('\\.') >= 3].copy()  # Copia el DataFrame para evitar la advertencia

# Divide la columna 'pathname' en 'package', 'function', 'name' y 'secondName'
split_data = filtered_df['pathname'].str.split('\\.', expand=True)
filtered_df.loc[:, 'package'] = split_data[1]
filtered_df.loc[:, 'function'] = split_data[2]
filtered_df.loc[:, 'name'] = split_data[3]

# Reorganiza las columnas
filtered_df = filtered_df[['pathname', 'package', 'function', 'name', 'size']]

# Guarda el nuevo CSV
filtered_df.to_csv('modulosVueOrdenado.csv', index=False)
