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

    const title = productTitle.value;
    const categoria = productCat.value;
    const descripcion = productDescription.value;
    const precio = parseInt(productPrice.value);
    const imageUrl = productImage.value;

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
            alert("Producto creado exitosamente");
            // Obtener el producto creado
            const createdProduct = await response.json();
            // Guardar el producto en el almacenamiento local
            localStorage.setItem('newProduct', JSON.stringify(createdProduct));
            // Redirigir a index.html
            window.location.href = '/index.html';
        } else {
            alert("Error al crear el producto", response.statusText);
        }
    } catch (error) {
        alert("Error al enviar el producto", error);
    }
});

