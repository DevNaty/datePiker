function obtenerPrecioCabaña() {
    // Obtener el combo de cabañas y el ID de la cabaña seleccionada
    const comboCabañas = document.getElementById('idCabaña');
    const idCabaña = comboCabañas.value;

    // Realizar una solicitud para obtener el precio desde 'http://www.reservas.somee.com/api/Cabañas/Obtener/${idCabaña}'
    fetch(`http://www.reservas.somee.com/api/Cabañas/Obtener/${idCabaña}`)
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'ok' && data.response) {
                const precio = data.response.precio;

                // Aquí puedes hacer lo que necesites con el precio, como mostrarlo en un campo de texto
                // Por ejemplo, si tienes un campo de texto con el ID 'txtprecio':
                document.getElementById('txtprecio').value = precio;
            } else {
                console.error('No se pudo obtener el precio de la cabaña.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al obtener el precio de la cabaña:', error);
        });
}






function obtenerPrecioCabaña() {
    console.log("llegamos?")
    // Obtener el combo de cabañas y el ID de la cabaña seleccionada
    const comboCabañas = document.getElementById('idCabaña');
    const idCabaña = comboCabañas.value;
    console.log(idCabaña)
    // Obtener los elementos de fecha 'desde' y 'hasta' y el campo de texto 'txtprecio'
    const fechaDesdeElement = document.getElementById('desde');
    const fechaHastaElement = document.getElementById('hasta');
    const precioElement = document.getElementById('txtprecio');
    const precioTotalElement = document.getElementById('txtPrecioTotal');
    console.log("aqui?")
  
  
    fetch(`http://www.reservas.somee.com/api/Cabañas/Obtener/${idCabaña}`)
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'ok' && data.response) {
                const precio = data.response.precio;
                precioElement.value = precio;
                console.log(precio)

  
                if (fechaDesdeElement instanceof HTMLInputElement && fechaHastaElement instanceof HTMLInputElement) {              
                  const fechaDesde = new Date(fechaDesdeElement.value);
                    const fechaHasta = new Date(fechaHastaElement.value);
                    console.log(fechaHastaElement.value)
                    console.log(fechaDesde)
  
                    if (!isNaN(fechaDesde) && !isNaN(fechaHasta)) {
                        const diferenciaMilisegundos = fechaHasta - fechaDesde;
                        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
                        const precioTotal = precio * diferenciaDias;
                        
  
                        if (!isNaN(precioTotal)) {
                            precioTotalElement.value = precioTotal.toFixed(2);
                        }
                    }
                }
            } else {
                console.error('No se pudo obtener el precio de la cabaña.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al obtener el precio de la cabaña:', error);
        });
  }
  










  //viene de cargarModal!!!


  
function obtenerPrecioCabaña() {
    console.log("llegamos?")
    // Obtener el combo de cabañas y el ID de la cabaña seleccionada
    const comboCabañas = document.getElementById('idCabaña');
    const idCabaña = comboCabañas.value;
    console.log(idCabaña)
    // Obtener los elementos de fecha 'desde' y 'hasta' y el campo de texto 'txtprecio'
    const fechaDesdeElement = document.getElementById('desde');
    const fechaHastaElement = document.getElementById('hasta');
    const precioElement = document.getElementById('txtprecio');
    const precioTotalElement = document.getElementById('txtPrecioTotal');
    console.log("aqui?")
  
  
    fetch(`http://www.reservas.somee.com/api/Cabañas/Obtener/${idCabaña}`)
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'ok' && data.response) {
                const precio = data.response.precio;
                precioElement.value = precio;
                console.log(precio)
  
                if (fechaDesdeElement instanceof HTMLInputElement && fechaHastaElement instanceof HTMLInputElement) {              
                  const fechaDesde = new Date(fechaDesdeElement.value);
                    const fechaHasta = new Date(fechaHastaElement.value);
                    console.log(fechaHastaElement.value)
                    console.log(fechaDesde)
  
                    if (!isNaN(fechaDesde) && !isNaN(fechaHasta)) {
                        const diferenciaMilisegundos = fechaHasta - fechaDesde;
                        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
                        const precioTotal = precio * diferenciaDias;
                        
  
                        if (!isNaN(precioTotal)) {
                            precioTotalElement.value = precioTotal.toFixed(2);
                        }
                    }
                }
            } else {
                console.error('No se pudo obtener el precio de la cabaña.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al obtener el precio de la cabaña:', error);
        });
  }