var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}


// Start the initial animation 
resetTimeAnimation()




                                    //RENDERIZO EN EL HTML LOS PRODUCTOS DE LA API

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

    try {
        // Hacer una petición para obtener todos los productos
        const response = await fetch(urlProducts);
        const products = await response.json();

        // Recorrer cada producto y renderizarlo en el DOM
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.descripcion}</p>
                            <p class="card-precio"><strong>Precio:</strong> $${product.precio}</p>
                            <p class="card-text"><strong>Id:</strong> ${product.id}</p>
                            <button class="btn btn-primary agregarAlCarrito">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });

    } catch (error) {
        console.error("Error al obtener los productos", error);
    }
});

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
                    <img class="carrito-producto-imagen" src="./assets/guitarra1.jpg" alt="">
                    <div class="carrito-producto-titulo">
                        <h2>${title}</h2>
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

                                // FINAL DE RENDERIZADO DE PRODUCTOS DE LA API



// CATEGORIAS DE PRODUCTOS


  
 