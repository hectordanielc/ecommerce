let prroducts = []
let cartList = JSON.parse(localStorage.getItem("cartList"))

//Fetch los productos del JSON
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        products = data
        renderProducts(products)
    })
    .catch(error => console.log(error))

//Referencia al div del carrito
let cartDiv = document.getElementById("cart")
hideCart()

//Referencia al div de los productos
let fruitsDiv = document.getElementById("frutas")

// Si hay un carrito en local storage, renderizarlo
if (localStorage.getItem("cartList")) {
    // Obtener la lista de productos del carrito
    let cartList = JSON.parse(localStorage.getItem("cartList"))
    // Recorrer la lista de productos y agregarlos al carrito
    cartList.forEach(fruta => {
        addProductToCart(fruta)
    })
}

//Funcion para mostrar productos del catalogo
function renderProducts(arrayProductos) {
    arrayProductos.forEach(fruta => {
        let tarjeta = document.createElement("div")
        tarjeta.classList.add("tarjeta")
        tarjeta.innerHTML = `<h3>${fruta.name}</h3>
        <p>Price: DOP ${fruta.price}</p>
        <div class="productImage" style="background-image: url(${fruta.img})"></div>
        <button class="btn btn-primary" type="button" id="${fruta.id}">Add to cart</button>
        `
        fruitsDiv.appendChild(tarjeta)

        let btn = document.getElementById(fruta.id)
        btn.addEventListener("click", addToCart)
    })
}

//Si hay un carrito en local storage, cargalo
if (localStorage.getItem("cartList")) {
    cartList = JSON.parse(localStorage.getItem("cartList"))
}

// Funcion para agregar el producto al carrito
function addToCart(e) {
    let fruta = products.find(fruta => fruta.id === e.target.id)

    if (cartList.some(item => item.name === fruta.name)) {
        // Suma 1 al input de cantidad
        let input = document.getElementById(`input${fruta.id}`)
        input.value = parseInt(input.value) + 1
        fruta.quantity = parseInt(input.value)
        // Reemplaza fruta en cartList seleccionando el index de la fruta segun name
        let index = cartList.findIndex(item => item.name === fruta.name)
        cartList.splice(index, 1, fruta)
        saveCart()
        usotoastify(fruta.name)
    } else {
        cartList.push(fruta)
        addProductToCart(fruta)
        usotoastify(fruta.name)
    }
}

//Funcion para remover el producto del carrito
function removeFromCart(e) {
    e.target.parentNode.remove()
    let fruta = cartList.find(fruta => fruta.id === e.target.id.slice(1))
    fruta.quantity = 1
    let index = cartList.indexOf(fruta)
    cartList.splice(index, 1)
    saveCart()
    hideCart()
}

//Funcion para ocultar el carrito si esta vacio
function hideCart() {
    if (cartDiv.children.length == 1) {
        cartDiv.style.display = "none"
    } else {
        cartDiv.style.display = "block"
    }
}

//Funcion para guardar el carrito en local storage
function saveCart() {
    localStorage.setItem("cartList", JSON.stringify(cartList))
}

//Fsuncion que modifica la cantidad de un producto en el carrito
function changeQuantity(e) {
    let fruta = cartList.find(fruta => fruta.id === e.target.id.slice(5))
    fruta.quantity = parseInt(e.target.value)
    saveCart()

    if (e.target.value < 1) {
        e.target.parentNode.parentNode.remove()
        let index = cartList.indexOf(fruta)
        fruta.quantity = 1
        cartList.splice(index, 1);
        saveCart()
    }
}

// Función para crear y agregar un nuevo producto al carrito
function addProductToCart(fruta) {
    let cartProduct = document.createElement("div")
    cartProduct.classList.add("cartProduct")
    cartProduct.innerHTML = `
    <div>
    <p>Price: DOP ${fruta.price}</p>
    <p>Quantity: </p>
    <input type="number" id="input${fruta.id}" value="${fruta.quantity}">
    </div>
    <div>
    <p>${fruta.name}</p>
    <div class="cartImage" style="background-image: url(${fruta.img})"></div>
    </div>
    <button class="btn btn-danger" type="button" id="r${fruta.id}">Remove</button>
    `
    cartDiv.appendChild(cartProduct)
    let btn = document.getElementById(`r${fruta.id}`)
    btn.addEventListener("click", removeFromCart)

    let input = document.getElementById(`input${fruta.id}`)
    input.addEventListener("change", changeQuantity)

    saveCart()
    hideCart()
}

function usotoastify(fruta) {
    Toastify({
        text: `Se agregó 1 ${fruta} al carrito`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}