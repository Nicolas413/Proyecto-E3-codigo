# Proyecto-E3-codigo
Codigo para la fisicalizacion


Instrucciones de ejecucion:

1. Los archivos interactive.js y main.js deben ser cargados a Protobject Code.
2. Una vez cargados los archivos se debe conectar el interactive.js a un celular, para realizar uso de la camara, en este caso tambien es necesario realizar uso de codigos ArUco del 1 al 18, donde estos representan los paises
3. Luego de haber conectado el interactive.js se debe conectar el main.js, con ello se inicializa el main y se desplegara una pestaña en Protobject Code, basta con analizar de a un codigo para observar los paises y la sonificacion
4. En caso de que la camara no se conecte, se debe realizar un ajuste a la linea de codigo 130 que tiene 'Aruco.start(30, 2);', en este caso se debe reemplazar el "2", con 1 o 0, pues el ID camara no siempre es el mismo para todos los telefonos.

