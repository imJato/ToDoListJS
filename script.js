let listaTareas = [];

const botonEditarModal = document.createElement("button");
botonEditarModal.id = "botonEditarModal";
botonEditarModal.className = "btn btn-primary";
botonEditarModal.textContent = "Acutalizar";
botonEditarModal.setAttribute("data-bs-dismiss", "modal");

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
    botonEditar.id = "botonEditar";
    imagenEditar = document.createElement("img");
    imagenEditar.src = "Resources/editButton.png";
    imagenEditar.alt = "Editar";
    botonEditar.appendChild(imagenEditar);
    botonEditar.setAttribute("data-bs-toggle", "modal");
    botonEditar.setAttribute("data-bs-target", "#exampleModal");
    botonEditar.addEventListener("click", function () {
      abrirModalEditar(params.id);
    });
    td.appendChild(botonEditar);

    // boton eliminar
    botonEliminar = document.createElement("button");
    botonEliminar.className = "btn";
    botonEliminar.addEventListener("click", function () {
      eliminarTarea(params.id);
    });
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
    id: Number.parseInt(Math.random() * 100),
    nombre: nombre,
    fecha: fecha,
    dificultad: dificultad,
  };
  listaTareas.push(tarea);
  console.log(listaTareas);
  limpiar();
  listar(listaTareas);
}

function eliminarTarea(id) {
  listaTareas = listaTareas.filter((x) => x.id != id);
  listar(listaTareas);
  console.log("Hello" + id);
}

function abrirModalEditar(id) {
  const txtNombre = document.getElementById("txtNombre");
  const txtFecha = document.getElementById("txtFecha");
  const nivel = document.getElementById("selectDificultades");
  const button = document.getElementById("botonGuardar");
  const footer = document.getElementById("footer-modal");
  button.hidden = true;
  botonEditarModal.hidden = false;
  const tarea = listaTareas.find((x) => x.id == id);
  txtNombre.value = tarea.nombre;
  txtFecha.value = tarea.fecha;
  for (let index = 0; index < nivel.options.length; index++) {
    if (nivel.options[index].text === tarea.dificultad)
      nivel.selectedIndex = index;
  }

  botonEditarModal.addEventListener("click", function () {
    actualizarTarea(id);
  });
  footer.appendChild(botonEditarModal);
  
}

function actualizarTarea(id) {
  const txtNombre = document.getElementById("txtNombre");
  const txtFecha = document.getElementById("txtFecha");
  const nivel = document.getElementById("selectDificultades");
  
  const index = listaTareas.findIndex((x) => (x.id == id));
  listaTareas[index].id = id;
  listaTareas[index].nombre = txtNombre.value;
  listaTareas[index].fecha = txtFecha.value;
  listaTareas[index].dificultad = nivel.value;
  limpiar();
  listar(listaTareas);
  botonEditarModal.hidden = true;
  botonEditarModal.removeEventListener('click', actualizarTarea(id), false)
}

function limpiar() {
  const txtNombre = document.getElementById("txtNombre");
  const txtFecha = document.getElementById("txtFecha");
  const nivel = document.getElementById("selectDificultades");
  const button = document.getElementById("botonGuardar");
  button.hidden = false;

  txtNombre.value = "";
  txtFecha.value = "";
  nivel.selectedIndex = nivel.options[0];
}
