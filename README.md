# Proyecto-E3-codigo
Codigo para la fisicalizacion y visualizacion Entrega 3


Instrucciones de ejecucion:

1. Los archivos interactive.js y main.js deben ser cargados a Protobject Code.
2. Una vez cargados los archivos se debe conectar el interactive.js a un celular, para realizar uso de la camara, en este caso tambien es necesario realizar uso de codigos *ArUco originales del 1 al 18*, donde estos representan los paises (Aqui un link donde se pueden generar https://fodi.github.io/arucosheetgen/, o aqui https://chev.me/arucogen/)

**Deben ser marcadores ArUco Originales**

3. *Luego de haber conectado el interactive.js a un celular, se debe conectar el main.js a una computadora*, luego se debe inicializar el main.js y se desplegara una pestaña en Protobject Code, ahora solo basta con colocar uno de los codigos ArUco frente a la camara del celular, para que se active la visualizacion con sonificacion de los paises.
4.  En caso de que la camara no se conecte, se debe realizar un ajuste a la linea de codigo 130 del interactive.js que tiene 'Aruco.start(30, 2);', en este caso se debe reemplazar el "2", con 1 o 0, pues el ID camara no siempre es el mismo para todos los telefonos.

