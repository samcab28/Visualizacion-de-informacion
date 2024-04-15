#importacion de librerias 
library(ggplot2)
library(plotly)
library(highcharter)
library(htmlwidgets)
library(dplyr)

################################################################################################################
#importacion de datos
datos <- estadisticas_policiales_2024_xls
datos_filtrados <- datos[datos$Provincia != "DESCONOCIDO", ]


################################################################################################################
#graficos unidimensionales
# Crear el gráfico de barras de frecuencia de tipos de delito
grafico_delito <- ggplot(datos_filtrados, aes(x = Delito, fill = Delito)) +
  geom_bar() +
  labs(x = "Tipo de Delito", y = "Frecuencia", title = "Frecuencia de Tipos de Delito")
grafico_delito_interactivo <- ggplotly(grafico_delito)
grafico_delito_interactivo



# Crear el gráfico de barras de frecuencia de víctimas
grafico_victima <- ggplot(datos_filtrados, aes(x = Victima, fill = Victima)) +
  geom_bar() +
  labs(x = "Víctima", y = "Frecuencia", title = "Frecuencia de Delitos frente a Víctimas")
grafico_victima_interactivo <- ggplotly(grafico_victima)
grafico_victima_interactivo


#----------------------------------------------------------------------------------
#graficos multidimnesionales
# Crear el gráfico de barras de frecuencia de delito vs provincia
grafico_delito_provincia <- ggplot(datos_filtrados, aes(x = Provincia, fill = Delito)) +
  geom_bar(position = "dodge") +
  labs(x = "Provincia", y = "Frecuencia", title = "Frecuencia de Delito por Provincia") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  
grafico_delito_provincia_interactivo <- ggplotly(grafico_delito_provincia)
grafico_delito_provincia_interactivo


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















