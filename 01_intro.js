// Introducción a los índices en MongoDB
// Índices a nivel de colección

// Crear createIndex()
// db.<coleccion>.createIndex({<campo>: 1 | -1, ...}, <doc-opciones>)

use gimnasio

db.clientes.createIndex({apellidos: 1}) // Índice simple

// Visualizar índices de una colección
// db.<coleccion>.getIndexes()

db.clientes.getIndexes() // devuelve un array con la info de cada índice
[
    {
            "v" : 2,
            "key" : {
                    "_id" : 1 // Por defecto MongoDB crea un índice en el campo _id (de tipo único)
            },
            "name" : "_id_"
    },
    {
            "v" : 2,
            "key" : {
                    "apellidos" : 1 // la clave indica el o los campos  del índice y su sentido
            },
            "name" : "apellidos_1" // namespace del índice
    }
]

// Borrar un índice dropIndex()
// db.<coleccion>.dropIndex(<namespace>)

db.clientes.dropIndex("apellidos_1")
{ "nIndexesWas" : 2, "ok" : 1 }

// Borrar todos los índices dropIndexes()
// db.<coleccion>.dropIndexes()

db.clientes.dropIndexes()

// Borra todos los índices excepto el de _id