function cargarCabañasYControlarCambio() {
    // Obtener el combo de cabañas
    const comboCabañas = document.getElementById('idCabaña');

    // Realizar una solicitud para cargar las cabañas desde 'http://www.reservas.somee.com/api/Cabañas/Lista'
    fetch('http://www.reservas.somee.com/api/Cabañas/Lista')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.response)) {
                // Limpiar el combo de cabañas
                comboCabañas.innerHTML = '';

                // Iterar a través de las cabañas y agregar opciones al combo
                data.response.forEach(cabaña => {
                    const option = document.createElement('option');
                    option.value = cabaña.idCabaña;
                    option.textContent = cabaña.nombre;
                    comboCabañas.appendChild(option);
                });

                // Agregar un evento de cambio al combo para controlar el precio
                comboCabañas.addEventListener('change', obtenerPrecioCabaña);
            } else {
                console.error('La respuesta de la API no contiene una matriz válida de cabañas.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al cargar las cabañas:', error);
        });
}


function obtenerPrecioCabaña() {
  
  // Obtener el combo de cabañas y el ID de la cabaña seleccionada
  const comboCabañas = document.getElementById('idCabaña');
  const idCabaña = comboCabañas.value;
  
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






























