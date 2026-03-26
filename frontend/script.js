// ==========================
// VARIABLES
// ==========================
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const categoria = document.getElementById("categoria");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const buscador = document.getElementById("buscador");

const carritoLista = document.getElementById("carritoLista");
const totalSpan = document.getElementById("total");
const btnPagar = document.getElementById("btnPagar");

// ==========================
// DATOS
// ==========================
let productos = [];
let carrito = [];

// ==========================
// AGREGAR PRODUCTO
// ==========================
btnAgregar.addEventListener("click", () => {

    if (nombre.value === "" || precio.value === "" || categoria.value === "") {
        alert("Completa todos los campos");
        return;
    }

    const producto = {
        id: Date.now(),
        nombre: nombre.value,
        precio: parseFloat(precio.value),
        categoria: categoria.value
    };

    productos.push(producto);

    mostrarProductos();

    nombre.value = "";
    precio.value = "";
    categoria.value = "";
});

// ==========================
// MOSTRAR PRODUCTOS
// ==========================
function mostrarProductos(filtro = "") {
    lista.innerHTML = "";

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach(p => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${p.nombre} - $${p.precio} (${p.categoria})
            <button onclick="eliminarProducto(${p.id})">❌</button>
            <button onclick="agregarAlCarrito(${p.id})">🛒</button>
        `;

        lista.appendChild(li);
    });
}

// ==========================
// ELIMINAR PRODUCTO
// ==========================
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    mostrarProductos(buscador.value);
}

// ==========================
// BUSCADOR
// ==========================
buscador.addEventListener("input", () => {
    mostrarProductos(buscador.value);
});

// ==========================
// CARRITO
// ==========================
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    mostrarCarrito();
}

function mostrarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach((p, index) => {
        total += p.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            ${p.nombre} - $${p.precio}
            <button onclick="eliminarDelCarrito(${index})">❌</button>
        `;

        carritoLista.appendChild(li);
    });

    totalSpan.textContent = total;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// ==========================
// PAGAR
// ==========================
btnPagar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    alert("Compra realizada con éxito 🛍️");
    carrito = [];
    mostrarCarrito();
});
