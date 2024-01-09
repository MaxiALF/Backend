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
