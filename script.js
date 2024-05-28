class Producto{
    constructor(nombre, precio, img , id){
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.id = id;
    this.cantidad = 1;
}
}

class Cliente{
    constructor(nombreCliente, apellidoCliente, tarjetaCliente){
        this.nombreCliente = nombreCliente,
        this.apellidoCliente = apellidoCliente,
        this.tarjetaCliente = tarjetaCliente
    }
}

const cliente =  []; 

fetch("json/productos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        arrayProductos = datos

        datos.forEach( Producto => {
            let div = document.createElement(`div`)
            div.classList.add("card", "m-2");
            div.innerHTML +=  `<div class="card" style="width: 18rem; ">
            <img src="${Producto.img}" class="card-img-top " alt="...">
            <div class="card-body">
            <h5 class="card-title">${Producto.nombre}</h5>
            <p class = "card-text">precio $${Producto.precio}</p>
            <a button id = "boton${Producto.id}" class="btn btn-success">agregar al carrito</button></a>
            </div>`
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
agregarAlCarrito(Producto.id)
})
})
})