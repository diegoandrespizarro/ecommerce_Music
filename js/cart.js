// RENDERIZAR LOS PRODUCTOS DE LA API EN EL CARRITO Y SI ESTA ESE PRODUCTO LO SUMO O LO AGREGO
const carritoProductos = document.getElementById('carritoProductos');

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('agregarAlCarrito')) {
        const productCard = event.target.closest('.card.mb-4.shadow-sm'); // Obtener el contenedor de la tarjeta de producto
        const product = event.target.closest('.card-body');
        const title = product.querySelector('.card-title').textContent;
        const descripcion = product.querySelector('.card-text').textContent;

        // Extraer y convertir stock y precio a números
        const stockText = product.querySelector('.card-stock').textContent.replace('Stock: ', '').trim();
        const stock = parseInt(stockText);
        
        let precioText = product.querySelector('.card-precio').textContent.replace('Precio: $', '').trim();
        const precioNumber = parseFloat(precioText);

        const imageUrl = productCard.querySelector('.carrito-producto-imagen') ? productCard.querySelector('.carrito-producto-imagen').getAttribute('src') : '';

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Su producto fue agregado al carrito",
            showConfirmButton: false,
            timer: 1500
        });

        // Verificar si el producto ya está en el carrito y restar del stock
        let productoEnCarrito = false;
        let excedeStock = false;
        const productosEnCarrito = carritoProductos.querySelectorAll('.carrito-producto');
        productosEnCarrito.forEach((producto) => {
            const tituloProductoCarrito = producto.querySelector('.carrito-producto-titulo small').textContent;
            if (tituloProductoCarrito === title) {
                let cantidad = producto.querySelector('.suma-resta-productos p');
                const nuevaCantidad = parseInt(cantidad.textContent) + 1;
                if (nuevaCantidad > stock) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No hay suficiente stock",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    excedeStock = true;
                    return;
                }
                cantidad.textContent = nuevaCantidad;
                productoEnCarrito = true;
            }
        });
        // Si la cantidad excede el stock, salir de la función
        if (excedeStock) {
            return;
        }
        // Si no está en el carrito, agregarlo
        if (!productoEnCarrito) {
            const productCardHTML = `
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
                    <div class="card-precio" style="display:;">$${precioNumber.toFixed()}</div>
                </div>
            `;
            carritoProductos.innerHTML += productCardHTML;
        }
        guardarCarritoLocalStorage();
        actualizarCantidadCarrito();
    }
});



// Función para calcular y actualizar el total de la compra
const totalResumen = document.getElementById('totalCompraResumen');
const total = document.getElementById('totalCompra');

function actualizarTotalCompra() {
    const productos = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    let sumaTotal = 0;
    productos.forEach((producto) => {
        sumaTotal += producto.precioNumber * producto.cantidad;
    });
    if (total) {
        total.textContent =`$${sumaTotal.toFixed()}`;
    }
    if (totalResumen) {
        totalResumen.textContent =`$${sumaTotal.toFixed()}`;
    }
}

// Actualizar el total de la compra al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarTotalCompra();
    guardarCarritoLocalStorage();
    actualizarCantidadCarrito();
});

// Actualizar el total de la compra cuando se hacen cambios en el carrito
document.addEventListener('click', () => {
    actualizarTotalCompra();
    guardarCarritoLocalStorage();
    actualizarCantidadCarrito();
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
    if (event.target.classList.contains('bi-trash3-fill') ){
        event.target.parentElement.parentElement.parentElement.remove();
        guardarCarritoLocalStorage();
        actualizarCantidadCarrito();
        actualizarTotalCompra();
    }
});

