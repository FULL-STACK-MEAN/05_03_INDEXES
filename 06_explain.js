// Planes de consulta
// La forma en la que MongoDB usa o no los índices

// Plan Caché
// Registro de las estadísticas de los diferentes índices que se pueden usar para una consulta (forma de
// de la consulta)

// Forma de la consulta
// Los campos que intervienen en la consulta, el orden que tienen y si la consulta es ordenado o no

// Método explain() devolver la información que utiliza en el instante de la consulta el algoritmo
// que completa los datos de la plan caché
// db.<coleccion>.find(<forma-consulta>).explain(<modo verbosidad>)

// Verbosidad
// queryPlanner por defecto Devuelve un doc con la información del plan-etapas ganador 
// executionStats Devuelve un doc similar al anterior pero ejecuta la consulta y añade las estadísticas
// allPlansExecution Devuelve un doc similar al anterio pero añade los planes no ejecutados

// Set datos maraton ver maraton.js

// Creamos índice simple en el campo dni

db.runners.createIndex({dni: 1})

db.runners.find({dni: "79506367A"}).explain('allPlansExecution')

// Uso de varios índices simples

db.runners.createIndex({surname1: 1})

db.runners.createIndex({age: 1})

db.runners.find({surname1: "Etxevarría", age: {$gte: 18}}).explain('allPlansExecution')

// Puede hacer intersección de índices

db.runners.find({
    $or: [
        {surname1: "Etxevarría", age: {$gte: 18}},
        {age: 45}
    ]
})

// Uso de índices múltiples o compuestos

db.runners.dropIndexes()

db.runners.createIndex({age: 1, surname1: 1})

// Consultas con todos los campos del índice

db.runners.find({surname1: "Etxevarría", age: {$gte: 18}}).explain('allPlansExecution')

// Consultas con un solo campo del índice (Para que use el índice normalmente los campos que
// lleve la consulta deben ser prefijos del índice)

db.runners.find({age: {$gte: 50}}).explain('allPlansExecution') // Usa el índice

db.runners.find({surname1: 'Nadal'}).explain('allPlansExecution') // No lo usa porque surname1 no
// es prefijo de age_1_surname_1

// Prefijos para saber si se usará un índice ó no (B-TREE)

db.foo.createIndex({a: 1, b: 1, c: 1})

// Prefijos

{a: 'valor'}
{a: 'valor', b: 'valor'}
{a: 'valor', b: 'valor', c: 'valor'}
{a: 'valor', b: 'valor', c: 'valor', ...}

db.runners.dropIndexes()

db.runners.createIndex({age: 1, surname1: 1, dni: 1})

db.runners.find({surname1: 'Nadal', age: 20}).explain('allPlansExecution') // ok
db.runners.find({dni: '33251234P', surname1: 'Nadal', age: 20}).explain('allPlansExecution') // ok
db.runners.find({dni: '33251234P', age: {$gte: 50}}).explain('allPlansExecution') // ???
db.runners.find({name: 'Fernando', age: {$gte: 50}}).explain('allPlansExecution') // ok