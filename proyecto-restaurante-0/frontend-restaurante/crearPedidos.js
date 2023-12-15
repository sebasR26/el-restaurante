//variables globales

let platillo = document.querySelectorAll(".platillo");
let clientes = document.querySelectorAll(".cliente");
let precios = document.querySelectorAll(".precios");
let cantidades = document.querySelectorAll(".cantidad");
let fechas = document.querySelectorAll(".fechas");
let observaciones = document.querySelectorAll(".observaciones");
let btnPedidos = document.querySelectorAll(".btn-pedido");


//obtener datos de pedido

//agregar evento a los botones

btnPedidos.forEach((btn, i)=>{
    btn.addEventListener("click", function(){
        let datosPedido = obtenerDatosPedidos(i);
        enviarPedido(datosPedido);
    })
})


function obtenerDatosPedidos(pos){
    let datosPedido;
    if(platillo[pos].value == "" || clientes[pos].value == "" || cantidades[pos].value == "" || fechas[pos].value == "" || observaciones[pos].value == "" ){
        alert("Todos los campos son obligatorios")
    }else{
         datosPedido = {
            platillo: platillo[pos].value,
            precios: precios[pos].textContent,
            cantidades: cantidades[pos].value,
            observaciones: observaciones[pos].value,
            clientes: clientes[pos].value,
            fechas: fechas[pos].value
        }

        console.log(datosPedido)

        platillo[pos].value = "";
        precios[pos].value = "";
        cantidades[pos].value = "";
        observaciones[pos].value = "";
        clientes[pos].value = "";
        fechas[pos].value = "";

    }

    return datosPedido;
}

async function enviarPedido(pedido){
    let url = "http://localhost:3005/pedido";
    try{
        let respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify( pedido )
        });
        if(respuesta.ok){
            throw new Error("no se pudo enviar el registro");
    
        }
        //recibir respuesta del servidor
        let mensaje = await respuesta.text();
        console.log(mensaje);
        //mostrar mensaje al usuario
        alert(mensaje)
        location.href = "login.html"
    }catch(error){
        console.log("Error" + error);
    }
    
}