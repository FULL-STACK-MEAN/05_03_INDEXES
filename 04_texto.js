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

use biblioteca

db.libros.insert([
    {titulo: 'París era una Fiesta', autor: 'Ernest Hemingway'},
    {titulo: 'París, La Guía Completa', autor: 'vv.aa.'},
    {titulo: 'Silicon Valley, la era de internet', autor: 'John Doe'},
])

db.libros.dropIndexes()
db.libros.createIndex({titulo: "text"})

// Búsqueda de una palabra

db.libros.find({$text: {$search: "paRis"}}) // por defecto es insensible a mayus/minys y diacríticos
db.libros.find({$text: {$search: "Pa"}}) // No encuentra fragmentos de palabras
db.libros.find({$text: {$search: /Pa/}}) // Solo permite el tipo string en las consultas
Error: error: {
    "ok" : 0,
    "errmsg" : "\"$search\" had the wrong type. Expected string, found regex",
    "code" : 14,
    "codeName" : "TypeMismatch"
}

// Búsqueda de varias palabras OR inclusivo
db.libros.find({$text: {$search: "paris era"}}) // Criterio inclusivo
db.libros.find({$text: {$search: "era paris"}}) // no influye el orden

// Busqueda de varias palabras AND

db.libros.find({$text: {$search: "\"paris\" \"era\""}})

// Búsqueda de frases exacta
db.libros.find({$text: {$search: "\"paris era\""}})

// Búsqueda con exclusión de algunas palabras (se les pone prefijo -)
db.libros.find({$text: {$search: "Paris -guia"}})

// Stop words (omiten artículos, conjunciones, etc...)

db.libros.insert({titulo: "The Second World War", autor: "John Doe"})

db.libros.find({$text: {$search: "The"}}) // Devuelve vacío

// A los efectos de estas stop words se puede añadir operador de lenguaje

db.libros.find({$text: {$search: "La", $language: 'es'}}) // En este caso también devuelve vacío

// Stemmed words (buscar raices de palabras)

db.libros.insert([
    {titulo: 'Agile Consultants', autor: 'vv.aa.'},
    {titulo: 'Consulting for Global Markets', autor: 'vv.aa.'},
])

db.libros.find({$text: {$search: "consult"}})

db.libros.insert([
    {titulo: 'Economía de Guerra', autor: 'vv.aa.'},
    {titulo: 'Economice su Hogar', autor: 'vv.aa.'},
])

db.libros.find({$text: {$search: "econom", $language: "es"}})

// Sensibles a mayus/minus
db.libros.find({$text: {$search: "paris", $caseSensitive: true}})

// Sensible a diacríticos
db.libros.find({$text: {$search: "Paris", $diacriticSensitive: true}})

// Text score (utilizar operador $meta)

db.libros.insert([
    {titulo: 'París', autor: 'vv.aa.'},
    {titulo: 'París siempre será París', autor: 'vv.aa.'},
])

db.libros.find({$text: {$search: "paris"}}).sort({titulo: 1})

db.libros.find({$text: {$search: "paris"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})