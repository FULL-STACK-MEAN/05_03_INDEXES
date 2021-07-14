// Wildcard index
// db.<coleccion>.createIndex({"<campo>.$**": 1})

use fabrica

db.productos.insert({
    nombre: 'Turbina F-40',
    caracteristicas: {
        tuercas: 'F-11',
        chapa: 'O-27'
    }
})

db.productos.createIndex({"caracteristicas.$**": 1})

// Si existieran nuevos documentos con más campos en ese subdocumento también se
// indexarán

db.productos.insert({
    nombre: 'Turbina F-40V',
    caracteristicas: {
        tuercas: 'F-11',
        chapa: 'O-27',
        colector: 'F-R-12'
    }
})

// Índices TTL Que eliminan los registros una vez que pasa una cierta
// cantidad de tiempo o después de una fecha determinada. Se usan exclusivamente
// para colecciones temporales o de logs temporales, etc

// db.<coleccion>.createIndex({<campo-de-fecha>: 1 | -1}, {expireAfterSeconds: <cantidad en segundos>})
// de manera que los registros son eliminados una vez que pase esa cantidad de tiempo.

use shop

db.logs.createIndex({startSession: 1}, {expireAfterSeconds: 60})

db.logs.insert({user: 'juan', startSession: new Date()})

// Otra opción documentos que se elimina en una determinada fecha

db.logs.createIndex({deleteAt: 1}, {expireAfterSeconds: 0})

db.logs.insert({user: 'juan', points: 3000, deleteAt: new Date(2021, 6, 14, 17, 32, 00)})

