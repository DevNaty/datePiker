//Codigo MODIFICADO CON ESPERANZA
function obtenerFechasOcupadas() {
    const comboCabañas = document.getElementById('idCabaña');
    const idCabaña = comboCabañas.value;

    // Realizar una solicitud para obtener las fechas ocupadas
    const urlFechasOcupadas = `http://www.reservas.somee.com/api/Reserva/FechasOcupadas/${idCabaña}`;

    // Hacer la solicitud a la API
    fetch(urlFechasOcupadas)
    
        .then(response => response.json())
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('La solicitud no fue exitosa.');
            }
        })
        .then(data => {
            if (Array.isArray(data.response)) {
                const fechasOcupadas = data.response.map(fecha => {
                    // Formatear la fecha en un formato personalizado, por ejemplo, "dd/mm/yyyy"
                    const dateDesde = new Date(fecha.desde);
                    const dateHasta = new Date(fecha.hasta);
                    const formattedDesde = `${dateDesde.getDate()}/${dateDesde.getMonth() + 1}/${dateDesde.getFullYear()}`;
                    const formattedHasta = `${dateHasta.getDate()}/${dateHasta.getMonth() + 1}/${dateHasta.getFullYear()}`;
                    return { desde: formattedDesde, hasta: formattedHasta };
                });

                // Crear un array de fechas ocupadas para 'desde' y 'hasta'
                const fechasOcupadasDesde = fechasOcupadas.map(fecha => fecha.desde);
                const fechasOcupadasHasta = fechasOcupadas.map(fecha => fecha.hasta);

                // Configurar el datepicker 'desde' y 'hasta' para deshabilitar el rango de fechas ocupadas
                $('#desde').datepicker('setDatesDisabled', fechasOcupadasDesde);
                $('#hasta').datepicker('setDatesDisabled', fechasOcupadasHasta);
            } else {
                console.error('No se pudieron obtener las fechas ocupadas de la cabaña.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al procesar la solicitud:', error);
        });
}
$('#desde').datepicker({
    language: 'es',
    todayBtn: 'linked',
    clearBtn: true,
    format: 'dd/mm/yyyy',
    multidate: false,
    todayHighlight: true,
    startDate: new Date(), // Solo fechas a partir de hoy
});

$('#hasta').datepicker({
    language: 'es',
    todayBtn: 'linked',
    clearBtn: true,
    format: 'dd/mm/yyyy',
    multidate: false,
    todayHighlight: true,
    startDate: new Date(), // Solo fechas a partir de hoy
});

// Agrega un evento change al elemento idCabaña
document.getElementById('idCabaña').addEventListener('change', function () {
    obtenerFechasOcupadas(); // Llama a la función para obtener fechas ocupadas cuando se cambia la cabaña
});
