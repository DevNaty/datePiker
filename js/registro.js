const clientes = [];  // Variable global para almacenar los clientes
async function VerificarDatos() {
    
    const mail = $("#txtmail").val();
    const url = `http://www.reservas.somee.com/api/Clientes/ObtenerPorEmail/${mail}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log(response)
            try {
                const responseData = await response.json();  // Almacena los datos en una variable
                console.log(responseData);  // Muestra los datos en la consola

                // Asigna el objeto a la variable clientes
                clientes.length = 0;
                clientes.push(responseData);

                const clienteExistente = responseData.response;
                console.log(clienteExistente);
                //const clienteExistente = clientes.find(cliente => cliente.mail === mail);

                if (clienteExistente && clienteExistente.mail === mail) {

                    //probar extraer idcliente
                    const idCliente = clienteExistente.idCliente;
                    document.getElementById('idCliente').value = idCliente;
                    // El cliente existe y el correo electrónico coincide
                    GenerarReserva();
                } else {
                    console.error('Ocurrio un Error, vualva a intentar');
                }
            } catch (error) {
                console.error('Error al parsear la respuesta JSON:', error);
            }
        } else {
           
                CargarCliente();  // Llamar a CargarCliente() en caso de un error
                console.log("?")
        }
    } catch (error) {
        console.error('Hubo un error al procesar la solicitud:', error);
    }
}
async function CargarCliente() {
    console.log("llega??")
    const nombre = $("#txtnombre").val();
    const apellido = $("#txtapellido").val();
    const mail = $("#txtmail").val();
    const telefono = $("#txttelefono").val();

    const datos = {
        nombre,
        apellido,
        mail,
        telefono
    };

    const url = 'http://www.reservas.somee.com/api/Clientes/Guardar';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            GenerarReserva();
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Hubo un error al procesar la solicitud:', error);
    }
}
async function GenerarReserva() {
    const idCliente = $("#idCliente").val();
    const idCabaña = $("#idCabaña").val();
    const desde = $("#fecha_desde").val();
    const hasta = $("#fecha_hasta").val();
    const total = $("#txtprecio").val();
    
   

    const datos = {
        idCliente,
        idCabaña,
        desde,
        hasta,
        total,
      
    };

    const url = 'http://www.reservas.somee.com/api/Reserva/Guardar';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    try {
        const response = await fetch(url, options);
        console.log (response)
        if (response.ok) {
            console.log(datos)
        
            alert('La reserva se realizó con éxito.');
        } else {
            console.error('Error en la solicitud:', response.statusText);
            alert('Hubo un error al intentar hacer la reserva. Por favor, inténtelo de nuevo más tarde.');
        }
    } catch (error) {
        console.error('Hubo un error al procesar la solicitud:', error);
        alert('Hubo un error al intentar hacer la reserva. Por favor, inténtelo de nuevo más tarde.');
    }
}
