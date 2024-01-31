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
