//Lista de productos
let products = [
    { name: "Apple",
        id: "1",
        price: 15,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/220px-Red_Apple.jpg",
        quantity: 1,
    },
    { name: "Banana",
        id: "2",
        price: 12,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/220px-Banana-Single.jpg",
        quantity: 1,
    },
    { name: "Orange",
        id: "3",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Orange%2C_orange_peel.jpg",
        quantity: 1,
    },
    { name: "Pineapple",
        id: "4",
        price: 25,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/220px-Pineapple_and_cross_section.jpg",
        quantity: 1,
    },
    { name: "Strawberry",
        id: "5",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Yours_Food_Logo.jpg/640px-Yours_Food_Logo.jpg",
        quantity: 1,
    },
    { name: "Watermelon",
        id: "6",
        price: 12,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Piece_of_watermelon.png/640px-Piece_of_watermelon.png",
        quantity: 1,
    },
    { name: "Mango",
        id: "7",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/MANGOES.jpg",
        quantity: 1,    
    },
    { name: "Peach",
        id: "8",
        price: 7,
        img: "https://i0.wp.com/grospace.co.za/wp-content/uploads/2021/03/GroSpace-Peach.jpg?fit=1000%2C918&ssl=1",
        quantity: 1,
    },
    { name: "Pear",
        id: "9",
        price: 8,
        img: "https://dictionary.cambridge.org/es/images/thumb/pear_noun_002_26910.jpg?version=5.0.312",
        quantity: 1,
    },
    { name: "Grapes",
        id: "10",
        price: 10,
        img: "https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/blackmonukka.jpg?v=1538780984",
        quantity: 1,
    }
];
let cartList = []
let cartDiv = document.getElementById("cart")
hideCart()

let fruitsDiv = document.getElementById("frutas")
renderProducts(products)

//if there is a cart in local storage, load it
if (localStorage.getItem("cartList")) {
    cartList = JSON.parse(localStorage.getItem("cartList"))
    //for each product in cartList, add it to the cart
    cartList.forEach(fruta => {
        // let index = products.indexOf(fruta)
        // products.splice(index, 1, fruta)
        let cartProduct = document.createElement("div")
        cartProduct.classList.add("cartProduct")
        cartProduct.innerHTML = `
        <div
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
        hideCart()
    })
}



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

//if there is a cart in local storage, load it
if (localStorage.getItem("cartList")) {
    cartList = JSON.parse(localStorage.getItem("cartList"))
}

//Funcion para agregar el producto al carrito
function addToCart(e) {
    let fruta = products.find(fruta => fruta.id === e.target.id)
    


    if (cartList.some(item => item.name === fruta.name)) {
        //suma1 al imput de cantidad
        let input = document.getElementById(`input${fruta.id}`)
        input.value = parseInt(input.value) + 1
        fruta.quantity = parseInt(input.value)
        //Reemplaza fruta en cartList
        let index = cartList.indexOf(fruta)
        cartList.splice(index, 1, fruta)
        saveCart()
    } else {cartList.push(fruta)
            let cartProduct = document.createElement("div")
            cartProduct.classList.add("cartProduct")
            cartProduct.innerHTML = `
            <div
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
            console.log(cartDiv.children.length)
            console.log(fruta)  
            saveCart()
            hideCart()
        }
}

//Si fruta.name esta en cartList, suma 1 a la cantidad
//Si no esta, agrega fruta a cartList



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

//Function to hide cart when empty and show when not empty not needed to be called
function hideCart() {
    if (cartDiv.children.length == 1) {
        cartDiv.style.display = "none"
    } else {
        cartDiv.style.display = "block"
    }
}

//Function that saves the carlist to local storage
function saveCart() {
    localStorage.setItem("cartList", JSON.stringify(cartList))
}

