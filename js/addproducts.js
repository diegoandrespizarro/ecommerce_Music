//FUNCION PARA CREAR PRODUCTOS
const submitForm = document.getElementById("submitForm");
const productTitle = document.getElementById("productTitle");
const productCat = document.getElementById("productCat");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");
const urlProducts = `https://6668e555f53957909ff96e69.mockapi.io/api/Products`;

submitForm.addEventListener(`submit`, async (event) => {
    event.preventDefault(); // Evitamos la recarga de la página

    const title = productTitle.value.trim();
    const categoria = productCat.value.trim();
    const descripcion = productDescription.value.trim();
    const precio = parseFloat(productPrice.value.trim());
    const imageUrl = productImage.value.trim();

    const newProduct = {
        title: title,
        categoria: categoria,
        descripcion: descripcion,
        precio: precio,
        imageUrl: imageUrl
    };

    try {
        const response = await fetch(urlProducts, {
            method: `POST`,
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": `application/json`
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
            alert("Error al crear el producto", response.statusText);
        }
    } catch (error) {
        alert("Error al enviar el producto", error);
    }
});

//MOSTRAR PRODUCTOS EN LA TABLA
const productList = document.getElementById('product-list');
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Hacer una petición para obtener todos los productos
        const response = await fetch(urlProducts);
        const products = await response.json();

        // Recorrer cada producto y renderizarlo en el DOM
        products.forEach(product => {
            const productCard = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.categoria}</td>
                    <td>${product.precio}</td>
                    <td><img src="${product.imageUrl}" alt="${product.title}" width="50"></td>
                    <td>${product.descripcion}</td>
                    <td>
                        <button class="btn btn-danger delete-product" data-id="${product.id}">Eliminar</button>
                        <button class="btn btn-success modificar-product" modal-dialog modal-dialog-centered modal-dialog-scrollable data-id="${product.id}">Editar</button>
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



