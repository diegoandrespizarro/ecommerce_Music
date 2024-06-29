

// RENDERIZAR LOS PRODUCTOS DE LA API EN EL CARRITO Y SI ESTA ESE PRODUCTO LO SUMO O LO AGREGO
const carritoProductos = document.getElementById('carritoProductos');

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('agregarAlCarrito')) {
        const productCard = event.target.closest('.card.mb-4.shadow-sm'); // Obtener el contenedor de la tarjeta de producto
        const product = event.target.closest('.card-body');
        const title = product.querySelector('.card-title').textContent;
        const descripcion = product.querySelector('.card-text').textContent;
        const stock = parseInt(product.querySelector('.card-stock').textContent);
        let precio = product.querySelector('.card-precio').textContent.replace('$', '').trim();
        const precioNumber = parseInt(precio);
        const imageUrl = productCard.querySelector('.carrito-producto-imagen') ? productCard.querySelector('.carrito-producto-imagen').getAttribute('src') : '';

        console.log("este es el precio",typeof precioNumber, precioNumber)
        
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
            if (tituloProductoCarrito === title ) {
                
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
                    <div class="card-precio" style="display:;">${precioNumber}</div>
                </div>
            `;

            carritoProductos.innerHTML += productCard;
        }
        
        guardarCarritoLocalStorage();
        actualizarCantidadCarrito();
    }
});



//BOTON DE VACIAR CARRITO
const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
    carritoProductos.innerHTML = '';
    guardarCarritoLocalStorage();
    actualizarCantidadCarrito();
});

//BOTON DE ELIMINAR PRODUCTO DEL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-trash3-fill')) {
        event.target.parentElement.parentElement.parentElement.remove();
        guardarCarritoLocalStorage();
        actualizarCantidadCarrito();
    }
    
  
});

// BOTON DE SUMAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-plus-circle')) {
        const cantidad = event.target.previousElementSibling;
        cantidad.textContent = parseInt(cantidad.textContent) + 1;
        guardarCarritoLocalStorage();
        actualizarCantidadCarrito();
        }
        
     
    });

//BOTON DE RESTAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-dash-circle')) {
        const cantidad = event.target.nextElementSibling;
        if (parseInt(cantidad.textContent) > 1) {
            cantidad.textContent = parseInt(cantidad.textContent) - 1;
            guardarCarritoLocalStorage();
            actualizarCantidadCarrito();
        }
    }
    
   
});

//FUNCION PARA VACIAR EL CARRITO Y ACTUALIZAR LA CANTIDAD
document.addEventListener('DOMContentLoaded', function () {
    const FinalizarCompra = document.getElementById("FinalizarCompra");
    const carritoProductosCart = document.getElementById('carritoProductosCart');

    if (FinalizarCompra) { // Verifica si el elemento existe
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

            // Vaciar el carrito en el DOM
            carritoProductosCart.innerHTML = '';
            
            // Vaciar el carrito en el almacenamiento local
            localStorage.removeItem('productosEnCarrito');
            
            // Actualizar la cantidad del carrito
            actualizarCantidadCarrito();

            // Aquí puedes redirigir a otra página después de la alerta si es necesario
            window.location.href = '/index.html';
        });
    } 
});

//PERSISTENCIA DE DATOS EN EL CARRITO DE COMPRAS LOCALSTORAGE
const guardarCarritoLocalStorage = () => {
    const productos = [];
    const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
    productosEnCarrito.forEach((producto) => {
        const titulo = producto.querySelector('.carrito-producto-titulo small').textContent;
        const descripcion = producto.querySelector('.carrito-producto-titulo h3').textContent;
        let precio = producto.querySelector('.card-precio').textContent.replace('$', '').trim();
        const precioNumber = Number(precio);
        const cantidad = producto.querySelector('.suma-resta-productos p').textContent;
        const imageUrl = producto.querySelector('.card-img-top').getAttribute('src');

        productos.push({ titulo, descripcion, precioNumber, cantidad, imageUrl});
        
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
                    <div class="card-precio" style="display:;">${producto.precioNumber}</div>
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
    if (event.target.classList.contains('agregarAlCarrito') || event.target.classList.contains('bi-dash-circle') || event.target.classList.contains('bi-plus-circle') || event.target.classList.contains('bi-trash3-fill') || event.target.id === 'vaciarCarrito' || event.target.id === 'FinalizarCompra' )   {
        guardarCarritoLocalStorage();
    }
});

//RENDERIZAR EN CART.HTML LOS PRODUCTOS DEL CARRITO
document.addEventListener('DOMContentLoaded', () => {
    const carritoProductosCart = document.getElementById('carritoProductosCart');

    const cargarCarritoLocalStorageCart = () => {
        const productos = JSON.parse(localStorage.getItem('productosEnCarrito'));
        if (productos && carritoProductosCart) {
            productos.forEach((producto) => {
                const productCard = `
                <tr>
                    <td>
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
                                <div class="card-precio-resumen" style="display: ;">${producto.precioNumber}</div>
                            </div>
                        </div>
                    </td>
                </tr>
                `;
                carritoProductosCart.innerHTML += productCard;
            });
        }
    }
    
    cargarCarritoLocalStorageCart();
});


//mostrar la cantidad de productos aderidos al carrito(Falta terminar)
const carritoCantidad = document.getElementById('carritoCantidad');

// Función para actualizar la cantidad de productos en el carrito
const actualizarCantidadCarrito = () => {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    let cantidad = 0;
    productosEnCarrito.forEach((producto) => {
        cantidad += parseInt(producto.cantidad);
    });
    carritoCantidad.textContent = cantidad;
    if (cantidad > 0) {
        carritoCantidad.classList.add('green');
    } else {
        carritoCantidad.classList.remove('green');
    }
    localStorage.setItem('carritoCantidad', cantidad);
};

// Función para cargar la cantidad de productos en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Leer la cantidad del localStorage y actualizar el DOM
    const cantidadGuardada = localStorage.getItem('carritoCantidad');
    if (cantidadGuardada) {
        carritoCantidad.textContent = cantidadGuardada;
        if (parseInt(cantidadGuardada) > 0) {
            carritoCantidad.classList.add('green');
        }
    }
    actualizarCantidadCarrito();
});
































