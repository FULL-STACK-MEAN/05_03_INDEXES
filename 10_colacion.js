// Índices y colación
// La colación en una colección se puede indicar a tres niveles:
// - Colección createCollection()
// - Índice
// - Operación de consulta .collation({<opciones>})

db.runners.dropIndexes()

// La colación se puede establecer a nivel de índice

db.runners.createIndex({surname1: 1}, {collation: {locale: 'es', strength: 1}})

db.runners.find({surname1: "Lopez"}) // no usa el índice

// Cuando tengamos un índice con colación, para que el índice sea utilizado la operación
// tiene que tener la colación detallada con los mismos valores

db.runners.find({surname1: "Lopez"}).collation({locale: 'es', strength: 1})

db.runners.find({surname1: "Lopez"}).collation({locale: 'en', strength: 1}) // como 
// no tiene los mismos valores de colación que el índice, no lo usará

// Cuando la colección si tiene colación (porque la detallamos al momento de crearla):
// - Si en la consulta no se especifica la colación usará el índice
// - Si en la consulta se especifica colación y es diferente a la de la colección no
//   se usará el índice

db.createCollection('employers', {collation: {locale: 'es', strength: 1}})

db.employers.insert({name: 'Juan', surname: 'Pérez'})

db.employers.createIndex({surname: 1})

db.employers.find({surname: 'Perez'}) // Aunque no se indique la colación se usa el índice
// porque la colación esta establecida a nivel de colección

db.employers.find({surname: 'Perez'} ,{collation: {locale: 'en', strength: 1}}) // e Aunque la
// colección tiene una colación, al especificar una colación diferent no usará el índice