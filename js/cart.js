// RENDERIZAR LOS PRODUCTOS DE LA API EN EL CARRITO Y SI ESTA ESE PRODUCTO LO SUMO O LO AGREGO
const carritoProductos = document.getElementById('carritoProductos');
const totalCompra = document.getElementById('totalCompra');


document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('agregarAlCarrito')) {
        const product = event.target.closest('.card-body');
        const title = product.querySelector('.card-title').textContent;
        const descripcion = product.querySelector('.card-text').textContent;
        const precio = parseFloat(product.querySelector('.card-precio').textContent.replace('$', ''));
        
        // Verificar si el producto ya está en el carrito
        let productoEnCarrito = false;
        const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
        productosEnCarrito.forEach((producto) => {
            const tituloProductoCarrito = producto.querySelector('.carrito-producto-titulo small').textContent;
            if (tituloProductoCarrito === title) {
                let cantidad = producto.querySelector('.suma-resta-productos p');
                cantidad.textContent = parseInt(cantidad.textContent) + 1;
                productoEnCarrito = true;
                totalCompraCarrito();
            }
        });

        // Si no está en el carrito, agregarlo
        if (!productoEnCarrito) {
            const productCard = `
                <div class="carrito-producto">
                    <img class="carrito-producto-imagen" src="./img/guitarra-clasica-valencia-vc102-nino-1-2-natural-guitarra-clasica-valencia-vc102-nino-1-2-natural.jpg" alt="">
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
            totalCompraCarrito();
        }
    }
});



//BOTON DE VACIAR CARRITO
const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
    carritoProductos.innerHTML = '';
});

//BOTON DE ELIMINAR PRODUCTO DEL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-trash3-fill')) {
        event.target.parentElement.parentElement.parentElement.remove();
    }
});

//BOTON DE SUMAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-plus-circle')) {
        const cantidad = event.target.previousElementSibling;
        cantidad.textContent = parseInt(cantidad.textContent) + 1;
    }
});

//BOTON DE RESTAR PRODUCTO AL CARRITO
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-dash-circle')) {
        const cantidad = event.target.nextElementSibling;
        if (parseInt(cantidad.textContent) > 1) {
            cantidad.textContent = parseInt(cantidad.textContent) - 1;
        }
    }
});


//ALERTA PARA FINALIZAR LA COMPRA
const compraFinalizada = document.getElementById("compraFinalizada");
document.addEventListener('DOMContentLoaded', function () {
    compraFinalizada.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

        // Mostrar la alerta
        await Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Su compra fue realizada",
            showConfirmButton: true,
        });

        // Aquí puedes redirigir a otra página después de la alerta si es necesario
        window.location.href = 'index.html';
    });
});
