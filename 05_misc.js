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

// Índices únicos
// db.<coleccion>.createIndex({<campo>: 1 | -1, ...}, {unique: true})

use clinica

db.pacientes.createIndex({dni: 1}, {unique: true})
db.pacientes.createIndex({nie: 1}, {unique: true}) // Se pueden crear varios índices únicos

db.pacientes.insert({nombre: 'Juan', dni: '4050030P'})
db.pacientes.insert({nombre: 'Sara', dni: '4050030P'})
WriteResult({
    "nInserted" : 0,
    "writeError" : {
            "code" : 11000,
            "errmsg" : "E11000 duplicate key error collection: clinica.pacientes index: dni_1 dup key: { dni: \"4050030P\" }"
    }
})

// Si una colección ya tiene valores duplicados en el mismo campo y sobre este se intenta
// crear un índice único el sistema devuelve error

db.clientes.dropIndexes()

db.pacientes.insert({nombre: 'Juan', dni: '4050030P'})
db.pacientes.insert({nombre: 'Sara', dni: '4050030P'})
db.pacientes.createIndex({dni: 1}, {unique: true}) // Error porque hay valores duplicados en dni
{
    "ok" : 0,
    "errmsg" : "Index build failed: 2047e035-95bf-4675-9d1b-e032acb7e409: Collection clinica.pacientes ( aa8d42c2-3771-4399-871c-77f3485879b8 ) :: caused by :: E11000 duplicate key error collection: clinica.pacientes index: dni_1 dup key: { dni: \"4050030P\" }",
    "code" : 11000,
    "codeName" : "DuplicateKey",
    "keyPattern" : {
            "dni" : 1
    },
    "keyValue" : {
            "dni" : "4050030P"
    }
}

// Se pueden usar índices múltiples que sean únicos

use shop

db.articulos.createIndex({marca: 1, nombre: 1}, {unique: true})

db.articulos.insert({marca: "Nike", nombre: "Sudadera básica"})
db.articulos.insert({marca: "Adidas", nombre: "Sudadera básica"})

db.articulos.insert({marca: "Nike", nombre: "Sudadera básica"})
WriteResult({
    "nInserted" : 0,
    "writeError" : {
            "code" : 11000,
            "errmsg" : "E11000 duplicate key error collection: shop.articulos index: marca_1_nombre_1 dup key: { marca: \"Nike\", nombre: \"Sudadera b├ísica\" }"
    }
})

// Índices únicos y campos inexistentes
// Si tenemos un índice único en un campo, solo podremos tener un
// documento que no contenga ese campo (Mongo le asigna el valor null en el índice)

use clinica

db.empleados.createIndex({nss: 1}, {unique: true})

db.empleados.insert({nombre: 'Juan', nss: '6868768768'})
db.empleados.insert({nombre: 'Sara', nss: '6876863232'})
db.empleados.insert({nombre: 'Laura'})

db.empleados.insert({nombre: 'Luis'})
WriteResult({
    "nInserted" : 0,
    "writeError" : {
            "code" : 11000,
            "errmsg" : "E11000 duplicate key error collection: clinica.empleados index: nss_1 dup key: { nss: null }"
    }
})