// registrar 



//variables globales

let inputUsuario = document.querySelector("#user");
let inputNombre = document.querySelector("#name");
let inputRol = document.querySelector("#rol");
let inputContra = document.querySelector("#password");
let btnRegistrar = document.querySelector(".btn-guardar");

//login
let usuario = document.querySelector("#user");
let Contra = document.querySelector("#password");
let btnLogin = document.querySelector(".btn-iniciar");

//validar que existan los botones
if(btnRegistrar != null){
    btnRegistrar.addEventListener("click", function(){
        let datosUsuario = obtenerDatosRegistro();
        enviarRegistro(datosUsuario);
     
     })

}else if (btnLogin != null){
    btnLogin.addEventListener("click", function(){
        let usuario = obtenerCredenciales()
        enviarLogin(usuario)
    })
}




//obtener datos del formulario
function obtenerDatosRegistro(){
    let datosRegistro;
    if(inputUsuario.value == "" || inputNombre.value == "" || inputContra.value == "" || inputRol.value == ""){
        alert("Todos los campos son obligatorios")
    }else{
         datosRegistro = {
            user: inputUsuario.value,
            name: inputNombre.value,
            rol: inputRol.value,
            password: inputContra.value
        }

        console.log(datosRegistro)

        inputUsuario.value = ""
        inputNombre.value = ""
        inputContra.value = ""
        inputRol.value = ""

    }

    return datosRegistro;
}

//funcion para enviar datos de registro del usuario

async function enviarRegistro(usuario){
    let url = "http://localhost:3005/register";
    try{
        let respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify( usuario )
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

//obtener datos del logi
function obtenerCredenciales(){
    let datosLogin ;
    if (usuario.value == "" || Contra.value == ""){
        alert("Todos los campos son obligatorios")
    }else{
        datosLogin = {
            user: usuario.value,
            password: Contra.value
        }
        console.log(datosLogin)
        usuario.value = ""
        Contra.value = ""
    }
    return datosLogin;
}

//enviar credenciales

async function enviarLogin(datos){
    let url = "http://localhost:3005/login";
    try{
        let respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify( datos )
        });
        if(!respuesta.ok){
            throw new Error("no se pudo enviar los datos")
        }
        //recibir respuesta del servidor
        let usuarioRegistrado = await respuesta.json();
        console.log(usuarioRegistrado);
        alert("bienvenido")
        //validar usuario regitrado
        if(usuarioRegistrado.rol === "mesero" && usuarioRegistrado.password === datos.password){
            alert("bienvenido")
            location.href = "mesero.html"
        }else if(usuarioRegistrado.rol === "cajero" && usuarioRegistrado.password === datos.password){
            alert("bienvenido")
            location.href = "cajero.html"
        }else if (usuarioRegistrado.rol === "chef" && usuarioRegistrado.password === datos.password){
            alert("bienvenido")
            location.href = "chef.html"
        }else{
            alert(usuarioRegistrado.mensaje)
        }
        
    }catch(error){
        console.log("Error" + error);
    }
    
}