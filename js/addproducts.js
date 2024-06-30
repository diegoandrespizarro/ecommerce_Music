//FUNCION PARA CREAR PRODUCTOS
const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById("submitForm");
    const productTitle = document.getElementById("productTitle");
    const productCat = document.getElementById("productCat");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");
    const productImage = document.getElementById("productImage");
    const productStock = document.getElementById("productStock");

    if (submitForm) { // Verificamos si el elemento existe
        submitForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = productTitle.value.trim();
            const categoria = productCat.value.trim();
            const descripcion = productDescription.value.trim();
            const precio = parseInt(productPrice.value.trim());
            const imageUrl = productImage.value.trim();
            const stock = parseInt(productStock.value.trim());

            const newProduct = {
                title: title,
                categoria: categoria,
                descripcion: descripcion,
                precio: precio,
                imageUrl: imageUrl,
                stock: stock
            };

            try {
                const response = await fetch(urlProducts, {
                    method: 'POST',
                    body: JSON.stringify(newProduct),
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });

                if (response.ok) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Su producto fue creado exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Obtengo el producto creado
                    const createdProduct = await response.json();
                    // Guardao el producto en el almacenamiento local
                    localStorage.setItem('newProduct', JSON.stringify(createdProduct));
                    // vuelvo al index
                    window.location.href = '/pages/addproduct.html';
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.statusText,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }
        });
    }
});

//MOSTRAR LOS PRODUCTOS EN LA TABLA

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list-CRUD');
    if (!productList) return;

    const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

    try {
        // HAGO UNA PETICION PARA OBTENER TODOS LOS PRODUCTOS
        const response = await fetch(urlProducts);
        const products = await response.json();

        // RECORRO CADA PRODUCTO Y RENDERIZO EN EL DOM CREANDO UNA FILA DE TABLA
        products.forEach(product => {
            const productCard = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.stock}</td>
                    <td>${product.title}</td>
                    <td>${product.categoria}</td>
                    <td>$${parseInt(product.precio)}</td>
                    <td><img src="${product.imageUrl}" alt="${product.title}" width="50"></td>
                    <td>${product.descripcion}</td>
                    <td>
                        <button class="btn btn-danger delete-product" data-id="${product.id}">Eliminar</button>
                        <button type="button" class="btn btn-primary modificar-product" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${product.id}">Modificar</button>
                    </td>
                </tr>
            `;
            productList.innerHTML += productCard;
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
        });
    }
});
// ELIMINO PRODUCTOS DE LA TABLA Y DE LA API TOMANDO EL ID DE REFERENCIA
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-product')) {
        const productId = event.target.getAttribute('data-id');

        const { isConfirmed } = await Swal.fire({
            title: "Estas seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!"
        });

        if (isConfirmed) {
            try {
                const response = await fetch(`${urlProducts}/${productId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Tu producto ha sido eliminado.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = '/pages/addproduct.html';
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.statusText,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error,
                });
            }
        }
    }
});

//MODIFICAR PRODUCTOS DE LA TABLA
const productTitleMODIF = document.getElementById('productTitleMODIF');
const productCatMODIF = document.getElementById('productCatMODIF');
const productDescriptionMODIF = document.getElementById('productDescriptionMODIF');
const productPriceMODIF = document.getElementById('productPriceMODIF');
const productStockMODIF = document.getElementById('productStockMODIF');
const productImageMODIF = document.getElementById('productImageMODIF');

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('modificar-product')) {
        const productId = event.target.getAttribute('data-id');
        const response = await fetch(`${urlProducts}/${productId}`);
        const product = await response.json();

        productTitleMODIF.value = product.title;
        productCatMODIF.value = product.categoria;
        productDescriptionMODIF.value = product.descripcion;
        productPriceMODIF.value = product.precio;
        productStockMODIF.value = product.stock;
        productImageMODIF.value = product.imageUrl;
        updateForm.setAttribute('data-id', productId);

    }
});

//FUNCION PARA ACTUALIZAR PRODUCTOS
document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.getElementById('updateForm');
    const productTitleMODIF = document.getElementById('productTitleMODIF');
    const productCatMODIF = document.getElementById('productCatMODIF');
    const productPriceMODIF = document.getElementById('productPriceMODIF');
    const productDescriptionMODIF = document.getElementById('productDescriptionMODIF');
    const productImageMODIF = document.getElementById('productImageMODIF');
    const productStockMODIF = document.getElementById('productStockMODIF');
    const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

    if (updateForm) { //VERIFICAMOS SI EL ELEMENTO EXISTE Y SI EXISTE ENTONCES GUARDAMOS LOS VALORES DE LOS INPUTS
        updateForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const title = productTitleMODIF.value.trim();
            const categoria = productCatMODIF.value.trim();
            const descripcion = productDescriptionMODIF.value.trim();
            const precio = parseInt(productPriceMODIF.value.trim());
            const imageUrl = productImageMODIF.value.trim();
            const stock = parseInt(productStockMODIF.value.trim());
            const productId = updateForm.getAttribute('data-id');

            const updatedProduct = {
                title: title,
                categoria: categoria,
                descripcion: descripcion,
                precio: precio,
                stock: stock,
                imageUrl: imageUrl
            };
            try {
                const response = await fetch(`${urlProducts}/${productId}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedProduct),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Su producto fue actualizado exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.href = '/pages/addproduct.html';
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: (response.statusText),
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: (error.message),
                });
            }
        });
    }
});

