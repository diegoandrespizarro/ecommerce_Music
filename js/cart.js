// RENDERIZAR LOS PRODUCTOS DE LA API EN EL CARRITO Y SI ESTA ESE PRODUCTO LO SUMO O LO AGREGO
const carritoProductos = document.getElementById('carritoProductos');
const totalCompra = document.getElementById('totalCompra');


document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('agregarAlCarrito')) {
        const productCard = event.target.closest('.card.mb-4.shadow-sm'); // Obtener el contenedor de la tarjeta de producto
        const product = event.target.closest('.card-body');
        const title = product.querySelector('.card-title').textContent;
        const descripcion = product.querySelector('.card-text').textContent;
        const precio = parseFloat(product.querySelector('.card-precio').textContent.replace('$', ''));
        const imageUrl = productCard.querySelector('.carrito-producto-imagen') ? productCard.querySelector('.carrito-producto-imagen').getAttribute('src') : '';
        console.log(imageUrl)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Su producto fue agregado al carrito",
            showConfirmButton: false,
            timer: 1500
          });
        // Verificar si el producto ya está en el carrito
        let productoEnCarrito = false;
        const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
        productosEnCarrito.forEach((producto) => {
            const tituloProductoCarrito = producto.querySelector('.carrito-producto-titulo small').textContent;
            if (tituloProductoCarrito === title) {
                let cantidad = producto.querySelector('.suma-resta-productos p');
                cantidad.textContent = parseInt(cantidad.textContent) + 1;
                productoEnCarrito = true;
            }
        });

        // Si no está en el carrito, agregarlo
        if (!productoEnCarrito) {
            const productCard = `
                <div class="carrito-producto">
                    <img class="card-img-top" src="${imageUrl}" alt="${title}">
                    <div class="carrito-producto-titulo">
                        <small>${title}</small>
                        <h3>${descripcion}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <div class="suma-resta-productos">
                            <i class="bi bi-dash-circle"></i><p>1</p><i class="bi bi-plus-circle"></i><i class="bi bi-trash3-fill"></i>
                        </div>
                    </div>
                    <div class="card-precio" style="display: none;">${precio}</div>
                </div>
            `;

            carritoProductos.innerHTML += productCard;
        }
    }
});



//BOTON DE VACIAR CARRITO
const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
    carritoProductos.innerHTML = '';
    guardarCarritoLocalStorage();
});

//BOTON DE ELIMINAR PRODUCTO DEL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-trash3-fill')) {
        event.target.parentElement.parentElement.parentElement.remove();
    }
    guardarCarritoLocalStorage();
});

//BOTON DE SUMAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-plus-circle')) {
        const cantidad = event.target.previousElementSibling;
        cantidad.textContent = parseInt(cantidad.textContent) + 1;
    }
    guardarCarritoLocalStorage();
});

//BOTON DE RESTAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-dash-circle')) {
        const cantidad = event.target.nextElementSibling;
        if (parseInt(cantidad.textContent) > 1) {
            cantidad.textContent = parseInt(cantidad.textContent) - 1;
        }
    }
    guardarCarritoLocalStorage();
});


//ALERTA PARA FINALIZAR LA COMPRA
const FinalizarCompra = document.getElementById("FinalizarCompra");

document.addEventListener('DOMContentLoaded', function () {
    FinalizarCompra.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        
        // Mostrar la alerta
         await Swal.fire({
             position: "top-center",
             icon: "success",
             title: "Su compra fue realizada",
             showConfirmButton: true,
             timer: 1500
         });
         carritoProductos.innerHTML = '';
        guardarCarritoLocalStorage();
        // Aquí puedes redirigir a otra página después de la alerta si es necesario
        window.location.href = '/index.html';
    });
    
});

//PERSISTENCIA DE DATOS EN EL CARRITO DE COMPRAS LOCALSTORAGE
const guardarCarritoLocalStorage = () => {
    const productos = [];
    const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
    productosEnCarrito.forEach((producto) => {
        const titulo = producto.querySelector('.carrito-producto-titulo small').textContent;
        const descripcion = producto.querySelector('.carrito-producto-titulo h3').textContent;
        const precio = producto.querySelector('.card-precio').textContent;
        const cantidad = producto.querySelector('.suma-resta-productos p').textContent;
        const imageUrl = producto.querySelector('.card-img-top').getAttribute('src');
        productos.push({ titulo, descripcion, precio, cantidad, imageUrl });
    });
    localStorage.setItem('productosEnCarrito', JSON.stringify(productos));
};

const cargarCarritoLocalStorage = () => {
    const productos = JSON.parse(localStorage.getItem('productosEnCarrito'));
    if (productos) {
        productos.forEach((producto) => {
            const productCard = `
                <div class="carrito-producto">
                    <img class="card-img-top" src="${producto.imageUrl}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>${producto.titulo}</small>
                        <h3>${producto.descripcion}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <div class="suma-resta-productos">
                        <i class="bi bi-dash-circle"></i><p>${producto.cantidad}</p><i class="bi bi-plus-circle"></i><i class="bi bi-trash3-fill"></i>
                        </div>
                    </div>
                    <div class="card-precio" style="display: none;">${producto.precio}</div>
                </div>
            `;
            carritoProductos.innerHTML += productCard;
        }
        );
    }
}
cargarCarritoLocalStorage();

//GUARDAR EN LOCALSTORAGE LOS PRODUCTOS DEL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('agregarAlCarrito') || event.target.classList.contains('bi-dash-circle') || event.target.classList.contains('bi-plus-circle') || event.target.classList.contains('bi-trash3-fill')) {
        guardarCarritoLocalStorage();
    }
});

//RENDERIZAR EN CART.HTML LOS PRODUCTOS DEL CARRITO
const carritoProductosCart = document.getElementById('carritoProductosCart');


const cargarCarritoLocalStorageCart = () => {
    const productos = JSON.parse(localStorage.getItem('productosEnCarrito'));
    if (productos) {
        productos.forEach((producto) => {
            const productCard = `
            <tr>
                <div class="contenedor-producto-resumen">
                    <div class="carrito-producto-resumen">
                        <img class="card-img-top-resumen" src="${producto.imageUrl}" alt="${producto.titulo}">
                        <div class="carrito-producto-titulo-resumen">
                            <h1>${producto.titulo}</h1>
                            <h3>${producto.descripcion}</h3>
                        </div>
                        <div class="carrito-producto-cantidad-resumen">
                            <div class="suma-resta-productos">
                            <i class="bi bi-dash-circle"></i><p>${producto.cantidad}</p><i class="bi bi-plus-circle"></i><i class="bi bi-trash3-fill"></i>
                            </div>
                        </div>
                        <div class="card-precio-resumen" style="display: ;">${producto.precio}</div>
                    </div>
                </div>
            </tr>
            `;
            carritoProductosCart.innerHTML += productCard;
        }
        );
    }
}
cargarCarritoLocalStorageCart();