// BOTON DE SUMAR PRODUCTO AL CARRITO 
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('bi-plus-circle')) {
        const cantidad = event.target.previousElementSibling;
        const stockText = document.getElementById('stockProducto').textContent;
        const stock = parseInt(stockText.replace('Stock: ', '').trim());
        
        if (parseInt(cantidad.textContent) < stock) {
            cantidad.textContent = parseInt(cantidad.textContent) + 1;
            guardarCarritoLocalStorage();
            actualizarCantidadCarrito();
            actualizarTotalCompra();
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "No hay suficiente stock",
                showConfirmButton: false,
                timer: 1500
            });
        }
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
            actualizarTotalCompra();
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
            
            await Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Su compra fue realizada",
                showConfirmButton: false,
                timer: 1500
            });
            // Generar PDF con los productos comprados
            generarPDF();
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

// FUNCION PARA GENERAR UN PDF CON LOS PRODUCTOS COMPRADOS
function generarPDF() {
    const productos = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    const title = 'Resumen de Compra';
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth(); 
    const centerTitle = (pageWidth - titleWidth) / 2;
    doc.text(title, centerTitle, 10);

    let y = 20;
    let sumaTotal = 0;
    const pageHeight = doc.internal.pageSize.getHeight();

    productos.forEach((producto, index) => {
        const totalProducto = producto.precioNumber * producto.cantidad;
        sumaTotal += totalProducto;

        // Verifica si hay espacio suficiente en la página actual, si no, añade una nueva página
        if (y + 60 > pageHeight) { 
            doc.addPage();
            y = 20; 
        }

        doc.setFontSize(12);
        doc.text(`Producto ${index + 1}: ${producto.titulo}`, 10, y);
        doc.text(`Descripción: ${producto.descripcion}`, 10, y + 10);
        doc.text(`Cantidad: ${producto.cantidad}`, 10, y + 20);
        doc.text(`Precio unitario: $${producto.precioNumber.toFixed()}`, 10, y + 30);
        doc.text(`Total: $${totalProducto.toFixed()}`, 10, y + 40);

        // Dibuja una línea de separación entre productos
        doc.setLineWidth(0.5);
        doc.line(10, y + 45, 200, y + 45);

        y += 55; // Incrementar la posición Y para el próximo producto
    });

    // Verifica si hay espacio suficiente en la página actual para el total, si no, añade una nueva página
    if (y + 20 > pageHeight) { // 20 is the approximate height for the total entry
        doc.addPage();
        y = 20; // Reset Y position for new page
    }

    doc.setFontSize(14);
    doc.text(`Total de la compra: $${sumaTotal.toFixed()}`, 10, y + 10);

    doc.save('Resumen_de_Compra.pdf');
}

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
                    <div class="card-precio" style="display:;">$${producto.precioNumber}</div>
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
        let sumaTotal = 0; // Inicializar la suma total

        if (productos && carritoProductosCart) {
            productos.forEach((producto) => {
                const totalProducto = producto.precioNumber * producto.cantidad; // Calcular el total del producto
                sumaTotal += totalProducto; // Sumar al total general

                const productCard = `
                    <div class="contenedor-producto-resumen">
                        <div class="carrito-producto-resumen">
                            <img class="card-img-top-resumen" src="${producto.imageUrl}" alt="${producto.titulo}">
                            <div class="carrito-producto-titulo-resumen">
                                <h1>${producto.titulo}</h1>
                                <h3>${producto.descripcion}</h3>
                            </div>
                            <div class="carrito-producto-cantidad-resumen">
                                <div class="suma-resta-productos">
                                    <p>${producto.cantidad} unidades</p>
                                </div>
                            </div>
                            <div class="card-precio-resumen" style="display: ;">c/u $${producto.precioNumber.toFixed()}</div>
                            <div class="card-precio-total-resumen" style="display: ;">Total: $${totalProducto.toFixed()}</div>
                        </div>
                    </div>
                `;
                carritoProductosCart.innerHTML += productCard;
            });
        }
    }

    cargarCarritoLocalStorageCart();
});


//ACTUALIZAR LA CANTIDAD DE PRODUCTOS EN EL CARRITO
const carritoCantidad = document.getElementById('carritoCantidad');

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




































