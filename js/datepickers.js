function obtenerFechasOcupadas() {
    const comboCabañas = document.getElementById('idCabaña');
    const idCabaña = comboCabañas.value;

    // Realizar una solicitud para obtener las fechas ocupadas
    const urlFechasOcupadas = `http://www.reservas.somee.com/api/Reserva/FechasOcupadas/${idCabaña}`;

    // Hacer la solicitud a la API
    fetch(urlFechasOcupadas)
    
        .then(response => response.json())
        .then(data => {
            
            if (Array.isArray(data.response)) {
                const fechasOcupadas = data.response.map(fecha => {
                    // Formatear la fecha en un formato personalizado, por ejemplo, "dd/mm/yyyy"
                    const date = new Date(fecha.desde);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return formattedDate;
                });
                console.log(fechasOcupadas);
                // Configurar el datepicker para deshabilitar las fechas ocupadas
                
                $('#desde').datepicker('setDatesDisabled', fechasOcupadas);
            } else {
                console.log(" o entra aqui?")
                console.error('No se pudieron obtener las fechas ocupadas de la cabaña.');
            }
        })
        .catch(error => {
            console.error('Hubo un error al procesar la solicitud:', error);
        });


// Configurar el datepicker inicial
$('#desde').datepicker({
    language: 'es',
    todayBtn: 'linked',
    clearBtn: true,
    format: 'dd/mm/yyyy',
    multidate: false,
    todayHighlight: true,
    startDate: new Date() // Solo fechas a partir de hoy
});
$('#hasta').datepicker({
    language: 'es',
    todayBtn: 'linked',
    clearBtn: true,
    format: 'dd/mm/yyyy',
    multidate: false,
    todayHighlight: true,
    startDate: new Date() // Solo fechas a partir de hoy
});



// Agregar un evento al ComboBox para actualizar las fechas ocupadas
document.getElementById('idCabaña').addEventListener('change', obtenerFechasOcupadas);
// Inicialmente, obtener las fechas ocupadas basadas en el valor predeterminado del ComboBox

}
