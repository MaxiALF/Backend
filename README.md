# Desafío:  Clases con ECMAScript y ECMAScript avanzado

Se entregan dos archivos JavaScript:

 Uno llamado "productManager" que gestiona un conjunto de productos con sus respectivas propiedades ( id, titulo, foto, precio y stock ).

 Otro archivo llamado "userManager" que gestiona un conjunto de usuarios, también con sus respectivas propiedades ( id, nombre, foto e email ).

En ambos archivos el "id" se agrega automaticamente y se autoincrementa. Además cuentan con los métodos:

- "create(data)" (para agregar un producto/usuario),
- "read()" (para retornar todos los productos/usuarios),
- "readOne(id)" (que retorna el objeto de producto/usuario que se desea buscar).

Por último, se toma captura de pantalla de los métodos en ambos archivos para corroborar su correcto funcionamiento en la consola de VSC.

# 2º Desafío: Manejo de archivos

Se entregan dos archivos "JS"(JavaScript) y una carpeta "DATA" en donde se guaran archivos "JSON" (Java Script Objet Notation) para los productos y usuarios :

 Uno llamado "productManager" que gestiona un conjunto de productos con "FS" (FileSystem) y sus respectivas propiedades ( id, titulo, foto, precio y stock ).

 Otro archivo llamado "userManager" que gestiona un conjunto de usuarios, también con FileSystem y sus respectivas propiedades ( id, nombre, foto e email ).

En ambos archivos el "id" se genera automaticamente y se autoincrementa. Además cuentan con los métodos:

- "create(data)" (para agregar un producto/usuario),
- "read()" (para retornar todos los productos/usuarios),
- "readOne(id)" (que retorna el objeto de producto/usuario que se desea buscar).

Por último, se toma captura de pantalla de los métodos en ambos archivos para corroborar su correcto funcionamiento en la consola de VSC.

# 3°Desafío:  Servidor de express

Se entrega dentro de una carpeta "data", las carpetas "memory", "fs" , los archivos "server.js", "package.json" y las dependencias de "nodemon" y "express".

En la carpeta "memory" se encuentran los dos archivos JS de las clases del desafío n°1, mientras que en la carpeta "fs" se encuentran los archivos JS del desafío n°2 con la carpeta "files" que contiene los archivos "json" de cada clase y se modifica la generación del "id" con crypto. Luego en ambas carpetas se agrega para cada archivo el metodo "destroy(id)" para eliminar un objeto de la lista de productos y de usuarios.

En el archivo "server.js" se desarrolla y estructura un servidor basado en express para hacer consultas a los archivos product.fs.js y users.fs.js de la carpeta "fs" mediante el endpoint "GET" utilizando los metodos "read()" y readOne(id), los cuales envían respuesta en caso de ser afirmativas o negativas.

# 1º Pre entrega

Se desarrola  un servidor de express en el puerto 8080 incorporando los 5 middlewares requeridos (json, urlencoded, morgan, error y path).

Se crea el manager de ordenes con sus respectivas propiedades/metodos (en memory y fileSystem) y se agrega el metodo "update(id, data)" a los managers de products y users (también en memory y fileSystem). Luego se enrutan dichos managers con los endpoints requeridos como se solicita.

Se estructura servidor según lo requerido por la imagen de la consigna.

Por último se toman algunas capturas de pantalla para verificar el funcionamiento del servidor en postman.

# 4º Desafío: Websockets + Handlebars

Se estructura un servidor en el puerto 8080.

Se desarrollan con handlebars las vistas:

- "/real": Para mostrar la página con todos los productos en tiempo real.
- "/form": Para mostrar la vista de un formulario y crear un producto en tiempo real.
- "/register": Para mostrar la vista  de un formulario para registrar un usuario.

Se utilizan los Sockets:

