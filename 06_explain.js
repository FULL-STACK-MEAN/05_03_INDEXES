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

