// Índices simples

db.clientes.createIndex({apellidos: 1})

db.clientes.createIndex({"dirección.localidad": 1}) // Se pueden realizar sobre campos de subdocumentos

// Índices compuestos (más de un campo)
// La sintaxis no cambia

db.clientes.createIndex({apellidos: -1, nombre: 1}) 
// Influyen tanto el orden de los campos (prefijo) porque implica el uso o no del índice para
// determinadas consultas como el sentido de cada campo porque implica que en las consultas
// ordenadas el orden se extraiga del índice o necesite un paso adicional de ordenación en memoria