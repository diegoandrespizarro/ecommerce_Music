var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning')

let timeRunning = 3000
let timeAutoNext = 7000

nextBtn.onclick = function () {
    showSlider('next')
}

prevBtn.onclick = function () {
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
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout(() => {
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




//RENDERIZAMOS EN EL INDEX LOS PRODUCTOS DE LA API

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

    try {
        // Hacer una petición para obtener todos los productos
        const response = await fetch(urlProducts);
        const products = await response.json();

        // Recorrer cada producto y renderizarlo en el DOM
        products.forEach(product => {
            // CONVERTIMOS LOS VALORES DE STOCK Y PRECIO A NÚMEROS USANDO PARSEFLOAT Y PARSEINT
            const precioNumber = parseFloat(product.precio);
            const stockNumber = parseInt(product.stock);

            if (isNaN(precioNumber) || isNaN(stockNumber)) {
                return;
            }
            // TRUNCAMOS LA DESCRIPCIÓN Y EL TÍTULO DE LOS PRODUCTOS PARA QUE CUANDO EXCEDAN LOS 20 CARACTERES SE MUESTRE UN PUNTO SUSPENSIVO
            const truncateDescription = product.descripcion.length > 20 ? `${product.descripcion.substring(0, 20)}...` : product.descripcion;
            const truncateTitle = product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title;

            const productCard = `
                <div class="col-md-4 contendor-Productos">
                    <div class="card mb-4 shadow-sm">
                        <img class="carrito-producto-imagen" src="${product.imageUrl}" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title truncado">${truncateTitle}</h5>
                            <p class="card-text truncado">${truncateDescription}</p>
                            <p class="card-precio truncado"><strong class="strongPrecio">Precio:</strong> $${precioNumber.toFixed()}</p>
                            <p class="card-stock" id="stockProducto">Stock: ${stockNumber}</p>
                            <button class="btn btn-primary agregarAlCarrito">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
});
// FINAL DE RENDERIZADO DE PRODUCTOS DE LA API


