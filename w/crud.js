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
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
 import { app } from "./firebase.js ";
const db=getFirestore(app);
const coleccion=collection(db,"alumnos");

let editStatus = false;
let id = "";

const onGetAlumnos = (callback) => onSnapshot(coleccion, callback);


window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetAlumnos((querySnapshot)=>{
        const divAlumnos=document.querySelector("#lista");
        divAlumnos.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const alumno = doc.data();
            divAlumnos.innerHTML += `
                <tr class="table-dark">
                    <td class="table-dark">${alumno.nocontrol}</td>
                    <td class="table-dark">${alumno.nombre}</td>
                    <td class="table-dark">${alumno.apaterno}</td>
                    <td class="table-dark">${alumno.amaterno}</td>
                    <td class="table-dark">${alumno.carrera}</td>
                    <td class="table-dark">${alumno.edad}</td>
                    <td class="table-dark"><button class="btn btn-danger btnEliminarAlumno" data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td class="table-dark"><button class="btn btn-primary btnEditarAlumno"  data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-warning btnQRAlumnos" data-bs-toggle="modal" data-bs-target="#qrModal"   data-id="${doc.id}"><i class="bi bi-qr-code"></i></button></td>
                    </tr>`;
        });
        const btnQRAlumno = document.querySelectorAll(".btnQRAlumnos");
        btnQRAlumno.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "alumnos", id));
                    const alumno = data.data();                   
                            const contenedorQR =document.getElementById('divqr');
                            contenedorQR.innerHTML=""
                            const QR = new QRCode (contenedorQR);
                            QR.makeCode(id);
                            
                        } catch(error){
                            console.log(error);
                        }
                    });
                });
const btnsDelete = document.querySelectorAll(".btnEliminarAlumno");
        //console.log(btnsDelete);
        btnsDelete.forEach((btn,idx) =>
            btn.addEventListener("click", () => {
                id=btn.dataset.id;
                console.log(btn.dataset.id);
                Swal.fire({
                    title: 'Est??s seguro de eliminar es Alumno?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                }).then(async(result) => {
                    try {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, "alumnos", id));
                            Swal.fire("REGISTRO ELIMINADO!!!");
                        }                         
                    } catch (error) {
                        Swal.fire("ERROR AL ELIMINAR REGISTRO");
                    }
                })       
            })
        );

        const btnsEdit = document.querySelectorAll(".btnEditarAlumno");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "alumnos", id));
                    const alumno = data.data();
                    document.querySelector("#enocontrol").value=alumno.nocontrol;
                    document.querySelector("#enombre").value=alumno.nombre;
                    document.querySelector("#eapaterno").value=alumno.apaterno;
                    document.querySelector("#eamaterno").value=alumno.amaterno;
                    document.querySelector("#ecarrera").value=alumno.carrera;
                     document.querySelector("#eedad").value=alumno.edad;
                    editStatus = true;
                    id = data.id;
                } catch (error) {
                    console.log(error);
                }
            });
        });

    });
    
});

const btnAgregarAlumno=document.querySelector("#btnAgregarAlumno");
btnAgregarAlumno.addEventListener("click",()=>{
    const nocontrol=document.querySelector("#nocontrol").value;
    const nombre=document.querySelector("#nombre").value;
    const apaterno=document.querySelector("#apaterno").value;
    const amaterno=document.querySelector("#amaterno").value;
    const carrera=document.querySelector("#carrera").value;
  const edad=document.querySelector("#edad").value;

    if(nocontrol=="" || nombre=="" || apaterno=="" || amaterno=="" || carrera=="" || edad==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const alumno={ nocontrol, nombre, apaterno,amaterno,carrera,edad};

    if (!editStatus) {
        addDoc(coleccion, alumno);        
        bootstrap.Modal.getInstance(document.getElementById('Pablo')).hide();
    } 

    Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formAddAlumno").reset();
});


const btnGuardarAlumno=document.querySelector("#btnGuardarAlumno");
btnGuardarAlumno.addEventListener("click",()=>{
    const nocontrol=document.querySelector("#enocontrol").value;
    const nombre=document.querySelector("#enombre").value;
    const apaterno=document.querySelector("#eapaterno").value;
    const amaterno=document.querySelector("#eamaterno").value;
      const carrera=document.querySelector("#ecarrera").value;
        const edad=document.querySelector("#eedad").value;
  
    if(nocontrol=="" || nombre=="" || apaterno=="" || amaterno=="" || carrera=="" || edad==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const alumno={ nocontrol, nombre, apaterno,amaterno,carrera,edad};

    if (editStatus) {
        updateDoc(doc(db, "alumnos", id), alumno);
        editStatus = false;
        id = "";
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formEditAlumno").reset();
});





