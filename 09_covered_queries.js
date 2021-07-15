// Consultas totalmente cubiertas

// Las consultas mas eficientes que se pueden llegar a hacer porque solo se necesita
// acceder al índice

// - Todos los campos de la consulta forman parte de un mismo índice
// - Todos los campos devueltos en la consulta están en ese mismo índice

db.runners.createIndex({surname1: 1, age: -1})

// Ej de cosulta covered query

db.runners.find({surname1: 'Nadal', age: {$gte: 18}}, {surname1: 1, age: 1, _id: 0})