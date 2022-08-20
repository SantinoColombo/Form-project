const btnEnviar = document.querySelector("#enviar");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const resetBtn  = document.querySelector("#resetBtn")
spinner = document.querySelector("#spinner")

const er =
  /^(([^<>()\[\]\\.,;:\ s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  resetBtn.addEventListener("click", resetearFormulario())

  // enviar email
  formulario.addEventListener("submit", enviarEmail)
}

function validarFormulario(e) {




  if (e.target.value.length > 0) {



    e.target.classList.add("border", "border-green-500");
    e.target.classList.remove("border-red-500");
  } else {
    e.target.classList.remove("border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }




  if (e.target.type === "email") {


    if (er.test(e.target.value)) {
      console.log("valido");
      const error = document.querySelector('p.error')
      if (error) {
        error.remove();
      }
    } else {

      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }


  }


  if (er.test(e.target.value) !== "" && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }

}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.innerHTML = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// enviar email
function enviarEmail(e) {
  e.preventDefault();
  spinner.style.display = "flex";


  // 3 seg ocultar spiner y mostrar msj
  setTimeout(() => {
    spinner.style.display = 'none'
    let parrafo = document.createElement("p");
    parrafo.textContent = 'El mensaje se envio'
    formulario.insertBefore(parrafo, spinner);
    parrafo.classList.add('text-center', "bg-green-500", "p-2", "my-10", "text-white", "uppercase")
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000)
  }, 2000)

  function resetearFormulario() {
    formulario.reset();
  }


}