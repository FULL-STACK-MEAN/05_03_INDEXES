// MongoDB para las consultas ordenadas puede usar eficientemente el
// orden de los índices para no utilizar la memoria a la hora de ordenar
// los registros recuperados

// Para evitar el uso de ordenación en memoria, el sentido de ordenación de los campos
// debe ser igual o de sentido inverso que el orden de los índices

// Con índices simples este efecto no influye 

db.runners.createIndex({dni: 1})

db.runners.find({}).sort({dni: 1})
db.runners.find({}).sort({dni: -1}) // tampoco tiene que ordenar en memoria


// Con índices compuestos para que no sea necesario ordenar en memoria, el sentido y orden
// de los campos de la consulta deberá ser igual que en el índice o, si son distintos, todos
// tienen que ser el inverso del del índice

db.runners.createIndex({surname1: 1, age: -1})

db.runners.find({surname1: 'Nadal'}).sort({surname1: 1, age: -1}) // Ok no ordena en memoria
db.runners.find({surname1: 'Nadal'}).sort({surname1: -1, age: 1}) // Ok no ordena en memoria

db.runners.find({surname1: 'Nadal'}).sort({surname1: 1, age: 1}) // Warning ordena en memoria