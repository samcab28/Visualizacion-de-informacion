#importacion de librerias 
library(ggplot2)
library(plotly)

#importacion de datos
datos <- estadisticas_policiales_2024_xls


#----------------------------------------------------------------------------------
#graficos unidimensionales
# Crear el gráfico de barras de frecuencia de tipos de delito
grafico_delito <- ggplot(datos, aes(x = Delito)) +
  geom_bar() +
  labs(x = "Tipo de Delito", y = "Frecuencia", title = "Frecuencia de Tipos de Delito")

# Convertir el gráfico a un gráfico interactivo
grafico_delito_interactivo <- ggplotly(grafico_delito)
grafico_delito_interactivo


# Crear el gráfico de barras de frecuencia de víctimas
grafico_victima <- ggplot(datos, aes(x = Victima)) +
  geom_bar() +
  labs(x = "Víctima", y = "Frecuencia", title = "Frecuencia de Delitos frente a Víctimas")

# Convertir el gráfico a un gráfico interactivo
grafico_victima_interactivo <- ggplotly(grafico_victima)
grafico_victima_interactivo


# Crear el gráfico de barras de cantidad de victimas por edad
grafico_edad <- ggplot(datos, aes(x = Edad)) + geom_bar() + labs(x = "Edad", y = "Cantidad de victimas", title = "Cantidad de victimas por edad")
grafico_edad

# Convertir el gráfico a un gráfico interactivo
grafico_edad_interactivo <- ggplotly(grafico_edad)
grafico_edad_interactivo


# Crear el gráfico de barras de cantidad de victimas por género
grafico_genero <- ggplot(datos, aes(x = Genero)) + geom_bar() + labs(x = "Género", y = "Cantidad de victimas", title = "Cantidad de victimas por Género")
grafico_genero

# Convertir el gráfico a un gráfico interactivo
grafico_genero_interactivo <- ggplotly(grafico_genero)
grafico_genero_interactivo
#----------------------------------------------------------------------------------
#graficos multidimnesionales
#opcion 1 para provincia vs delito: 
# Filtrar los datos para excluir la provincia "DESCONOCIDO"
datos_filtrados <- datos[datos$Provincia != "DESCONOCIDO", ]

# Crear el gráfico de barras de frecuencia de delito vs provincia
grafico_delito_provincia <- ggplot(datos_filtrados, aes(x = Provincia, fill = Delito)) +
  geom_bar(position = "dodge") +
  labs(x = "Provincia", y = "Frecuencia", title = "Frecuencia de Delito por Provincia") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  

# Convertir el gráfico a un gráfico interactivo
grafico_delito_provincia_interactivo <- ggplotly(grafico_delito_provincia)
grafico_delito_provincia_interactivo


#opcion 2 para provincia vs delito:
# Crear un resumen de la frecuencia de cada tipo de delito en cada provincia
resumen_delitos <- aggregate(datos_filtrados$Delito, by = list(datos_filtrados$Provincia, datos_filtrados$Delito), FUN = length)
names(resumen_delitos) <- c("Provincia", "Delito", "Frecuencia")

# Crear el gráfico de mapa de calor
grafico_mapa_calor <- ggplot(resumen_delitos, aes(x = Delito, y = Provincia, fill = Frecuencia)) +
  geom_tile() +
  scale_fill_viridis_c() +  # Escala de colores
  labs(x = "Delito", y = "Provincia", title = "Mapa de Calor de Frecuencia de Delitos por Provincia") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))

# Convertir el gráfico a un gráfico interactivo
grafico_mapa_calor_interactivo <- ggplotly(grafico_mapa_calor)
grafico_mapa_calor_interactivo


# Crear el grafico de barras de Edad vs Género
grafico_edad_vs_genero <- ggplot(datos, aes(x = Genero, fill = Edad)) +
  geom_bar(position = "dodge") +
  labs(x = "Género", y = "Cantidad de victimas", title = "Cantidad de victimas por Género y Edad") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  
grafico_edad_vs_genero

#Crear el grafico interactivo
grafico_edad_genero_interactivo <- ggplotly(grafico_edad_vs_genero)
grafico_edad_genero_interactivo


# Crear de frecuencia de delitos por hora
grafico_delito_hora_histograma <- ggplot(datos, aes(x = as.factor(Hora))) +
  geom_bar(fill = "skyblue", color = "black", stat = "count") +
  labs(x = "Hora", y = "Frecuencia", title = "Frecuencia de Delitos por Hora") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

# Convertir el gráfico a un gráfico interactivo
grafico_delito_hora_histograma_interactivo <- ggplotly(grafico_delito_hora_histograma)
grafico_delito_hora_histograma_interactivo



#----------------------------------------------------------------------------------
# Crear el gráfico de dispersión multidimensional
datos_filtrados <- datos[datos$Provincia != "DESCONOCIDO", ]

# Crear el gráfico de dispersión multidimensional
grafico_multidimensional <- ggplot(datos_filtrados, aes(x = Hora, y = Delito, color = Provincia, shape = Genero, size = Edad)) +
  geom_point(alpha = 0.7) +
  labs(x = "Hora", y = "Delito", title = "Gráfico Multidimensional") +
  scale_shape_manual(values = c(1, 2, 3)) +  # Definir formas para género (1:círculo, 2:triángulo, 3:cruz)
  scale_color_manual(values = c("#F8766D", "#00BFC4", "#C77CFF", "#7CAE00", "#FF61C3", "#B2D611", "#BEBADA")) +  # Definir colores para provincias
  theme_minimal()

# Convertir el gráfico a un gráfico interactivo
grafico_multidimensional_interactivo <- ggplotly(grafico_multidimensional)
grafico_multidimensional_interactivo


#-----------------------------------------------------------------------------------
# Crear el gráfico de facetas de tres o más variables
grafico_facetas <- ggplot(datos_filtrados, aes(x = Delito, fill = Edad)) +
  geom_bar(position = "dodge") +
  labs(x = "Delito", y = "Cantidad de victimas", title = "Cantidad de victimas por Delito y Edad desglosado por Género y Provincia") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
grafico_facetas + facet_wrap(Provincia ~ Genero)

# Crear el grafico interactivo
grafico_facetas_interactivo <- ggplotly(grafico_facetas)
grafico_facetas_interactivo