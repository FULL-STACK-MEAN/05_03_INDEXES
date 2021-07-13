// Índices multikey (tienen un campo que almacena valores de tipo array)
// Sintaxis idem a simple o multiple porque lo que determina si el índice es multikey es
// si uno de los valores registrados es un array

use tienda

db.articulos.insert({
    nombre: 'Sudadera FTR34',
    marca: 'Nike',
    stock: [
        {color:'azul', talla: 's', cantidad: 2},
        {color:'azul', talla: 'l', cantidad: 12},
    ],
    categorias: ['mujer','ropa']
})

// 1.- Podemos tener varias índices simples que sean multikey

db.articulos.createIndex({stock: 1})


db.articulos.createIndex({categorias: 1})


// Los índices multikey en el caso de ser múltiples solo uno de sus campos puede tener arrays

db.articulos.createIndex({categorias: 1, stock: 1})

{
    "ok" : 0,
    "errmsg" : "Index build failed: 9d1c2c7f-285e-4e73-9730-787aa4cf33af: Collection tienda.articulos ( fa6c84ef-02ef-4dd3-bfde-6663d4c06838 ) :: caused by :: cannot index parallel arrays [stock] [categorias]",
    "code" : 171,
    "codeName" : "CannotIndexParallelArrays"
}

// Como MongoDB es schemaless si creamos un índice múltiple que es multikey, dara error en las operaciones
// de escritura si insertamos un valor de array en el campo que no es array

db.articulos.createIndex({marca: 1, categorias: 1})
{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 3,
    "numIndexesAfter" : 4,
    "ok" : 1
}

db.articulos.insert({
    nombre: 'Zapatillas tal',
    marca: 'Nike',
    stock: [
        {color:'azul', talla: '40', cantidad: 2},
        {color:'azul', talla: '4l', cantidad: 12},
    ],
    categorias: ['hombre','calzado']
})
WriteResult({ "nInserted" : 1 })

db.articulos.insert({
    nombre: 'Zapatillas lorem...',
    marca: ['nike','importación'],
    stock: [
        {color:'azul', talla: '40', cantidad: 22},
        {color:'azul', talla: '4l', cantidad: 12},
    ],
    categorias: ['hombre','calzado']
})

WriteResult({
    "nInserted" : 0,
    "writeError" : {
            "code" : 171,
            "errmsg" : "cannot index parallel arrays [categorias] [marca]"
    }
})