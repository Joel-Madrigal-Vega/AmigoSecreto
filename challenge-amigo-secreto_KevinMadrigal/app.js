let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        actualizarLista();
        input.value = "";
    }
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Tienen que existir 2 o más participantes.");
        return;
    }

    let asignaciones = {};
    let amigosDisponibles = [...amigos];

    amigos.forEach(amigo => {
        let opciones = amigosDisponibles.filter(a => a !== amigo);
        
        if (opciones.length === 0) {
            alert("No se completo el sorteo. Inténte de nuevo.");
            return;
        }

        let seleccionado = opciones[Math.floor(Math.random() * opciones.length)];
        asignaciones[amigo] = seleccionado;
        amigosDisponibles = amigosDisponibles.filter(a => a !== seleccionado);
    });

    mostrarResultado(asignaciones);
}

function mostrarResultado(asignaciones) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    for (const [amigo, asignado] of Object.entries(asignaciones)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        resultado.appendChild(li);
    }
}

function reiniciarSorteo() {
    amigos = [];

    // Limpiar la lista en pantalla
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    // Habilitar el input y el botón de añadir amigos
    document.getElementById("amigo").value = "";
    document.getElementById("amigo").removeAttribute("disabled");

    alert("El sorteo ha sido reiniciado. Puedes ingresar nuevos amigos.");
}
