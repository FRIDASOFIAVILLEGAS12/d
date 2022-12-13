import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  
  import {app} from './firebase.js ';
  const db=getFirestore(app);
  const coleccion=collection(db,"alumnos");
  
  
  
  
  const onScanSuccess = async (qrCodeMessage) => {
  const data = await getDoc(doc(db, "alumnos", qrCodeMessage));
  const alumno = data.data();
  document.querySelector("#result").innerHTML = `
    <p>Codigo: ${alumno.nocontrol}</p>
    <p>Nombre: ${alumno.nombre}  </p>
    <p>Autor: ${alumno.apaterno}</p>
    <p>Descripcion: ${alumno.amaterno}</p>
    <p>Editorial: ${alumno.carrera}</p> 
    <p>Edicion: ${alumno.edad}</p>
    `;
  scan.clear();
  document.querySelector("#reader").remove();
  }
  const onScanError = (errorMessage) => {
  //swal.fire('Error al escanear El QR')
  }
  var scan = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });
  scan.render(onScanSuccess, onScanError);