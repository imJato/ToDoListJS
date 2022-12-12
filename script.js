let listaTareas = [];

{
    // data-bs-toggle="modal" data-bs-target="#exampleModal"
}
function listar(lista) {
  const tabla = document.getElementById("tbodyTabla");
  tabla.innerHTML = "";
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let botonEditar = document.createElement("button");
  let botonEliminar = document.createElement("button");
  let imagenEditar = document.createElement("img");
  let imagenEliminar = document.createElement("img");

  lista.forEach((params) => {
    tr = document.createElement("tr");
    Object.values(params).forEach((element) => {
      td = document.createElement("td"); // Creando una nueva columna
      td.innerText = element; // Asignandole el valor del parametro
      tr.appendChild(td); //añadiendo la columna a la fila
    });

    // boton Editar

    td = document.createElement("td");
    botonEditar = document.createElement("button");
    botonEditar.className = "btn";
    botonEditar.id = "botonEditar"
    imagenEditar = document.createElement("img");
    imagenEditar.src = "Resources/editButton.png";
    imagenEditar.alt = "Editar";
    botonEditar.appendChild(imagenEditar);
    botonEditar.setAttribute("data-bs-toggle", "modal");
    botonEditar.setAttribute("data-bs-target","#exampleModal");
    // botonEditar.addEventListener("click",abrirModalEditar(params.id));
    td.appendChild(botonEditar);

    // boton eliminar
    botonEliminar = document.createElement('button');
    botonEliminar.className = "btn";
    botonEliminar.addEventListener("click",function(){eliminarTarea(params.id)});
    imagenEliminar = document.createElement("img");
    imagenEliminar.src = "Resources/deleteButton.png";
    imagenEliminar.alt = "Eliminar";
    botonEliminar.appendChild(imagenEliminar);
    td.appendChild(botonEliminar);

    //agregando botones    
    tr.appendChild(td);
    tabla.appendChild(tr);
  });
}

function agregarTarea() {
  const nombre = document.getElementById("txtNombre").value;
  const fecha = document.getElementById("txtFecha").value;
  const dificultad = document.getElementById("selectDificultades").value;
  const tarea = {
    id: Math.random(),
    nombre: nombre,
    fecha: fecha,
    dificultad: dificultad,
  };
  listaTareas.push(tarea);
  console.log(listaTareas);
  limpiar();
  listar(listaTareas);
}

function eliminarTarea(param) {
    listaTareas = listaTareas.filter(x => x.id != param);
    listar(listaTareas);
    console.log("Hello" + param);
}

// function abrirModalEditar(id) {
//     const txtNombre = document.getElementById("txtNombre");
//     const txtFecha = document.getElementById("txtFecha");
//     const nivel = document.getElementById("selectDificultades");
//     const button = document.getElementById("botonGuardar");
//     button.textContent = "Actualizar"

//     const tarea = listaTareas.filter(x => x.id == id);
//     txtNombre.value = tarea.nombre;
//     txtFecha.value = tarea.fecha;
//     // nivel.selectedIndex = nivel.options.filter(x => x.text == tarea.dificultad);

//     button.addEventListener("click",function(){actualizarTarea(tarea.id)});

// }


// function actualizarTarea(params){
//     const newTask = {
//         id: params,
//         nombre: txtNombre.value,
//         fecha: txtFecha.value,
//         dificultad: dificultad.options[dificultad.selectedIndex].text

//     };

//     const index = listaTareas.findIndex(x => x.id = params);
//     listaTareas = listaTareas.splice(3, index, newTask);
//     limpiar();
//     listar(listaTareas);
// }

function limpiar(){
    const txtNombre = document.getElementById("txtNombre");
    const txtFecha = document.getElementById("txtFecha");
    const nivel = document.getElementById("selectDificultades");
    txtNombre.value= "";
    txtFecha.value= "";
    nivel.selectedIndex = nivel.options[1];
}