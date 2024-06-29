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
    

    if (submitForm) { // Verifica si el elemento existe
        submitForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitamos la recarga de la página

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
                    // Obtener el producto creado
                    const createdProduct = await response.json();
                    // Guardar el producto en el almacenamiento local
                    localStorage.setItem('newProduct', JSON.stringify(createdProduct));
                    // Redirigir a index.html
                    window.location.href = '/pages/addproduct.html';
                } else {
                    alert("Error al crear el producto: " + response.statusText);
                }
            } catch (error) {
                alert("Error al enviar el producto: " + error.message);
            }
        });
    } else {
        console.error("El formulario con el ID 'submitForm' no se encontró en el DOM.");
    }
});

//MOSTRAR PRODUCTOS EN LA TABLA

document.addEventListener('DOMContentLoaded', async () => {

    const productList = document.getElementById('product-list-CRUD');
    if (!productList) return; // Si el elemento no existe, no hace nada

    const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

    try {
        // Hacer una petición para obtener todos los productos
        const response = await fetch(urlProducts);
        const products = await response.json();

        // Recorrer cada producto y renderizarlo en el DOM
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
        console.error("Error al obtener los productos", error);
    }
});
// ELIMINAR PRODUCTOS DE LA TABLA
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-product')) {
        const productId = event.target.getAttribute('data-id');

        // Mostrar la alerta de confirmación antes de hacer la solicitud de eliminación
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
                    // Redirigir a index.html después de un breve retraso para que el usuario vea el mensaje de éxito
                    setTimeout(() => {
                        window.location.href = '/pages/addproduct.html';
                    }, 1500);
                } else {
                    alert("Error al eliminar el producto", response.statusText);
                }
            } catch (error) {
                alert("Error al eliminar el producto", error);
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

    if (updateForm) { // Verifica si el elemento existe
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
                    alert("Error al actualizar el producto: " + response.statusText);
                }
            } catch (error) {
                alert("Error al enviar el producto: " + error.message);
            }
        });
    } else {
        console.error("El formulario con el ID 'updateForm' no se encontró en el DOM.");
    }
});

