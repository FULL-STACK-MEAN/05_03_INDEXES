// Indices geoespaciales en MongoDB
// db.<coleccion>.createIndex({<campo-coordenadas>: "2dsphere"})

use newyork

db.restaurants.createIndex({"address.coord": "2dsphere"})

// Consulta de proximidad $near

db.restaurants.find({
    "address.coord": {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-73.9667, 40.78]
            },
            $minDistance: 0,
            $maxDistance: 500
        }
    }
})

// Consulta acotada

// $geoWithin

db.restaurants.find({
    "address.coord": {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-73.9667, 40.78],
                        [-74.9667, 40.78],
                        [-74.9667, 41.78],
                        [-73.9667, 41.78],
                        [-73.9667, 40.78],
                    ]
                ]
            }
        }
    }
})