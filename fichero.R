#proyecto 1 visualizacion de informacion 
#estudiantes
# -Cabrera Tabash Samir, 2022161229
# -Calvo Amador Gabriel Arturo, 2022055870 

#importacion de librerias 
library(ggplot2)
library(plotly)
library(highcharter)
library(htmlwidgets)
library(dplyr)
library(treemapify)
library(readxl)

################################################################################################################
#importacion de datos
datos <- read_excel("C:\\Users\\samir\\Visualizacion\\estadisticas_policiales_2024.xls.html")
datos_filtrados <- datos[datos$Provincia != "DESCONOCIDO", ]


################################################################################################################
#graficos unidimensionales
# Crear el gráfico de barras de frecuencia de tipos de delito 
grafico_delito <- ggplot(datos_filtrados, aes(x = Delito, fill = Delito)) +
  geom_bar() +
  labs(x = "Tipo de Delito", y = "Frecuencia", title = "Frecuencia de Tipos de Delito") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
grafico_delito_interactivo <- ggplotly(grafico_delito)
grafico_delito_interactivo


library(dplyr)
library(ggplot2)
library(plotly)

# Contar los valores únicos de la variable Victima
conteo_victimas <- datos_filtrados %>%
  count(Victima) %>%
  arrange(desc(n))

# Crear el gráfico de mosaico
grafico_mosaico <- ggplot(datos_filtrados, aes(weight = ..count.., fill = Victima)) +
  geom_bar(aes(x = "", y = ..count..), stat = "count") +
  coord_flip() +
  labs(x = NULL, y = NULL, fill = "Victima", title = "Cantidad de Delitos por Tipo de Victima") +
  theme_minimal() +
  theme(legend.position = "right")

# Convertir el gráfico a interactivo con plotly
grafico_mosaico_interactivo <- ggplotly(grafico_mosaico)

# Mostrar el gráfico interactivo
grafico_mosaico_interactivo





# Crear el gráfico de barras de cantidad de victimas por genero
grafico_genero <- ggplot(datos, aes(x = Genero, fill = Genero)) +
  geom_bar() +
  labs(x = "Género", y = "Cantidad de victimas", title = "Cantidad de victimas por Género")
grafico_genero_interactivo <- ggplotly(grafico_genero)
grafico_genero_interactivo


# Crear el gráfico de barras apiladas
resumen_edad <- datos_filtrados %>%
  group_by(Edad) %>%
  summarize(Cantidad = n())
grafico_edad_apilado <- ggplot(resumen_edad, aes(x = "", y = Cantidad, fill = Edad)) +
  geom_bar(stat = "identity") +
  labs(x = "", y = "Cantidad de víctimas", fill = "Edad", title = "Cantidad de víctimas por edad") +
  theme_minimal() +
  theme(legend.position = "right")
# Convertir el gráfico a interactivo con plotly
grafico_edad_interactivo_apilado <- ggplotly(grafico_edad_apilado)
# Mostrar el gráfico interactivo
grafico_edad_interactivo_apilado



################################################################################################################
#graficos bidimensionales
# Crear el gráfico de barras de frecuencia de delito vs provincia
grafico_delito_provincia <- ggplot(datos_filtrados, aes(x = Provincia, fill = Delito)) +
  geom_bar(position = "dodge") +
  labs(x = "Provincia", y = "Frecuencia", title = "Frecuencia de Delito por Provincia") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  
grafico_delito_provincia_interactivo <- ggplotly(grafico_delito_provincia)
grafico_delito_provincia_interactivo


# Crear de frecuencia de delitos por hora
# Crear de frecuencia de delitos por hora
grafico_delito_hora_histograma <- ggplot(datos, aes(x = as.factor(Hora))) +
  geom_bar(fill = "skyblue", color = "black", stat = "count") +
  labs(x = "Hora", y = "Frecuencia", title = "Frecuencia de Delitos por Hora") +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
grafico_delito_hora_histograma_interactivo <- ggplotly(grafico_delito_hora_histograma)
grafico_delito_hora_histograma_interactivo



################################################################################################################
#grafico multidimensional
# Seleccionar las columnas necesarias
dataAct <- datos_filtrados %>% dplyr::select(Hora, Provincia, Delito, Victima,Edad)

# Crear el gráfico de sankey
grafico_sankey <- hchart(data_to_sankey(dataAct), "sankey", name = "prueba")

# Agregar título y subtítulo
grafico_sankey <- grafico_sankey %>%
  hc_title(text = "Representacion de delitos primer bimestre 2024") %>%
  hc_subtitle(text = "La primera columna hace referencia a la hora del asalto, la segunda a la provincia donde se realizo, la tercera el tipo 
              de delito, la cuarta la victima afectada y por ultimo la quinta la edad de la persona afectada")

# Mostrar el gráfico
grafico_sankey



################################################################################################################

# Crear el gráfico de facetas 
grafico_facetas_otra <- ggplot(datos_filtrados, aes(x = Delito, fill = Edad)) +
  geom_bar(position = "dodge") +
  labs(x = "Delito", y = "Cantidad de víctimas", title = "Cantidad de víctimas por Delito y Edad desglosado por Género y Hora") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1)) +
  facet_wrap(~ Genero + Hora)

# Convertir el gráfico a interactivo con plotly
grafico_facetas_interactivo_otra <- ggplotly(grafico_facetas_otra)

# Mostrar el gráfico interactivo
print(grafico_facetas_interactivo_otra)






