
function abrirModal(json) {

    console.log("llega al modal")
      
    cargarCabañasYControlarCambio();
    obtenerFechasOcupadas();

       $("#txtnombre").val("");
       $("#txtapellido").val("");
       $("#txtmail").val("");
       $("#txttelefono").val("");
       $("#cbocabaña").val("");
       $("#desde").val("");
       $("#hasta").val("");
       $("#mensajeError").hide();
       $("#txtprecio").val("");

       if (json != null) {
          
           $("#txtnombre").val(json.nombre);
           $("#txtapellido").val(json.apellido);
           $("#txtmail").val(json.mail);
           $("#txttelefono").val(json.telefono);
           $("#cbocabaña").val(json.nombre);
           $("#idCabaña").val(json.idCabaña);
           $("#desde").val(json.desde);
           $("#hasta").val(json.hasta);
           $("#txtprecio").val("");

       }
       
       
       $("#FormModal").modal("show");
   }
  
  
  































