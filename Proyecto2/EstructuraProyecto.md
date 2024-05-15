pasos para el proyecto 


1. determinar los datos, hacer un manejo de datos, en este caso los csv a json
ademas de tener el json pasarlo a un formato donde solo se tengan los datos y el numero, en este caso ignorar id y poblaciones de anos anteriores 

2. determinar la profundidad del arbol 
para la determinacion de la lectura de los datos deben de venir en un formato especifico:
-data name, data value, data name, data value

especificamente el ultimo atributo DEBE de tener el data value, los otros se pueden ignorar, pero pueden influir para el peso de cada rama, para este ejemplo solo se veran con data value al final. 

el peso de los nodos se realizara mediante la lectura de datos que sean nodos identificados como data value

3. armado del arbol

una vez armado determinado la profundidad se debera de hacer un bosquejo de arbol, se recomeinda hacer una impresion del mismo 

4. tamanos y pesos del arbol 

una vez amarmado el peso del arbol se procederan a sumar las cantidades del data value del ultimo nodo, esto para determinar los tamanos que se deberan de ofrecer a cada uno. 

se debera tener en cuenta que se trabaja con circulos en todo momento por lo que se debera de dividir el area del circulo en los n nodos a participar y seguidamente se debe de asignar un porcentaje de area por cada nodo

5. comenzar la visualizacion 

se hara una visualizacion por capas? 

primeramente se haran los nodos mas pequenos hasta los mas grandes, se debe de tener en cuenta que se recomienda un color para cada uno de los nodos de un mismo tipo teniendo en cuenta las jerarquias





posibles mejoras:

1. hacerlo interactivo 

2. hacerlo con otras figuras?

