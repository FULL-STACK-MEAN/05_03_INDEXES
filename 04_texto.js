// Índices de texto (busquedas muy eficientes de palabras en grandes volúmenes de texto)

// sintaxis
// db.<coleccion>.createIndex({<campo>: "text"})
// para ser utilizado la consulta debe emplear los operadores $text y $search

use biblioteca

db.libros.createIndex({autor: "text"})

db.libros.find({$text: {$search: "Ende"}}) // no se indica el campo porque solo puede haber un
// índice de texto en la misma colección

// Como solo puede haber un índice de texto por colección si que podemos crear
// un índice múltiple de texto

db.libros.dropIndexes()

db.libros.createIndex({autor: "text", titulo: "text"}) // Buscará palabras en los campos autor
// y titulo

db.libros.find({$text: {$search: "Ende"}}) 

db.libros.insert({titulo: "Biografía de Michael Ende", autor: 'John Doe'})

// Si necesitamos que busque palabras en todos los campos
// Wildcard text index

db.libros.dropIndexes()

db.libros.createIndex({"$**": "text"})

// Funcionalidad adicional de los índices de texto