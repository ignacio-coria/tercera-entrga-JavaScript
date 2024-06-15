class Producto {
    constructor(nombre, precio, img, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.id = id;
        this.cantidad = 1;
    }
}

class Cliente {
    constructor(nombreCliente, apellidoCliente, tarjetaCliente) {
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        this.tarjetaCliente = tarjetaCliente;
    }
}

const cliente = [];

const carroDeCompra = localStorage.getItem("carroDeCompras") ? JSON.parse(localStorage.getItem("carroDeCompras")) : [];
const productosComics = document.getElementById("productosComics");
let arrayProductos;

fetch("json/productos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        arrayProductos = datos;

        const contenedorTarjetas = document.createElement("div");
        contenedorTarjetas.classList.add("d-flex", "flex-wrap", "justify-content-center");

        datos.forEach(Producto => {
            let div = document.createElement(`div`);
            div.classList.add("card", "m-2");
            div.innerHTML += `<div class="card" style="width: 18rem; ">
                <img src="${Producto.img}" class="card-img-top" alt="${Producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${Producto.nombre}</h5>
                    <p class="card-text">Precio: $${Producto.precio}</p>
                    <a button id="boton${Producto.id}" class="btn btn-success">Agregar al carrito</button></a>
                </div>`;
            productosComics.appendChild(div);

            const boton = document.getElementById(`boton${Producto.id}`);
            boton.addEventListener("click", () => {
                Toastify({
                    text: `${Producto.nombre} se agrego al carrito`,
                    duration:3000,
                    style:{
                            background: "linear-gradient(to right , #2ECC71, #14B2A6",
                }
            }).showToast()
                agregarAlCarrito(Producto.id);
            });
        });
    });

const agregarAlCarrito = (id) => {
    const producto = arrayProductos.find(Producto => Producto.id === id);
    const productoEnCarrito = carroDeCompra.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carroDeCompra.push(producto);
    }
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompra));
}

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", actualizarCarrito);

function actualizarCarrito() {
    let aux = "";
    const productosCarrito = JSON.parse(localStorage.getItem("carroDeCompras"));
    productosCarrito.forEach(Producto => {
        aux += `
            <div class="card col-xl-3 col-md-6 col-sm-12 container d-flex flex-wrap justify-content-center">
                <img src="${Producto.img}" class="d-block mx-auto card-img-top img-fluid py-3" alt="${Producto.nombre}">
                <div class="card-body">
                    <h3 class="card-title">${Producto.nombre}</h3>
                    <p class="card-text">Precio: $${Producto.precio}</p>
                    <p class="card-text">Cantidad: ${Producto.cantidad}</p>
                    <p class="card-text">Total: $${Producto.precio * Producto.cantidad}</p>
                    <button onClick="eliminarDelCarrito(${Producto.id})" class="btn btn-success">Eliminar del Carrito</button>
                </div>
            </div>`;
    });
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompra));
    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
}

const eliminarDelCarrito = (id) => {
    const producto = carroDeCompra.find(Producto => Producto.id === id);
    carroDeCompra.splice(carroDeCompra.indexOf(producto), 1);
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompra));
    actualizarCarrito();
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    carroDeCompra.splice(0, carroDeCompra.length);
    localStorage.setItem("carroDeCompras", JSON.stringify(carroDeCompra));
    actualizarCarrito();
});

const totalCompra = document.getElementById("totalCompra");

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    finalizarCompra();
})

function finalizarCompra() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const tarjeta = document.getElementById("tarjeta").value;
    const nuevaCompra = new Cliente(nombre, apellido, tarjeta);
    cliente.push(nuevaCompra);
    localStorage.setItem("cliente", JSON.stringify(cliente));
    formulario.reset();
}

const contenedorCliente = document.getElementById("contenedorClientes");
const verDatorProporcionados = document.getElementById("verDatorProporcionados");

verDatorProporcionados.addEventListener("click", () => {
    mostrarCliente();
});

function mostrarCliente() {
    contenedorCliente.innerHTML = "";
    const totalCompra = calcularTotalCompra();
    const clienteGuardado = JSON.parse(localStorage.getItem("cliente"));
    const productosCarrito = JSON.parse(localStorage.getItem("carroDeCompras")); // Obtener productos del carrito

    clienteGuardado.forEach(Cliente => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div>
                <p>Nombre del Cliente: ${Cliente.nombreCliente}</p>
                <p>Apellido del Cliente: ${Cliente.apellidoCliente}</p>
                <p>Número de Tarjeta: ${Cliente.tarjetaCliente}</p>
                <p>Total de la compra: $${totalCompra}</p>
                <div id="productosSeleccionados"></div>
            </div>
        `;
        contenedorCliente.appendChild(div);

        const productosSeleccionados = div.querySelector("#productosSeleccionados");
        productosCarrito.forEach(Producto => {
            const productoDiv = document.createElement("div");
            productoDiv.innerHTML = `
                <img src="${Producto.img}" class="d-block mx-auto card-img-top img-fluid py-3" alt="${Producto.nombre}">
                <p>${Producto.nombre}</p>
                <p>Precio: $${Producto.precio}</p>
                <p>Cantidad: ${Producto.cantidad}</p>
                <p>Total: $${Producto.precio * Producto.cantidad}</p>
            `;
            productosSeleccionados.appendChild(productoDiv);
        });
    });
}

function calcularTotalCompra() {
    let total = 0;
    carroDeCompra.forEach(Producto => {
        total += Producto.precio * Producto.cantidad;
    });
    return total;
}
