import { app } from "./firebase.js ";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signInWithPhoneNumber,
    signInWithPopup,
    signInAnonymously,
    signOut,
    RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

let user = null;

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const container = document.querySelector("#container");
  checarEstado(user);
  
  if (user) {
    container.innerHTML = `
    
    <h1>Bienvenido ${user.email}</h1>
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Pablo">
      <i class="bi bi-person-fill-add m-2"></i> Agregar Libro
      </button>
    <br><br>

      <table class="table table-dark">
<tr class="table-dark">
<td class="table-dark">Codigo</td>
<td class="table-dark">Nombre</td>
<td class="table-dark">Autor</td>
<td class="table-dark">Descripcion</td>
<td class="table-dark">Editorial</td>
<td class="table-dark">Edicion</td>
<td class="table-dark">eliminar</td>
<td class="table-dark">editar</td>
<td class="table-dark">Codigo QR</td>

</tr>
</table>

 


<table class="table table-dark" id="lista">
    
  </table>
        
    `;
    const uid = user.uid;
  } else {
    container.innerHTML = `<h1>No Hay Usuario</h1>`;
  }
});

const provier = new GoogleAuthProvider();
const btnCrear = document.querySelector("#btnCrear");
const btnGoogle = document.querySelector("#btnGoogle");
const btnIniciar = document.querySelector("#btnIniciar");
const btnCerrar = document.querySelector("#btnCerrar");




btnIniciar.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#iniciarEmail");
  const password = document.querySelector("#iniciarPassword");
  console.log(email.value, password.value);
});

btnGoogle.addEventListener("click", async (e) => {
  e.preventDefault();
  const provier = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provier);
    user = credentials.user;
    const modalInstance = bootstrap.Modal.getInstance(
      btnGoogle.closest(".modal")
    );
    modalInstance.hide();
    checarEstado(user);
  } catch (error) {
    console.log(error);
  }
});
const btnAnonimo=document.querySelector("#btinco");
btnAnonimo.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    const result= await signInAnonymously(auth);
    console.log(result);
    user=result.user;
    bootstrap.Modal.getInstance(document.getElementById('iniciarModal')).hide();
  }catch(error){
    Swal.fire('Error Al iniciar secion de anonimo')
  }

});
const btnFon=document.querySelector("#telefono");
btnFon.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    const {value:tel}=await Swal.fire({
      title: 'Coloque su num de telefono',
      input: 'tel',
      inputLabel: 'Phone',
      inputValue: '+52',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'confirm',
      showCancelButton: true,
    })
    window.recaptchaVerifier=new RecaptchaVerifier('recaptcha', {'size':'invisible'}, auth);
    const appVerifier=window.recaptchaVerifier;
    const confirmationResult=await signInWithPhoneNumber(auth, tel, appVerifier)
    console.log(confirmationResult);
    window.confirmationResult=confirmationResult;
    const {value:code}=await Swal.fire({
      title: 'Coloca tu codigo',
      input: 'text',
      inputLabel: 'Code',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Verify',
      showCancelButton: true,
    })

    const result=await window.confirmationResult.confirm(code)
    user=result.user;
    checarEstado(user)

  }catch(error){
    Swal.fire('Error al iniciar con num de telefono');
  }
  });

const checarEstado = (user = null) => {
  console.log(user);
  if ((user == null)) {
    document.querySelector("#iniciar").style.display = "block";
    document.querySelector("#crear").style.display = "block";
    document.querySelector("#btnCerrar").style.display ="none";
  } else {
    document.querySelector("#iniciar").style.display = "none";
    document.querySelector("#crear").style.display = "none";
    document.querySelector("#btnCerrar").style.display ="block";
  }
};

btnCerrar.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    checarEstado();
  } catch (error) {
    console.log(error);
  }
});

btnIniciar.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#iniciarEmail");
  const password = document.querySelector("#iniciarPassword");
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    user = res.user;
    Swal.fire("Bienvenido!!");
    var myModalEl = document.getElementById("iniciarModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    Swal.fire("Usuario y/o Contraseña Incorrecta!");
  }
});

btnCrear.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#crearEmail");
  const password = document.querySelector("#crearPassword");
  //console.log(email.value, password.value);
  var myModalEl = document.getElementById("crearModal");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  try {
    const respuesta = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(respuesta.user);
    Swal.fire({
      icon: "success",
      title: "Correcto",
      text: "Registro Terminado",
    });
    email.value = "";
    password.value = "";
    modal.hide();
  } catch (error) {
    console.log(error.code);
    const code = error.code;
    if (code == "auth/invalid-email") {
      Swal.fire({
        icon: "error",
        text: "Email Invalido!",
      });
    }
    if (code == "auth/weak-password") {
      Swal.fire({
        icon: "error",
        text: "Password Invalida",
      });
    }
    if (code == "auth/email-already-in-user") {
      Swal.fire({
        icon: "error",
        text: "Email Ya Esta Registrado",
      });
    }
  }
});

checarEstado();
