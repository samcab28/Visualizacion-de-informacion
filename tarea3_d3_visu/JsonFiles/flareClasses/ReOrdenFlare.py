import pandas as pd

# Lee el archivo CSV original
df = pd.read_csv('C:/Users/samir/Visualizacion/tarea3_d3_visu/JsonFiles/flareClasses/flareClasses.csv')

# Filtra los registros que contienen los puntos necesarios en la columna 'id'
filtered_df = df[df['id'].str.count('\\.') >= 2]

# Divide la columna 'id' en 'package', 'function' y 'name'
split_data = filtered_df['id'].str.split('\\.', expand=True)
filtered_df['package'] = split_data[0]
filtered_df['function'] = split_data[1]
filtered_df['name'] = split_data[2]

# Reorganiza las columnas
filtered_df = filtered_df[['id', 'package', 'function', 'name', 'value']]

# Guarda el nuevo CSV
filtered_df.to_csv('flareClassesOrdenado.csv', index=False)