- "connection": Para configurar los dos puntos de conección del back y del front.
- "emit(products)": El cúal llama al manager de productos de FS y envía un objeto con todos los productos hacía el socket del cliente.
- "on(products)": El cúal renderiza con js, en tiempo real, la vista "/real" de handlebars,los productos recibidos.
- "emit(new product)": El cúal captura con js los datos del formulario y luego se emite el producto y se guarda en el archivo del back.
- "on(new product)": El cúal guarda el producto en el archivo del servidor y luego se emiten todos los productos actualizados en tiempo real en la vista "/real".

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# Desafío Complementario:

Se desarrolla un puerto con Express en el puerto "8080".

Se enrrutan los managers de Mongo de products, users y orders.

Se mantiene el "CRUD" tanto en "FS" como en "Memory" y se crea el manager de Mongo para los productos, ususarios y ordenes.

Se crean los metodos "readByEmail" (para traer un usuario mediante el email) y el metodo "read(obj)" (que recibe las propiedades opcionales: "filter" y "sort").

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# 2º Pre entrega

Se mantiene la estructura de carpetas y archivos.

Se agrega a mongo los metodos "read( { filter y sortAndPaginate } )" y "report( uid )":

filter : para filtrar por consultas.

sortAndPaginate : para ordenar y paginar mediante consultas ( por defecto: "limit": 10 y "page": 1 ).

report(uid) : para calcular el total a pagar por un usuario según su orden de compra.

Se agrega el endpoint " GET /api/orders/total/:uid " para implementar el metodo "report( uid )" de mongo.

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# 6° Desafío: Implementación de sesiones

Se mantiene la estructura de carpetas y archivos.

En handlebars:

Se modifica las vista de "/form" por "/products/form", con el maquetado de un formulario para la creación de un producto.

También se modifica la vista "/register" por "/auth/register" con el maquetado de un formulario para la creación de un usuario.

Se agrega la vista "/auth/login" con el maquetado de un formulario para el inicio de sesión de un usuario.

Luego se crea la carpeta "sessions.router.api.js" con los endpoints:

POST /api/session/register para crear un usuario en mongoDB.

POST /api/session/login para iniciar la sesión de un usuario en Mongo.

POST /api/session/signout para cerrar la sesión de un usuario en Mongo.

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# 7º Desafío: Refactoreo

Se mantiene la estructura de carpetas y archivos.

En handlebars:

En la página de inicio se mantiene la estructura y se agregan botones para la paginación de los productos. Tambíen se agrega un filtro de busqueda para encontrar por nombre o letra uno o varios productos.

Se agrega la vista "orders"  para mostrar las ordenes del usuario logueado.

En "register" y "login" se agrega un botón de registro o de inicio de sesión mediante Google.

Se modificó el formulario de creación de un producto para que "fecheé" correctamente a la base de datos de mongo.

Endpionts:

POST /api/session/register : crea un usuario en mongo con la estrategia de passport.

POST /api/session/login : inicia la sesión de un usuario en Mongo con estrategia de passport.

POST /api/session/signout : cierra la sesión de un usuario en Mongo verificando el token de "JWT".

POST /api/session/google : obtiene las credenciales de google.

GET /api/session/googl/callback : obtine la callback de la estrategía de google.

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# 2º Desafío complementario

Se mantiene la estructura de carpetas.

Se crea un "CustomRouter" para los enrutadores:

- De las vistas.
- De los enpoints.
- De los recursos.
- De la apilcación.

Tambíen  se implementa para  cada una de ellas, las respuestas y politicas dependiendo del usuario logueado y de la respuesta de cada recurso.

Luego se utiliza "passport" y "JWT(JSON Web Token)" para el registro, el inicio de sesión , la autenticación y la autorización de un usuario.

Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.

# 9º Desafío Reestructura de nuestro servidor

Se añade, a la estructura actúal, las carpeta "controllers", que se encargará de manejar la logica del endpoint, y la carpeta "services", que servirá de intermediario entre el controlador y la persistencia, para luego estructurar el servidor por capas.

Se desarrola la página de inicio en una aplicación de React JS y se hostea la misma en Vercel.

LINK Vercel: https://mpp-app.vercel.app/

Luego se define, para el entorno, las variables de "producción", "desarrollo" y "prueba".

 Por último, se realizan algunas pruebas y se toma captura de pantalla para verificar el funcionamiento.
